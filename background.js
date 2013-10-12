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
	// Time to add the service-specific script
	injectConnector(tabid, function() {
		// Once the script is added, execute pause command
		chrome.tabs.sendMessage(tabid, {task: "pause"}, function(response) {
			console.log(response);
		});
	});
	
	console.log("Pausing playback on tab: " + tabid);
	createNotification(NOTIFY_PAUSE_TITLE, NOTIFY_PAUSE_MSG);
}

function setTimer(minutes, tabid) {
	if ((minutes - WARNING_LENGTH) > 0)
		chrome.alarms.create(ALARM_WARNING + "-" + tabid, {delayInMinutes: minutes-WARNING_LENGTH});
	chrome.alarms.create(ALARM_PAUSE + "-" + tabid, {delayInMinutes: minutes});
	
	// Add the manager to watch the tab
	chrome.tabs.executeScript(tabid, {file: "libs/jquery-2.0.3.min.js"});
	chrome.tabs.executeScript(tabid, {file: "manager.js"});
}

function onAlarm(alarm) {
	if (alarm && alarm.name.startsWith(ALARM_WARNING))
		createNotification(NOTIFY_WARN_TITLE, NOTIFY_WARN_MSG);
	else if (alarm && alarm.name.startsWith(ALARM_PAUSE))
		pausePlayback(parseInt(alarm.name.split("-")[1]));
	else
		console.log("Unknown alarm.", alarm);
}

function clearTimers(tabid) {
	console.log("Clearing timers for tab " + tabid);
	chrome.alarms.clear(ALARM_WARNING + "-" + tabid);
	chrome.alarms.clear(ALARM_PAUSE + "-" + tabid);
}

// Register alarm callbacks
chrome.alarms.onAlarm.addListener(onAlarm);

// Setup message passing so popup can send requests
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch(request.task) {
			case "setTime":
				setTimer(request.time, request.tab);
				break;
				
			case "clear":
				clearTimers(sender.tab ? sender.tab.id : request.tab);
				break;
			
			default:
				console.log("Unknown task", request.task);
		}
	}
);