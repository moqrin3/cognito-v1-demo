// TODO: import cognito
const poolData = {
  UserPoolId: 'USER_POOL_ID',
  ClientId: 'CLIENT_APP_ID',
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

$(document).on('click', '#confirm', function () {
  confirm();
});

var confirm = function () {
  var username = $('#email').val();
  var confirmation_code = $('#confirmation_code').val();

  var userData = {
    Username: username,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration(
    confirmation_code,
    true,
    function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      alert('call result: ' + result);
      setTimeout(function () {
        window.location.href = './signin.html';
      }, 500);
    }
  );
};
