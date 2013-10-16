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

var FORM_ID = '#schedule_timer';
var MSG_ID = '#timer_active';
var TIME_ID = '#pause_time';
var CANCEL_ID = '#cancel';

var ERROR_ID = '#message';
var NOTIFY_ID = '#notifcation';

var tabid;

var count;
var counter;

function submitForm(e) {
	if (e.preventDefault) e.preventDefault();
	
	var length = $('#length').val();
	console.log("Scheduling timer for " + length + " minutes");
	
	chrome.runtime.sendMessage({task: "setTime", time: parseInt(length), tab: tabid}, function(response) {
		window.close();
	});
	
	return false;
}

function cancel(e) {
	if (e.preventDefault) e.preventDefault();

	chrome.runtime.sendMessage({task: "clear", tab: tabid}, function(response) {
		if (response.result) {
			clearInterval(counter);
			$(MSG_ID).toggle();
			$(FORM_ID).toggle();
		}
		else {
			showNotification("Error canceling timer!");
		}
	});
}

function showNotification(message) {
	$(ERROR_ID).text(message);
	$(NOTIFY_ID).show();
}

function hideNotification() {
	$(NOTIFY_ID).hide();
}

function updateCountdown() {
	count = count - 1;
	if (count < 0) {
		clearInterval(counter);
		$(MSG_ID).toggle();
		$(FORM_ID).toggle();
		return;
	}
	
	$(TIME_ID).text(getTimestamp());
}

function getTimestamp() {
	var hours = parseInt( count / 3600 ) % 24;
	var minutes = parseInt( count / 60 ) % 60;
	var seconds = count % 60;
	
	return hours 
		+ ":" + (minutes < 10 ? "0" + minutes : minutes) 
		+ ":" + (seconds  < 10 ? "0" + seconds : seconds);
}

// Register the form listener
document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({active: true, currentWindow: true}, function(array_of_tabs) {
		tabid = array_of_tabs[0].id;
		
		chrome.alarms.get(ALARM_PAUSE + "-" + tabid, function(alarm) {
			console.log(alarm);
			if (alarm === undefined) {
				console.log("Show form");
				// No sleep timer set, show form
				$(FORM_ID).show();
				$('#timer').submit(submitForm);
			}
			else {
				console.log("show message");
				// Sleep timer is already set, show information
				count = ((alarm.scheduledTime / 1000) - (new Date().getTime() / 1000)) | 0;
				counter = setInterval(updateCountdown, 1000);
				
				$(TIME_ID).text(getTimestamp());
				$(CANCEL_ID).click(cancel);
				$(MSG_ID).show();
			}
		});
	});
	
	
	
	
});
