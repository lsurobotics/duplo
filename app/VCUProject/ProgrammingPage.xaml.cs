using ABB.Robotics.Controllers;
using ABB.Robotics.Controllers.RapidDomain;
using ABB.Robotics.Controllers.MotionDomain;
using Microsoft.Web.WebView2.Core;
using System;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using Microsoft.Win32;
using ABB.Robotics.Controllers.FileSystemDomain;

namespace VCUProject
{
    /* ProgrammingPage 
     * This page is responsible for displaying and manipulating the programming environment of DUPLO.
     * It basically contains a WebView that renders our language (https://vcuse.github.io/duplo/).
     * We use this page to create a "bridge" between our website and the robot's controller.
     * All the communication is done using POST messages.
     */
    public partial class ProgrammingPage : Page
    {
        /* ABB SDK variables */
        private Controller _controller;
        private Task armTask;

        //states for saving of a file or submitting RAPID code
        private enum next_message_type
        {
            RAPID,
            FILE
        }

        private next_message_type next_message = next_message_type.RAPID;   //tells host app what the next type of message will be if it hits else statement in parsemessage() function

        public ProgrammingPage(Controller controller)
        {
            /* Constructor - receives the controller from MainWindow */
            _controller = controller;
            InitializeComponent();
            CreateProgramLocally();
            InitializeAsync();
        }
        async void InitializeAsync()
        {
            /* Method - Initializes the async communication with the WebView. When a POST mesage is received,
             * the listener ParseMessageFromWeb is invoked. */
            await webView.EnsureCoreWebView2Async(null);
            webView.CoreWebView2.WebMessageReceived += ParseMessageFromWeb;

            _controller.Rapid.ExecutionStatusChanged += Rapid_ExecutionStatusChanged;   //execution status of the controller event handler
        }
        
        private void Rapid_ExecutionStatusChanged(object sender, ExecutionStatusChangedEventArgs e)
        {
            webView.CoreWebView2.PostWebMessageAsString(e.Status.ToString());   //update webview on controllers execution status
        }

        private void ParseMessageFromWeb(object sender, CoreWebView2WebMessageReceivedEventArgs args)
        {
            /* Listener - Handles the POST messages received from our website (https://vcuse.github.io/duplo/).
             * There are different kinds of tasks received from the website:
             * 1) Start/Stop execution.
             * 2) Change current arm (which we define as robot's tasks T_ROB_R and T_ROB_L).
             * 3) Upload code to the controller.
             * 4) Request the arm positions as robtargets
             * 5) Save a Blockly workspace to disk
             * 6) Load a saved workspace into Blockly
             * Notice that each task is handled by the if below.
             */

            string messageFromWeb = args.TryGetWebMessageAsString();

            /* If the message received is START_EXEC, start controller execution */
            if (messageFromWeb == "START_EXEC")
            {
                StartRapidExecution();
            }
            /* If the message received is STOP_EXEC, stop controller execution */
            else if (messageFromWeb == "STOP_EXEC")
            {
                _controller.Rapid.Stop(StopMode.Immediate);
            }
            else if (messageFromWeb == "UPDATE_LEFT_ARM_POSITION" || messageFromWeb == "UPDATE_RIGHT_ARM_POSITION")
            {
                GetArmPositions(messageFromWeb);
            }
            /* If the message received is T_ROB_L or T_ROB_R, update the robot task */
            else if (messageFromWeb == "T_ROB_L" || messageFromWeb == "T_ROB_R")
            {
                _controller.Rapid.Stop(StopMode.Immediate); //stop robot before load to prevent double click of start/gripper button errors
                armTask = _controller.Rapid.GetTask(messageFromWeb);
            }
            //tells WPF that next message will contain the file contents
            else if (messageFromWeb == "SAVE_FILE")
            {
                next_message = next_message_type.FILE;
            }
            //tells WPF that save is done and change next message state back to RAPID
            else if (messageFromWeb == "END_SAVE")
            {
                next_message = next_message_type.RAPID;
            }
            //user is requesting a file be opened from the webview
            else if (messageFromWeb == "OPEN_FILE")
            {
                OpenFile();
            }
            /* If it is not one of the options above, we check the next_message state to determine if we are submitting RAPID code,
             *or saving the message as a json file*/
            else
            {
                if(next_message == next_message_type.RAPID) CreateModuleLocally(messageFromWeb);
                else if (next_message == next_message_type.FILE) SaveBlocklyWorkspaceLocally(messageFromWeb);
                else if (messageFromWeb.StartsWith("<Prototype Log>")) SaveLogMessage(messageFromWeb);
            }
        }

        private void SaveLogMessage(string message)
        {
            string documentFolder = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            string logsFolder = Path.Combine(documentFolder, "Duplo/Logs");

            try
            {
                if (!Directory.Exists(logsFolder))
                {
                    Directory.CreateDirectory(logsFolder);
                }

                string filename = "LogsBackup" + ".txt";
                string logFilepath = Path.Combine(logsFolder, filename);

                using (StreamWriter writer = File.AppendText(logFilepath))
                {
                    writer.WriteLine(message);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Exception while autosaving log message: " + ex);
            }
        }

        private void CreateProgramLocally()
        {
            /* Method - Creates a local boilerplate of a RAPID program for each one of the arms.
             * To prevent the user from losing any programs that he is developing outside of DUPLO,
             * we first create a new program before uploading any modules to the controller. 
             * TO-DO: Replace the current program with a new one everytime the programNameTextBox is changed.
             */
            try
            {
                string documentFolder = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                string duploFolder = Path.Combine(documentFolder, "Duplo");

                if (!Directory.Exists(duploFolder))
                {
                    Directory.CreateDirectory(duploFolder);
                }

                string[] taskNames = { "T_ROB_L", "T_ROB_R" };

                foreach (string taskName in taskNames) {
                    //string programFilename = programNameTextBox.Text + "_" + taskName + ".pgf";
                    string programFilename = "DuploExample_" + taskName + ".pgf";   //TODO: fileName should come from webpage
                    string programLocalFilepath = Path.Combine(duploFolder, programFilename);
                    string[] programBoilerplate = { "<?xml version=\"1.0\" encoding=\"ISO-8859-1\" ?>", "<Program>", "</Program>" };

                    using (StreamWriter fileWriter = new StreamWriter(programLocalFilepath))
                    {
                        foreach (string line in programBoilerplate)
                            fileWriter.WriteLine(line);
                    }

                    armTask = _controller.Rapid.GetTask(taskName);
                    LoadLocalProgramToController(programLocalFilepath, programFilename);
                }
            }
            catch (IOException ex)
            {
                MessageBox.Show("IOException while preparing code for submission: " + ex.ToString());
            }
            catch (ObjectDisposedException ex)
            {
                MessageBox.Show("ObjectDisposedException error while preparing code for submission: " + ex.ToString());
            }
        }

        private void LoadLocalProgramToController(string programLocalFilepath, string programFilename)
        {
            /* Method - Responsible for loading a program stored locally on a computer, more specifically from our
             * Duplo's folder, into the robot's controller. 
             */
            bool loadingSuccessful = false;

            try
            {
                /* We must request mastership access before uploading the program structure */
                using (Mastership mastership = Mastership.Request(_controller))
                {
                    UserAuthorizationSystem uas = _controller.AuthenticationSystem;

                    /* Check if the load permission is granted */
                    if (uas.CheckDemandGrant(Grant.LoadRapidProgram) && uas.CheckDemandGrant(Grant.AdministrateSystem))
                    {
                        /* If the controller is virtual, we just need to load the program into the controller.
                         * However, if the controller is physical, we have to first move the program file from the computer
                         * to the controller, and then load the program from it's memory:
                         * https://forums.robotstudio.com/discussion/10117/file-not-found-or-could-not-be-opened-for-reading */

                        if (_controller.IsVirtual)
                        {
                            loadingSuccessful = armTask.LoadProgramFromFile(programLocalFilepath, RapidLoadMode.Replace);
                        }
                        else
                        {
                            /* Remote here means the physical controller file system (RobotWare), and local the computer file system (Windows). */
                            string duploRemoteFolder = "Duplo";
                            string programRemoteFilepath = FileSystemPath.Combine(duploRemoteFolder, programFilename);

                            if (!_controller.FileSystem.DirectoryExists(duploRemoteFolder))
                            {
                                _controller.FileSystem.CreateDirectory(duploRemoteFolder);
                            }

                            if (_controller.FileSystem.FileExists(programRemoteFilepath))
                            {
                                _controller.FileSystem.RemoveFile(programRemoteFilepath);
                            }

                            _controller.FileSystem.PutFile(programLocalFilepath, programRemoteFilepath);
                            armTask.DeleteProgram();
                            armTask.LoadProgramFromFile(FileSystemPath.Combine(_controller.FileSystem.RemoteDirectory, programRemoteFilepath), RapidLoadMode.Replace);
                        }
                    }
                }
            }
            catch (InvalidCastException ex)
            {
                MessageBox.Show("InvalidCastException while loading program from local: " + ex.Message);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Exception while loading program from local: " + ex.Message);
            }
        }

        //Saves the blockly workspace either as an autosave or a save by name. Autosaved workspace is overwritten each time.
        //The goal of the autosave is to be able to recover your workspace in case of a crash. Otherwise use save as.
        private void SaveBlocklyWorkspaceLocally(string file)
        {
            if (file.Contains("\"autosave\": true")) //this is an autosave
            {
                try
                {
                    string documentFolder = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                    string duploFolder = Path.Combine(documentFolder, "Duplo/AutosavedWorkspace");

                    if (!Directory.Exists(duploFolder))
                    {
                        Directory.CreateDirectory(duploFolder);
                    }

                    string filename = "WorkspaceBackup" + ".json";
                    string localFilepath = Path.Combine(duploFolder, filename);
                    File.WriteAllText(localFilepath, file);
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Exception while autosaving workspace: " + ex);
                    next_message = next_message_type.RAPID;
                }
            }
            else //this is a save by name
            {
                try
                {
                    string documentFolder = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                    string duploFolder = Path.Combine(documentFolder, "Duplo/SavedWorkspaces");

                    if (!Directory.Exists(duploFolder))
                    {
                        Directory.CreateDirectory(duploFolder);
                    }

                    SaveFileDialog saveFileDialog = new SaveFileDialog
                    {
                        InitialDirectory = documentFolder + "\\Duplo\\SavedWorkspaces\\",
                        Title = "Save Blockly Workspace",
                        OverwritePrompt = true,
                        DefaultExt = "json",
                        Filter = "json files (*.json)|*.json",
                        FilterIndex = 2,
                        RestoreDirectory = true,

                    };

                    if (saveFileDialog.ShowDialog() == true)
                    {
                        File.WriteAllText(saveFileDialog.FileName, file);
                        webView.CoreWebView2.PostWebMessageAsString(saveFileDialog.SafeFileName);
                    }
                    else webView.CoreWebView2.PostWebMessageAsString("SAVE_CANCELLED");

                }
                catch (Exception ex)
                {
                    MessageBox.Show("Exception while saving workspace: " + ex);
                    next_message = next_message_type.RAPID;
                    webView.CoreWebView2.PostWebMessageAsString("SAVE_FILE_ERROR");
                }
            }           
        }

        private void OpenFile()
        {
            try
            {
                string documentFolder = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                string duploFolder = Path.Combine(documentFolder, "Duplo/SavedWorkspaces");

                if (Directory.Exists(duploFolder))
                {
                    OpenFileDialog openFileDialog = new OpenFileDialog
                    {
                        InitialDirectory = documentFolder + "\\Duplo\\SavedWorkspaces\\",
                        Title = "Load Saved Blockly Workspace",

                        CheckFileExists = true,
                        CheckPathExists = true,

                        DefaultExt = "json",
                        Filter = "json files (*.json)|*.json",
                        FilterIndex = 2,
                        RestoreDirectory = true,

                        ReadOnlyChecked = true,
                        ShowReadOnly = true
                    };

                    if (openFileDialog.ShowDialog() == true)
                    {
                        string file_contents = File.ReadAllText(openFileDialog.FileName);
                        webView.CoreWebView2.PostWebMessageAsString(openFileDialog.SafeFileName);   //send filename to webview
                        webView.CoreWebView2.PostWebMessageAsString(file_contents); //send file contents to webview                        
                    }
                }
                else
                {
                    webView.CoreWebView2.PostWebMessageAsString("OPEN_FILE_ERROR");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error opening file: " + ex);
                webView.CoreWebView2.PostWebMessageAsString("OPEN_FILE_ERROR");
            }
        }

        private void CreateModuleLocally(string rapidCode)
        {
            /* Method - To prepare the code for submission, we must create a RAPID module, 
             * and load our code into the robot's controller. This method creates a local folder called Duplo,
             * and prepares the module to be uploaded on the controller.
             * Notice that the RAPID code (string rapidCode) is received from a POST message of our website.
             */
            try
            {
                string documentFolder = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                string duploFolder = Path.Combine(documentFolder, "Duplo");

                if (!Directory.Exists(duploFolder))
                {
                    Directory.CreateDirectory(duploFolder);
                }

                string moduleFilename = armTask + ".mod";
                string moduleLocalFilepath = Path.Combine(duploFolder, moduleFilename);
                File.WriteAllText(moduleLocalFilepath, rapidCode);

                LoadLocalModuleToController(moduleLocalFilepath, moduleFilename);
            }
            catch (IOException ex)
            {
                MessageBox.Show("IOException while preparing code for submission: " + ex.ToString());
            }
            catch (ObjectDisposedException ex)
            {
                MessageBox.Show("ObjectDisposedException error while preparing code for submission: " + ex.ToString());
            }
        }

        private void LoadLocalModuleToController(string moduleLocalFilepath, string moduleFilename)
        {
            /* Method - Responsible for loading a module stored locally on a computer, more specifically from our
             * Duplo's folder, into the robot's controller. 
             */
            bool loadingSuccessful = false;

            try
            {
                /* We must request mastership access before uploading the code */
                using (Mastership mastership = Mastership.Request(_controller))
                {
                    UserAuthorizationSystem uas = _controller.AuthenticationSystem;

                    /* Check if the load permission is granted */
                    if (uas.CheckDemandGrant(Grant.LoadRapidProgram) && uas.CheckDemandGrant(Grant.AdministrateSystem))
                    {
                        /* If the controller is virtual, we just need to load the module into the controller.
                         * However, if the controller is physical, we have to first move the files from the computer
                         * to the controller, and then load the module from it's memory:
                         * https://forums.robotstudio.com/discussion/10117/file-not-found-or-could-not-be-opened-for-reading */

                        if (_controller.IsVirtual) {
                            loadingSuccessful = armTask.LoadModuleFromFile(moduleLocalFilepath, RapidLoadMode.Replace);
                        } 
                        else
                        {
                            /* Remote here means the physical controller file system (RobotWare), and local the computer file system (Windows). */
                            string duploRemoteFolder = "Duplo";
                            string moduleRemoteFilepath = FileSystemPath.Combine(duploRemoteFolder, moduleFilename);

                            if (!_controller.FileSystem.DirectoryExists(duploRemoteFolder))
                            {
                                _controller.FileSystem.CreateDirectory(duploRemoteFolder);
                            }

                            if (_controller.FileSystem.FileExists(moduleRemoteFilepath))
                            {
                                _controller.FileSystem.RemoveFile(moduleRemoteFilepath);
                            }

                            _controller.FileSystem.PutFile(moduleLocalFilepath, moduleRemoteFilepath);
                            armTask.LoadModuleFromFile(FileSystemPath.Combine(_controller.FileSystem.RemoteDirectory, moduleRemoteFilepath), RapidLoadMode.Replace);                            
                        }
                    }
                }
            }
            catch (InvalidCastException ex)
            {
                MessageBox.Show("InvalidCastException while loading module from local: " + ex.Message);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Exception while loading module from local: " + ex.Message);
            }
        }

        private void StartRapidExecution()
        {
            string[] taskNames = { "T_ROB_L", "T_ROB_R" };

            try
            {
                using (Mastership mastership = Mastership.Request(_controller))
                {
                    UserAuthorizationSystem uas = _controller.AuthenticationSystem;

                    if (uas.CheckDemandGrant(Grant.ExecuteRapid))
                    {
                        foreach (string task in taskNames)
                        {
                            armTask = _controller.Rapid.GetTask(task);  //get each task
                            armTask.ResetProgramPointer();  //reset program pointer of task to main
                        }
                        
                        StartResult result = _controller.Rapid.Start();
                        if(result.ToString() != "Ok")
                            MessageBox.Show("Start Failed: " + result.ToString());
                    }
                }
            }
            catch (InvalidCastException ex)
            {
                MessageBox.Show("InvalidCastException while starting execution: Mastership is held. " + ex.Message);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Exception while starting execution:: " + ex.Message);
            }
        }

       
        //gets positions of arms on click of ARMS button from Duplo
        private void GetArmPositions(string messageFromWeb)
        {
            RobTarget armRobTarget;
            Task task;
            string messageToWeb = "";

            switch (messageFromWeb)
            {
                case "UPDATE_LEFT_ARM_POSITION":
                    try
                    {
                        task = _controller.Rapid.GetTask("T_ROB_L");
                        armRobTarget = task.GetRobTarget();
                        messageToWeb = armRobTarget.ToString();
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Exception while getting left arm target:: " + ex.Message);
                    }
                    break;

                case "UPDATE_RIGHT_ARM_POSITION":
                    try
                    {
                        task = _controller.Rapid.GetTask("T_ROB_R");
                        armRobTarget = task.GetRobTarget();
                        messageToWeb = armRobTarget.ToString();
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Exception while getting right arm target:: " + ex.Message);
                    }
                    break;

            }
            
            webView.CoreWebView2.PostWebMessageAsString(messageToWeb);   //send arm positions to webview upon request
        }
    }
}
