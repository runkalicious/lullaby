// Copyright (c) 2013 Matt Runkle. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Alarm types
ALARM_WARNING = "5-min-warn";
ALARM_PAUSE = "pause";

WARNING_LENGTH = 5;	// minutes

// Notifications
NOTIFY_TIMEOUT = 10; // seconds

NOTIFY_WARN_TITLE = "Sleep Warning";
NOTIFY_WARN_MSG = "In 5 minutes, Lullaby will pause music playback.";
NOTIFY_PAUSE_TITLE = "Playback Paused";
NOTIFY_PAUSE_MSG = "Lullaby has paused media playback. Sweet dreams.";

// Helper methods
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function(str) {
		return this.slice(0, str.length) == str;
	};
}
