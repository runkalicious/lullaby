// Copyright (c) 2013 Matt Runkle. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function l_isPlaying() {
	// Google adds the class 'playing' to the play/pause button
	// when the player is active. The class is removed when paused
	// or not active.
	if ( $('#player').find('button.playing') )
		return true;
	
	return false;
}

function l_pause() {
	console.log("Pausing Google Play");
	
	// Get pause button
	var pauseButton = $('#player').find('button.playing')[0];
	$(pauseButton).click();
}