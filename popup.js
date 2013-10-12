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

var form = null;

function submitForm(e) {
	if (e.preventDefault) e.preventDefault();
	
	if (form != null) {
		var length = form.length.options[form.length.selectedIndex].value;
		console.log("Scheduling timer for " + length + " minutes");
		
		chrome.tabs.query({active: true, currentWindow: true}, function(array_of_tabs) {
			var tab = array_of_tabs[0];
			chrome.runtime.sendMessage({task: "setTime", time: parseInt(length), tab: tab.id}, function(response) {
				window.close();
			});
		});
	}
	
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
