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

// Alarm types
ALARM_WARNING = "5-min-warn";
ALARM_PAUSE = "pause";

WARNING_LENGTH = 5;	// minutes

// Notifications
NOTIFY_TIMEOUT = 10; // seconds

NOTIFY_SCHED_TITLE = "Sleep Timer Scheduled";
NOTIFY_SCHED_MSG = "Lullaby will stop playback in ";
NOTIFY_WARN_TITLE = "Sleep Warning";
NOTIFY_WARN_MSG = "In 5 minutes, Lullaby will pause music playback.";
NOTIFY_PAUSE_TITLE = "Playback Paused";
NOTIFY_PAUSE_MSG = "Lullaby has paused media playback. Sweet dreams.";

// File Paths
CONNECTOR_PATH = "/inject/connectors/";
ICON_PATH = "/icons/";
JQUERY_PATH = "/js/jquery-2.0.3.min.js";
INJECT_PATH = "/inject/";

// Helper methods
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function(str) {
		return this.slice(0, str.length) == str;
	};
}
