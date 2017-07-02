(function(){
    function LandingCtrl(){
        this.heroTitle = "Turn the Music Up!";//this attaches a property to the $scope, and these properties are what the view will present and are available to the template at the location of the DOM point
    }
 
    angular
        .module('blocJams')
        .controller("LandingCtrl", LandingCtrl);
})();