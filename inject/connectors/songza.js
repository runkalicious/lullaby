/**
 * Lullaby - Songza connector
 * by Matt Runkle
 *
 * https://github.com/runkalicious/lullaby
 *
 * Use of this source code is governed by the MIT license
 * that can be found in the LICENSE file.
 *
 */

var PLAYER = 'div.player-wrapper';
var PAUSE = 'div.miniplayer-control-play-pause';
var PLAYING = 'player-state-play'

function l_isPlaying() {
	// Songza toggles a class tag on the player div
	return $(PLAYER).hasClass(PLAYING);
}

function l_pause() {
	console.log("Pausing Songza");
	
	var pauseButton = $(PAUSE)[0];
	$(pauseButton).click();
}