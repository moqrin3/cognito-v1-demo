const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

// TODO: import cognito
const poolData = {
  UserPoolId: 'USER_POOL_ID',
  ClientId: 'CLIENT_APP_ID',
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var attributeList = [];

$(document).on('click', '#signup', function () {
  signUp();
});

var signUp = function () {
  var username = $('#email').val();
  var name = $('#name').val();
  var password = $('#password').val();

  var dataEmail = {
    Name: 'email',
    Value: username,
  };
  var dataName = {
    Name: 'name',
    Value: name,
  };

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataEmail
  );
  var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);

  attributeList.push(attributeEmail);
  attributeList.push(attributeName);

  userPool.signUp(
    username,
    password,
    attributeList,
    null,
    function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      setTimeout(function () {
        window.location.href = './confirm.html';
      }, 500);
    }
  );
};
