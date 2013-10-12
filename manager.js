/**
 * Lullaby
 * by Matt Runkle
 *
 * https://github.com/runkalicious/lullaby
 *
 * Use of this source code is governed by the MIT license
 * that can be found in the LICENSE file.
 *
 */

console.log("I'm the broker!");

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch(request.task) {
			case "pause":
				// Pause the player
				if (l_isPlaying()) {
					l_pause();
					sendResponse({result: true});
				} else {
					sendResponse({result: false});
				}
				break;
				
			case "ping":
				// Respond still active
				sendResponse({result: true});
				
			default:
				console.log("Unknown task: ", request.task);
				sendResponse({result: false});
		}
	}
);

// If the page is removed, we should cancel our timers
$(window).unload(function() {
	chrome.runtime.sendMessage({task: 'clear'});
	return true;
});