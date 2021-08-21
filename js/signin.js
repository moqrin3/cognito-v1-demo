AWS.config.region = 'ap-northeast-1';

// TODO: import cognito
const poolData = {
  UserPoolId: 'USER_POOL_ID',
  ClientId: 'CLIENT_APP_ID',
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// TODO: import cognito
var IdentityPoolId = 'IDENTITY_POOL_ID';

$(document).on('click', '#signin', function () {
  signIn();
});

var signIn = function () {
  var username = $('#email').val();
  var password = $('#password').val();

  var authenticationData = {
    Username: username,
    Password: password,
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  var userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId, // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          // TODO: import cognito
          'cognito-idp.ap-northeast-1.amazonaws.com/USER_POOL_ID':
            result.getIdToken().getJwtToken(),
        },
      });

      //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
      AWS.config.credentials.refresh((error) => {
        if (error) {
          console.error(error);
        } else {
          // Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3();
          console.log('Successfully logged!');
          setTimeout(function () {
            window.location.href = './app.html';
          }, 500);
        }
      });
    },

    onFailure: function (err) {
      alert(err.message || JSON.stringify(err));
    },
  });
};
