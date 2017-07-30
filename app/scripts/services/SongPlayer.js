(function(){
    /**
    *@function SongPlayer
    *@desc Makes play/pause methods available to app
    *@returns {Object} SongPlayer
    */
    function SongPlayer(){
        
        /**
        *@desc Holds play/pause functionality of SongPlayer service
        *@type {Object}
        */
        var SongPlayer = {};
        
        /**
        *@desc Current song playing from song object
        *@type {Object}
        */
        var currentSong = null;
        
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
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl,{
                formats: ['mp3'],
                preload: true     
            });
            
            currentSong = song;
        };
        
        /**
        *@function playSong
        *@desc Plays the current song using currentBuzzObject and sets song playing to true
        *@param {Object} song
        */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        *@function SongPlayer.play
        *@desc Checks if song clicked is current song playing and plays song clicked, else current song playing was paused and is played again
        *@param {Object} song
        */  
        SongPlayer.play = function(song){
            if(currentSong !== song){   
                setSong(song);
                playSong(song);
                
            }else if (currentSong === song){
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
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();