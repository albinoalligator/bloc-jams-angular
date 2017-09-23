(function() {
    function seekBar($document){
        //calculates the horizontal percent along the seek bar where the event occurred (from view)
        var calculatePercent = function(seekBar, event){
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        return { //returned by the seekBar directive thru HTML compiler 
            templateUrl:'/templates/directives/seek_bar.html',//where directive loads a template from
            replace: true,//specifies what template replaces, true means it replaces the directive's element
            restrict: 'E',//restricts directive to a declaration style so e means element
            scope: {},//new scope for directive
            link: function(scope, element, attributes) {
                scope.value = 0;//holds value of seek bar eg currently playing song time or current volume
                scope.max = 100;//holds maximum value of the song and volume seek bars 
                
                //holds the element that matches the directive <seek-bar> as a jq object
                var seekBar = $(element);
                //function that calculates a percent based on the value and maximum value of whichever seekbar
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + '%';  
                };
                //returns the width of the seek bar fill element based on the calculated percent 
                scope.fillStyle = function() {
                    return {
                        width: percentString()
                    };
                };
                
                //updates the seek bar value based on the seek bar's width and the location of the users click on the seek bar
                scope.onClickSeekBar = function(event){
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max; 
                };
                //uses $apply to constantly update the change in the value of scope.value as the user DRAGS the thumb
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function (event){
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function(){
                            scope.value = percent * scope.max;
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function(){
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });  
                };
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);//seek bar is a factory function that describes the directives behavior 
})();