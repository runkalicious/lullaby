// Copyright (c) 2013 Matt Runkle. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var form = null;

function submitForm(e) {
	if (e.preventDefault) e.preventDefault();
	
	if (form != null) {
		var length = form.length.options[form.length.selectedIndex].value;
		console.log("Scheduling timer for " + length + " minutes");
		
		chrome.runtime.sendMessage({task: "setTime", time: parseInt(length)}, function(response) {
			console.log("Scheduling was successful: " + response.result);
		});
	}
	
	// Close the popup
	//window.close();
	
	return false;
}

// Register the form listener
document.addEventListener('DOMContentLoaded', function () {
	form = document.getElementById('timer');
	if (form.attachEvent) {
		form.attachEvent("submit", submitForm);
	} else {
		form.addEventListener("submit", submitForm);
	}
});
