// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var AUTH0_CLIENT_ID = "{CLIENT_ID}";
	var AUTH0_DOMAIN = "{DOMAIN}";

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
				// TODO: This application has been newly launched. Initialize your application here.
			} else {
				// TODO: This application was suspended and then terminated.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
			}
			args.setPromise(WinJS.UI.processAll());

			var loginButton = document.getElementById("loginButton");
			loginButton.addEventListener("click", loginButtonClickHandler, false);

			var loginWithConnectionButton = document.getElementById("loginWithConnectionButton");
			loginWithConnectionButton.addEventListener("click", loginWithConnectionButtonClickHandler, false);

			var loginCustomButton = document.getElementById("loginCustomButton");
			loginCustomButton.addEventListener("click", loginCustomButtonClickHandler, false);
        }
	};

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	function loginButtonClickHandler(eventInfo) {
	    var auth0 = new Auth0Client(AUTH0_DOMAIN, AUTH0_CLIENT_ID);

	    auth0.Login(function(err, result) {
	        if (err) {
	            displayError(err);
	            return err;
	        }

	        displayProfile(result.Profile);
	    });
	}

	function loginWithConnectionButtonClickHandler(eventInfo) {
	    var auth0 = new Auth0Client(AUTH0_DOMAIN, AUTH0_CLIENT_ID);

	    var connectionNameInput = document.getElementById("connectionName");

	    auth0.Login({ connection : connectionNameInput.value }, function (err, result) {
	        if (err) {
	            displayError(err);
	            return err;
	        }

	        displayProfile(result.Profile);
	    });
	}

    function loginCustomButtonClickHandler(eventInfo) {
        var auth0 = new Auth0Client(AUTH0_DOMAIN, AUTH0_CLIENT_ID);

        var dbConnectionNameInput = document.getElementById("dbConnectionName");
        var usernameInput = document.getElementById("username");
        var passwordInput = document.getElementById("password");

        auth0.Login({
            connection: dbConnectionNameInput.value,
            username: usernameInput.value,
            password: passwordInput.value
        }, function(err, result) {
            if (err) {
                displayError(err);
                return err;
            }

            displayProfile(result.Profile);
        });
    }

    function displayProfile(profile) {
        var profileDisplayArea = document.getElementById("profileDisplayArea");

        profileDisplayArea.innerHTML = JSON.stringify(profile);
    }

    function displayError(error) {
        var profileDisplayArea = document.getElementById("profileDisplayArea");

        profileDisplayArea.innerHTML = "ERROR: " + error;
    }

	app.start();

})();
