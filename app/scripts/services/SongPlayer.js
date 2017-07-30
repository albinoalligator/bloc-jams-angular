(function(){
    /**
    *@function SongPlayer
    *@desc Makes play/pause methods available to app
    *@returns {Object} SongPlayer
    */
    function SongPlayer(Fixtures){
        
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl,{
                formats: ['mp3'],
                preload: true     
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
            song.playing = true;
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
        *@desc Current song playing from song object
        *@type {Object}
        */
        SongPlayer.currentSong = null;
        
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
        *@desc If current index is < 0 the current song is stopped else the current song index is set and song is played
        */
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer',['Fixtures', SongPlayer]);
})();