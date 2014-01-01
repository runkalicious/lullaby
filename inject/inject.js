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

 /**
  * Every connector must define:
  *  `name`: a unique string identifying the connector
  *  `script`: the filename of the script relative to connectors directory
  *  `site`: the base hostname of the website where the connector is used
  * Optionally, one may define:
  *  `path`: a URL path on the site to limit the injection point
  *  `protocol`: a web protocol to limit the injection point (default: any)
  */
var CONNECTORS = [
	{
		name: "8tracks",
		script: "8tracks.js",
		site: "8tracks.com"
	},
	{
		name: "Google Music",
		script: "googlemusic.js",
		site: "play.google.com",
      path: "/music/listen"
	},
	{
		name: "Grooveshark",
		script: "grooveshark.js",
		site: "grooveshark.com"
	},
	{
		name: "Pandora",
		script: "pandora.js",
		site: "www.pandora.com"
	},
	{
		name: "Rdio",
		script: "rdio.js",
		site: "www.rdio.com"
	},
	{
		name: "Songza",
		script: "songza.js",
		site: "songza.com"
	}
];

function parseURL(url) {
   // Get Location object through anchor tag
	var a = document.createElement('a');
	a.href = url;
   
   console.log("Location: proto=" + a.protocol + ", site=" + a.hostname + ", path=" + a.pathname)
   
   return a;
}

function isConnectorAllowed(connector, url) {
   if (!isConnectorEnabled(connector.name))
      return false;
   
   var uri = parseURL(url);
   
   if (connector.hasOwnProperty('protocol') && uri.protocol != connector.protocol)
      return false;
   
   if (uri.hostname != connector.site)
      return false;
   
   if (connector.hasOwnProperty('path') && !uri.pathname.startsWith(connector.path))
      return false;
      
   return true;
}

function checkForSupportedSite(tabId, changeInfo, tab) {
	var match = !CONNECTORS.every(function(connector) {
		if (isConnectorAllowed(connector, tab.url)) {
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
		CONNECTORS.every(function(connector) {
			if (isConnectorAllowed(connector, tab.url)) {
            console.log("Injecting " + connector.name + " script");
            chrome.tabs.executeScript(tabid, {file: CONNECTOR_PATH + connector.script}, callback);
				return false; // break
			}
			
			return true;
		});
	});
}

function isConnectorEnabled(name) {
   var enabled = localStorage["store.settings."+name.replace(" ","").toLowerCase()];
   if (enabled === undefined)
      enabled = "true";
   
   return (enabled === "true") ? true : false;
}

// Listen for any changes to the URL of any tab
chrome.tabs.onUpdated.addListener(checkForSupportedSite);
