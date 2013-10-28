/**
 * Lullaby - 8tracks connector
 * by Matt Runkle
 *
 * https://github.com/runkalicious/lullaby
 *
 * Use of this source code is governed by the MIT license
 * that can be found in the LICENSE file.
 *
 */

var PAUSE = '#player_pause_button';
var PLAY = '#player_play_button';

function l_isPlaying() {
	// 8tracks toggles display of play/pause buttons
	return $(PLAY).css('display') == "none";
}

function l_pause() {
	console.log("Pausing 8tracks");
	
	$(PAUSE)[0].click();
}