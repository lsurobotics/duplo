using ABB.Robotics.Controllers;
using ABB.Robotics.Controllers.EventLogDomain;
using ABB.Robotics.Controllers.RapidDomain;
using ABB.Robotics.Controllers.MotionDomain;
using Microsoft.Web.WebView2.Core;
using System;
using System.Diagnostics;
using System.IO;
using System.Windows;
using System.Windows.Controls;

namespace VCUProject
{
    /// <summary>
    /// Interaction logic for ProgrammingPage.xaml
    /// </summary>
    public partial class ProgrammingPage : Page
    {
        private Controller _controller;
        private Task armTask;

        public ProgrammingPage(Controller controller)
        {
            InitializeComponent();
            _controller = controller;
            InitializeAsync();
        }
        async void InitializeAsync()
        {
            await webView.EnsureCoreWebView2Async(null);
            webView.CoreWebView2.WebMessageReceived += ParseMessageFromWeb;
        }

        private void ParseMessageFromWeb(object sender, CoreWebView2WebMessageReceivedEventArgs args)
        {
            string messageFromWeb = args.TryGetWebMessageAsString();

            /* The webView may request the application to update the current robot task */
            if (messageFromWeb == "T_ROB_L" || messageFromWeb == "T_ROB_R")
            {
                armTask = _controller.Rapid.GetTask(messageFromWeb);
            }
            /* If it is not one of the options above, we consider the message as RAPID code */
            else
            {
                PrepareCodeForSubmission(messageFromWeb);
            }
        }

        private void StartProgramExecution()
        {
            _controller.Rapid.Start();
        }

        private void PrepareCodeForSubmission(string rapidCode)
        {            
            try
            {
                string documentFolder = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                string duploFolder = Path.Combine(documentFolder, "Duplo");
                Directory.CreateDirectory(duploFolder);
                string moduleFilename = armTask + ".mod";
                string modulePath = Path.Combine(duploFolder, moduleFilename);
                File.WriteAllText(modulePath, rapidCode);
                LoadModuleFromLocal(modulePath, armTask);
            }
            catch (IOException ex)
            {
                MessageBox.Show("Error while saving module: " + ex.ToString());
            }
            catch (ObjectDisposedException ex)
            {
                MessageBox.Show("Error while saving module: " + ex.ToString());
            }
        }

        private void LoadModuleFromLocal(string programPath, Task armTask)
        {
            bool loadingSuccessful = false;

            try
            {
                using (Mastership mastership = Mastership.Request(_controller))
                {
                    UserAuthorizationSystem uas = _controller.AuthenticationSystem;                    

                    if (uas.CheckDemandGrant(Grant.LoadRapidProgram))
                    {
                        loadingSuccessful = armTask.LoadModuleFromFile(programPath, RapidLoadMode.Replace);   
                    }
                }
            }
            catch (InvalidCastException ex)
            {
                MessageBox.Show("Mastership is held by another client: " + ex.Message);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Unexpected error: " + ex.Message);
            }
        }

        private void StartRapidExecution(object sender, RoutedEventArgs e)
        {
            VirtualPanel panel = VirtualPanel.Attach(_controller);

            try
            {
                panel.ChangeMode(ControllerOperatingMode.Auto, 5000);
            }
            catch (ABB.Robotics.TimeoutException)
            {
                MessageBox.Show("Connection timeout. Start the program again.");
            }

            panel.Dispose();

            try
            {
                using (Mastership mastership = Mastership.Request(_controller))
                {
                    UserAuthorizationSystem uas = _controller.AuthenticationSystem;

                    if (uas.CheckDemandGrant(Grant.ExecuteRapid))
                    {
                        StartResult result = _controller.Rapid.Start();
                    }
                }
            }
            catch (InvalidCastException ex)
            {
                MessageBox.Show("Mastership is held by another client: " + ex.Message);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Unexpected error: " + ex.Message);
            }
        }

        private void StopRapidExecution(object sender, RoutedEventArgs e)
        {
            _controller.Rapid.Stop();         
        }

        //gets positions of arms on click of ARMS button from Duplo
        private void GetArmPositions(object sender, RoutedEventArgs e)
        {
            RobTarget RightArmRobTarget;
            RobTarget LeftArmRobTarget;
            string leftArmMessage = "";
            string rightArmMessage = "";

            MechanicalUnitCollection aMechUnitCollection = _controller.MotionSystem.MechanicalUnits;    //get array of all mechanical units

            //get robot target position of left and right arms
            foreach (MechanicalUnit m in aMechUnitCollection)
            {
                switch (m.Name)
                {
                    case "ROB_R":
                        RightArmRobTarget = m.GetPosition(CoordinateSystemType.World);  //get current right arm position as a robtarget
                        rightArmMessage = "ROB_R:" + RightArmRobTarget.ToString();
                        break;

                    case "ROB_L":
                        LeftArmRobTarget = m.GetPosition(CoordinateSystemType.World);   //get left arm position as a robtarget
                        leftArmMessage = "ROB_L:" + LeftArmRobTarget.ToString();
                        break;
                }
            }

            webView.CoreWebView2.PostWebMessageAsString(rightArmMessage + "\n" + leftArmMessage);   //send arm positions to webview upon request
        }
    }
}
