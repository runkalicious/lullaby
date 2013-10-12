// Copyright (c) 2013 Matt Runkle. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function createNotification(title, message) {
	var opt = {
		type: "basic",
		title: title,
		message: message,
		iconUrl: "images/icon38.png"
	};
	
	chrome.notifications.create("", opt, function(id) {
		window.setTimeout(function(){
			chrome.notifications.clear(id, function(wasCleared){});
		}, NOTIFY_TIMEOUT*1000);
	});
}

function pausePlayback(tabid) {
	// TODO
	console.log("Pausing playback on tab: " + tabid);
	createNotification(NOTIFY_PAUSE_TITLE, NOTIFY_PAUSE_MSG);
}

function setTimer(minutes, tabid) {
	if ((minutes - WARNING_LENGTH) > 0)
		chrome.alarms.create(ALARM_WARNING + "-" + tabid, {delayInMinutes: minutes-WARNING_LENGTH});
	chrome.alarms.create(ALARM_PAUSE + "-" + tabid, {delayInMinutes: minutes});
}

function onAlarm(alarm) {
	if (alarm && alarm.name.startsWith(ALARM_WARNING))
		createNotification(NOTIFY_WARN_TITLE, NOTIFY_WARN_MSG);
	else if (alarm && alarm.name.startsWith(ALARM_PAUSE))
		pausePlayback(alarm.name.split("-")[1]);
	else
		console.log("Unknown alarm.", alarm);
}

// Register alarm callbacks
chrome.alarms.onAlarm.addListener(onAlarm);

// Setup message passing so popup can send requests
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ?
			"from a content script: " + sender.tab.url :
			"from the extension");
		if (request.task == "setTime") {
			setTimer(request.time, request.tab);
			sendResponse({result: true});
		}
	}
);