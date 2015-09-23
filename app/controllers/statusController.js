(function() {

	'use strict';

	angular
		.module('smsApp')
		.controller('StatusController', StatusController);

	function StatusController($rootScope, Status, md5) {

		this.addStatus = addStatus;
		this.deleteStatus = deleteStatus;
		this.md5 = md5;
		this.statusData = Status;

		function addStatus() {
			if(this.statusText) {

				// Add the status data to Firebase
				this.statusData.$add({
					date: Firebase.ServerValue.TIMESTAMP,
					text: this.statusText,
					user: {
						username: $rootScope.loggedInUserData.username,
						email: $rootScope.loggedInUserData.email
					}
				});
				this.statusText = '';
			}
		}

		function deleteStatus(status) {

			// Remove the status that was passed in
			// from the views
			this.statusData.$remove(status);
		}
	}

})();