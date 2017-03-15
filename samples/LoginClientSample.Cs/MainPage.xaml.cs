using Auth0.LoginClient;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace LoginClientSample.Cs
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private Auth0Client auth0Client;

        public MainPage()
        {
            this.InitializeComponent();

            auth0Client = new Auth0Client("{DOMAIN}", "{CLIENT_ID}");
        }

        private async void LoginButton_OnClick(object sender, RoutedEventArgs e)
        {
            try
            {
                var user = await auth0Client.LoginAsync();
                UserInfoTextBox.Text = user.Profile.ToString();
            }
            catch (Exception ex)
            {
                UserInfoTextBox.Text = ex.Message;
            }
        }

        private async void LoginWithConnectionButton_OnClick(object sender, RoutedEventArgs e)
        {
            try
            {
                var user = await auth0Client.LoginAsync(ConnectionNameTextBox.Text);
                UserInfoTextBox.Text = user.Profile.ToString();
            }
            catch (Exception ex)
            {
                UserInfoTextBox.Text = ex.Message;
            }
        }

        private async void LoginNoWidgetButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var user = await auth0Client.LoginAsync(DBConnectionNameTextBox.Text, UsernameTextBox.Text, PasswordTextBox.Password);
                UserInfoTextBox.Text = user.Profile.ToString();
            }
            catch (Exception ex)
            {
                UserInfoTextBox.Text = ex.Message;
            }
        }
    }
}
