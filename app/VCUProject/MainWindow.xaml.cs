using ABB.Robotics.Controllers;
using ABB.Robotics.Controllers.Discovery;
using System.Windows;
using System.Windows.Controls;


namespace VCUProject
{
    /* MainWindow
     * This window is responsible for displaying the pages
     * of our application. It does not contain any robot-related
     * tasks, only a toolbar and a frame which renders the pages.
     */
    public partial class MainWindow : Window
    {
        /* ABB SDK startup variables */
        public Controller controller = null;
        public NetworkScanner scanner = new NetworkScanner();
        public NetworkWatcher watcher = new NetworkWatcher();

        public MainWindow()
        {
            /* Constructor - Initializes the window with the connection page */
            InitializeComponent();
            ConnectionPage connectionPage = new ConnectionPage(controller, scanner);
            connectionPage.NewControllerWasConnected += DisplayPage;
            DisplayPage(this, connectionPage);
        }

        private void DisplayPage(object sender, Page requestedPage)
        {
            /* Listener - receives a page request and display it on the MainWindow */
            this.Title = requestedPage.Title;
            MainWindowFrame.Content = requestedPage;
        }

        private void MinimizeMainWindow(object sender, RoutedEventArgs e)
        {
            /* Listener - Minimizes the main window then the minize button is used */
            this.WindowState = WindowState.Minimized;
        }
        private void CloseMainWindow(object sender, RoutedEventArgs e)
        {
            /* Listener - Closes the main window then the close button is used */
            this.Close();
        }
    }
}
