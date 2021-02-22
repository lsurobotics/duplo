using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using ABB.Robotics.Controllers;
using ABB.Robotics.Controllers.Discovery;

namespace VCUProject
{
    /// <summary>
    /// Interaction logic for ConnectionPage.xaml
    /// </summary>
    public partial class ConnectionPage : Page
    {
        private Controller _controller;
        private NetworkScanner _scanner;
        public event EventHandler<Page> NewControllerWasConnected;

        public ConnectionPage(Controller controller, NetworkScanner scanner)
        {
            InitializeComponent();
            _controller = controller;
            _scanner = scanner;
        }

        private void ConnectToController(object sender, RoutedEventArgs e)
        {
            IPAddress requestedAddress;
            IPAddress.TryParse(AddressBox.Text, out requestedAddress);
            UserInfo user = new UserInfo(UsernameBox.Text, PasswordBox.Password);
            _scanner.Scan();

            ControllerInfoCollection controllers = _scanner.Controllers;
            foreach (ControllerInfo controllerInfo in controllers)
            {

                if (controllerInfo.IPAddress.Equals(requestedAddress))
                {
                    /* Check if the controller is already in use
                        * before creating a new connection */
                    if (_controller != null)
                    {
                        _controller.Logoff();
                        _controller.Dispose();
                        _controller = null;
                    }

                    _controller = Controller.Connect(controllerInfo.SystemId, ConnectionType.Standalone);
                    _controller.Logon(user);

                    /* When a new controller is connected
                     * the event is invoked warning the window
                     * to display the programming page.
                     */
                    NewControllerWasConnected?.Invoke(this, new ProgrammingPage(_controller));
                }
            }
        }
    }
}
