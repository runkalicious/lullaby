/**
 * Lullaby - Rdio connector
 * by Matt Runkle
 *
 * https://github.com/runkalicious/lullaby
 *
 * Use of this source code is governed by the MIT license
 * that can be found in the LICENSE file.
 *
 */

var PAUSE = 'button.play_pause';
var PLAYING = 'playing';

function l_isPlaying() {
	// Rdio adds a class to the play/pause button when playing
	return $(PAUSE).hasClass(PLAYING);
}

function l_pause() {
	console.log("Pausing Rdio");
	
	var pauseButton = $(PAUSE)[0];
	$(pauseButton).click();
}