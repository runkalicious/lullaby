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

function createNotification(title, message) {
	var opt = {
		type: "basic",
		title: title,
		message: message,
		iconUrl: ICON_PATH + "icon38.png"
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
	
	createNotification(NOTIFY_PAUSE_TITLE, NOTIFY_PAUSE_MSG);
}

function setTimer(minutes, tabid) {
	if ((minutes - WARNING_LENGTH) > 0)
		chrome.alarms.create(ALARM_WARNING + "-" + tabid, {delayInMinutes: minutes-WARNING_LENGTH});
	chrome.alarms.create(ALARM_PAUSE + "-" + tabid, {delayInMinutes: minutes});
	
	// Add the manager to watch the tab
	chrome.tabs.sendMessage(tabid, { type: 'ping' }, function (response) {
		// Only inject if they are aren't already in place
		if (!response) {
			chrome.tabs.executeScript(tabid, {file: JQUERY_PATH});
			chrome.tabs.executeScript(tabid, {file: INJECT_PATH + "manager.js"});
		}
	});
	
	createNotification(NOTIFY_SCHED_TITLE, NOTIFY_SCHED_MSG + minutes + " minutes");
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
				sendResponse({result: true});
				break;
				
			case "clear":
				clearTimers(sender.tab ? sender.tab.id : request.tab);
				sendResponse({result: true});
				break;
			
			default:
				console.log("Unknown task", request.task);
		}
	}
);