# Auth0 UWP JavaScript Sample

This tutorial explains how to integrate Auth0 with a Windows UWP application written in JavaScript. `Auth0.Windows.UWP.JavaScript` helps you authenticate users with any [Auth0 supported Identity Provider](http://auth0.com/docs/identityproviders).

You can follows the steps below to implement this in your own application, or alternatively you can run this sample by doing the following:

1. Make sure that `Auth0Client` constructor in `js/default.js` contains your credentials. You can find your credentials in the settings section of your Auth0 Client.
2. Hit F5 to start your UWP JS app.

## Install Auth0.Windows.UWP.JavaScript NuGet Package

Use the NuGet Package Manager Console (Tools > Nuget Package Manager > Package Manager Console) to install the Auth0.Windows.UWP.JavaScript package by running the command:

```text
Install-Package Auth0.Windows.UWP.JavaScript
```

Also, add reference to the JavaScript code in the `default.html`, by including the following line in the `<head>` element:

```html
<script src="/js/auth0.js"></script>
```

## Set up the Auth0 Callback URL

Go to the [Clients](https://manage.auth0.com/#/clients) section of the Auth0 Dashboard. Select your Client and go to the _Settings_, and make sure that **App Callbacks URLs** has the following value:

`https://YOUR_AUTH0_DOMAIN/mobile`

### 3. Integration

There are three options for implementing the integration:

1. Use [Auth0 Lock](https://www.auth0.com/docs/libraries/lock) with the Web Authentication Broker - the simplest method with only a few lines of code required.
2. Use [Auth0 Lock](https://www.auth0.com/docs/libraries/lock) with the Web Authentication Broker with a specific Connection.
3. Build a custom user interface to ask for username and password.

### Option 1: Auth0 Lock

Lock is the recommended option.

Here is a snippet of code to paste into your project:

```javascript
// default.js
var auth0 = new Auth0Client(
  "YOUR_AUTH0_DOMAIN",
  "CLIENT_ID");

auth0.Login(function (err, result) {
  if (err) return err;
  /*
  Use result to do wonderful things, e.g.:
    - get user email => result.Profile.email
    - get Windows Azure AD groups => result.Profile.groups
    - etc.
  */
});
```

### Option 2: Auth0 Lock with a Specific Connection

If you know which identity provider you want to use, you can add the `connection` parameter and the user will be directed to the specified `connection`:

```javascript
// default.js
auth0.Login({ connection: "auth0waadtests.onmicrosoft.com" }, function (err, result) {
  if (err) return err;
  /*
  Use result to do wonderful things, e.g.:
    - get user email => result.Profile.email
    - get Windows Azure AD groups => result.Profile.groups
    - etc.
  */
});
```

> Connection names can be found on Auth0 dashboard (e.g. `facebook`, `linkedin`, `saml-protocol-connection`).

### Option 3: Custom User Interface

The third option is to create your own custom user interface to prompt the user for their username and password. You can then pass these credentials, along with the connection name, to the `LoginAsync` method:

```javascript
// default.js
auth0.Login({
    connection: "my-db-connection",
    username: "username",
    password: "password"
  },
  function (err, result) {
    if (err) return err;
    /*
    Use result to do wonderful things, e.g.:
      - get user email => result.Profile.email
      - get Windows Azure AD groups => result.Profile.groups
      - etc.
    */
  });
```

#### Scope

Optionally you can specify the `scope` parameter. There are two possible values for scope:

* __scope: "openid"__ _(default)_ - this returns the `access_token`, and an `id_token` as a JSON Web Token (JWT). The JWT will only contain the user id.
* __scope: "openid {attr1} {attr2} {attrN}"__ - if you want only specific user attributes to be included in the `id_token` (for example: `scope: "openid name email picture"`).

For more information, see: [Scopes](https://www.auth0.com/docs/scopes).

## Accessing User Information

The `Auth0User` has the following properties:

* `Profile`: returns a `Newtonsoft.Json.Linq.JObject` object from [Json.NET component](http://www.newtonsoft.com/json) containing all available user attributes (e.g.:`user.Profile["email"].ToString()`).
* `IdToken`: a JSON Web Token (JWT) containing all of the user attributes and signed with your client secret.

* `Auth0AccessToken`: the `access_token` that can be used to call the Auth0 API. For example, you could use this token to [Link Accounts](https://www.auth0.com/docs/link-accounts).
