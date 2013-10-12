// Copyright (c) 2013 Matt Runkle. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var form = null;

function setTimer(e) {
	if (e.preventDefault) e.preventDefault();
	
	if (form != null) {
		var length = form.length.options[form.length.selectedIndex].value;
		alert(length);
		// TODO add notification confirming time
	}
	
	// Close the popup
	window.close();
	
	return false;
}

// Register the form listener
document.addEventListener('DOMContentLoaded', function () {
	form = document.getElementById('timer');
	if (form.attachEvent) {
		form.attachEvent("submit", setTimer);
	} else {
		form.addEventListener("submit", setTimer);
	}
});
