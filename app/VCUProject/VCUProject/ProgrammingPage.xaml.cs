using ABB.Robotics.Controllers;
using ABB.Robotics.Controllers.EventLogDomain;
using ABB.Robotics.Controllers.RapidDomain;
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

            /* The may request the application to start program execution */
            if (messageFromWeb == "EXECUTE")
            {
                StartProgramExecution();
            }
            /* The webView may request the application to update the current robot task */
            else if (messageFromWeb == "T_ROB_L" || messageFromWeb == "T_ROB_R")
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
                MessageBox.Show("Error while writing module file to computer: " + ex.ToString());
            }
            catch (ObjectDisposedException ex)
            {
                MessageBox.Show("Error while writing module file to computer: " + ex.ToString());
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
    }
}
