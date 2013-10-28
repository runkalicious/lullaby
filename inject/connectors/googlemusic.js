/**
 * Lullaby - Google Music connector
 * by Matt Runkle
 *
 * https://github.com/runkalicious/lullaby
 *
 * Use of this source code is governed by the MIT license
 * that can be found in the LICENSE file.
 *
 */

function l_isPlaying() {
	// Google adds the class 'playing' to the play/pause button
	// when the player is active. The class is removed when paused
	// or not active.
	if ( $('#player').find('button.playing').length > 0 )
		return true;
	
	return false;
}

function l_pause() {
	console.log("Pausing Google Play");
	
	// Get pause button
	var pauseButton = $('#player').find('button.playing')[0];
	$(pauseButton).click();
}