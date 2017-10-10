(function(){
    /**
    *@function SongPlayer
    *@desc Makes play/pause methods available to app
    *@returns {Object} SongPlayer
    */
    function SongPlayer($rootScope, Fixtures){
        
        /**
        *@desc Holds play/pause functionality of SongPlayer service
        *@type {Object}
        */
        var SongPlayer = {};
        
        /**
        *@desc Gets album object 
        *@type {Object}
        *@returns albumPicasso
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        *@desc Buzz object audio file
        *@type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        *@function setSong
        *@desc Stops currently playing song and loads new audio file as currentBuzzObject
        *@param {Object} song
        */
        var setSong = function(song){
            if(currentBuzzObject){
                stopSong(song);
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl,{
                formats: ['mp3'],
                preload: true     
            });
            
            currentBuzzObject.bind('timeupdate', function(){
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
        };
        
        /**
        *@function playSong
        *@desc Plays the current song using currentBuzzObject and sets song playing to true
        *@param {Object} song
        */
        var playSong = function(song){
            currentBuzzObject.play();
            SongPlayer.currentSong.playing = true;
        };
        
        /**
        *@function getSongIndex
        *@desc Provides index of current song playing in album
        *@param {Object} song
        @returns Index 
        */
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        *@function stopSong
        *@desc stops the currentBuzzObject and sets playing property to null
        *@param {Object} song
        */ 
        var stopSong = function(song){
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
                
        /**
        *@desc Current song playing from song object
        *@type {Object}
        */
        SongPlayer.currentSong = null;
        
         /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /**
        *@desc Current volume 
        *@type {number}
        */
        
        SongPlayer.volume = 0;
        
        /**
        *@function SongPlayer.play
        *@desc Checks if song clicked is current song playing and plays song clicked, else current song playing was paused and is played again
        *@param {Object} song
        */  
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song){   
                setSong(song);
                playSong(song);
                
            }else if (SongPlayer.currentSong === song){
                if(currentBuzzObject.isPaused()){
                    currentBuzzObject.play();
                }
            }
        };
        
        /**
        *@function SongPlayer.pause
        *@desc Pauses the CurrentBuzzObject audio file and sets playing property on song object to false
        *@param {Object} song
        */
        SongPlayer.pause = function(song){
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        *@function SongPlayer.previous
        *@desc If current index is <0 the current song is stopped else the current song index is decreased and the song is set is played
        */
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0){
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        *@function SongPlayer.next
        *@desc If the current index is 0+ then the current song index is increased and the song is played 
        */ 
        SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if(currentSongIndex >= 0){
                stopSong(song);
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);     
            }
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        
        SongPlayer.setCurrentTime = function(time){
            if (currentBuzzObject){
                currentBuzzObject.setTime(time);
            }
        };
        
        SongPlayer.setVolume = function(){
            if (currentBuzzObject){
                currentBuzzObject.setVolume();
            }
        };
        
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer',['$rootScope','Fixtures', SongPlayer]);
})();