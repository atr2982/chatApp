(function() {

	'use strict';

	angular
		.module('smsApp')
		.controller('AuthController', AuthController);

	function AuthController(Auth, User, $state) {

		var uData = this;

		uData.createUser = createUser;
		uData.login = login;

		function createUser() {

			// Check if someone is already logged in and log them out if they are
			Auth.$unauth();

			if (uData.code != "fullsail") {
                $state.go('error');
                
            }
            else {
                Auth.$createUser({
				email: uData.email,
				password: uData.password
                }).then(function(userData) {
                    saveUser(userData);
                    $state.go('auth');
                    window.location.reload();
                }).catch(function(error) {
                    uData.error = error;
                });
            }
		}

		function saveUser(userData) {

			var user = User.newUserRef(userData);
			user.username = uData.username;
			user.email = uData.email;

			user.$save().then(function(success) {
				uData.username = null;
				uData.email = null;
				uData.password = null;
			}, function(error) {
				console.log(error);
			});
		}

		function login() {
            
            // Check if someone is already logged in and log them out if they are
			Auth.$unauth();

			Auth.$authWithPassword({

				email: uData.email,
				password: uData.password
			}).then(function(data) {
				uData.email = null;
				uData.password = null;
				$state.go('status');
			}).catch(function(error) {
				console.log(error);
			});
		}
	}

})();