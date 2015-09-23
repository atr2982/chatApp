(function() {

  'use strict';

  angular
    .module('smsApp')
    .factory('Auth', AuthService);

  function AuthService($firebaseAuth) {
    var ref = new Firebase("https://smsclass.firebaseio.com");
    return $firebaseAuth(ref);
  }

})();