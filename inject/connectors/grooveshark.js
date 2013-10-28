/**
 * Lullaby - Grooveshark connector
 * by Matt Runkle
 *
 * https://github.com/runkalicious/lullaby
 *
 * Use of this source code is governed by the MIT license
 * that can be found in the LICENSE file.
 *
 */

var PLAYER = '#player';
var PAUSE = '#play-pause';
var LEAVE = '#bc-action-btn';

function l_isPlaying() {
	// Grooveshark hides the music pane when nothing is queued
	if ( !$(PLAYER).hasClass('playing') )
		return false;
	
	// Check is queue is set, but paused 
	return $(PAUSE).hasClass('playing');
}

function l_pause() {
	console.log("Pausing Grooveshark");
	
	if( ~document.location.hash.indexOf('broadcast') ) {
		// This is a broadcast, leave the room
		$(LEAVE)[0].click();
	}
	else {
		console.log("I should click the pause button");
		$(PAUSE)[0].click();
	}
}