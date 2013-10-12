// Copyright (c) 2013 Matt Runkle. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var SITES = [
	"play.google.com/music",
	"pandora.com"
];

function checkForSupportedSite(tabId, changeInfo, tab) {
	SITES.forEach(function(element, index, array) {
		if (tab.url.indexOf(element) > -1) {
			chrome.pageAction.show(tabId);
			return false; // break
		}
	});
}

// Listen for any changes to the URL of any tab
chrome.tabs.onUpdated.addListener(checkForSupportedSite);
