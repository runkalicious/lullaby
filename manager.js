// Copyright (c) 2013 Matt Runkle. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

console.log("I'm the broker!");

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch(request.task) {
			case "pause":
				console.log("I should pause the service on this tab now.");
				if (l_isPlaying()) {
					l_pause();
					sendResponse({result: true});
				} else {
					sendResponse({result: false});
				}
				break;
				
			default:
				console.log("Unknown task: ", request.task);
				sendResponse({result: false});
		}
	});

// TODO listen for page closes
