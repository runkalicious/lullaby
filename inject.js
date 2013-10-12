// Copyright (c) 2013 Matt Runkle. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var CONNECTORS = [
	{
		name: "Google Music",
		script: "googlemusic.js",
		site: "play.google.com"
	},
	{
		name: "Pandora",
		script: "pandora.js",
		site: "www.pandora.com"
	}
];

function getHostname(url) {
	// Dirty trick to get hostname of URL without library
	var a = document.createElement('a');
	a.href = url;
	return a.hostname;
}

function checkForSupportedSite(tabId, changeInfo, tab) {
	var hostname = getHostname(tab.url);
	
	var match = !CONNECTORS.every(function(connector) {
		console.log(connector.site);
		if (hostname == connector.site) {
			chrome.pageAction.show(tabId);
			return false; // break
		}
		
		return true;
	});
	
	if (!match)
		chrome.pageAction.hide(tabId);
}

function injectConnector(tabid, callback) {
	chrome.tabs.get(tabid, function(tab) {
		var hostname = getHostname(tab.url);
		
		CONNECTORS.every(function(connector) {
			if (hostname == connector.site) {
				console.log("Injecting " + connector.name + " script");
				chrome.tabs.executeScript(tabid, {file: "connectors/" + connector.script}, callback);
				return false; // break
			}
			
			return true;
		});
	});
}

// Listen for any changes to the URL of any tab
chrome.tabs.onUpdated.addListener(checkForSupportedSite);
