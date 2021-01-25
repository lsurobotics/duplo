using ABB.Robotics.Controllers;
using ABB.Robotics.Controllers.Discovery;
using System.Windows;
using System.Windows.Controls;


namespace VCUProject
{
    /// <summary>
    /// Interaction logic for ConnectWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public Controller controller = null;
        public NetworkScanner scanner = new NetworkScanner();
        public NetworkWatcher watcher = new NetworkWatcher();

        public MainWindow()
        {
            InitializeComponent();
            ConnectionPage connectionPage = new ConnectionPage(controller, scanner);
            connectionPage.NewControllerWasConnected += displayPage;
            displayPage(this, connectionPage);
        }

        private void displayPage(object sender, Page requestedPage)
        {
            this.Title = requestedPage.Title;
            MainWindowFrame.Content = requestedPage;
        }
    }
}
