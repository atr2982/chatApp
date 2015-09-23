(function() {

  'use strict';

  angular
    .module('smsApp')
    .factory('Status', StatusService);

  function StatusService($firebaseArray) {
    var ref = new Firebase("https://smsclass.firebaseio.com/status");
    return $firebaseArray(ref);
  }

})();