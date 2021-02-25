using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using ABB.Robotics.Controllers;
using ABB.Robotics.Controllers.Discovery;

namespace VCUProject
{
    /* ConnectionPage 
     * This is the first page that the user will deal with. It is responsible
     * for creating the connection with the robot's controller. Notice that the 
     * user must provide the IP address of the controller (127.0.0.1 if virtual),
     * and the user and password available in the UAS of the controller.
     */
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
            /* Listener - When the connect button is used, this method tries to connect
            *  to the controller in the local network according to the information provide by the user.
            *  If the controller is found in the local network, the user is redirected to the programming environment.
            *  If the controller is not found, the user receives a warning message.
            */
            bool controllerWasFound = false;
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
                    controllerWasFound = true;
                }
            }

            if (!controllerWasFound)
            {
                MessageBox.Show("No controller was found. Please verify if the information provided is correct.");
            }
        }
    }
}
