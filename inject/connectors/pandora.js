/**
 * Lullaby - Pandora connector
 * by Matt Runkle
 *
 * https://github.com/runkalicious/lullaby
 *
 * Use of this source code is governed by the MIT license
 * that can be found in the LICENSE file.
 *
 */

var PLAYER = '#playbackControl';
var PAUSE = 'div.pauseButton';
var PLAY = 'div.playButton';

function l_isPlaying() {
	// Pandora toggles display of play/pause buttons
	return $(PLAYER).find(PLAY).css('display') == "none";
}

function l_pause() {
	console.log("Pausing Pandora");
	
	var pauseButton = $(PLAYER).find(PAUSE)[0];
	$(pauseButton).click();
}