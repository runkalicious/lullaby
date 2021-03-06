this.manifest = {
    "name": "Lullaby",
    "icon": "/icons/icon128.png",
    "settings": [
		    {
            "tab": i18n.get("news"),
            "group": "v0.9.6",
            "type": "description",
            "text": i18n.get("v0.9.6-description")
        },
        {
            "tab": i18n.get("news"),
            "group": "v0.9.5",
            "type": "description",
            "text": i18n.get("v0.9.5-description")
        },
        {
            "tab": i18n.get("news"),
            "group": "v0.9.4",
            "type": "description",
            "text": i18n.get("v0.9.4-description")
        },
        {
            "tab": i18n.get("news"),
            "group": "v0.9.3",
            "type": "description",
            "text": i18n.get("v0.9.3-description")
        },
        {
            "tab": i18n.get("news"),
            "group": "v0.9.2",
            "type": "description",
            "text": i18n.get("v0.9.2-description")
        },
        {
            "tab": i18n.get("news"),
            "group": "v0.9.1",
            "type": "description",
            "text": i18n.get("v0.9.1-description")
        },
        
        
        {
            "tab": i18n.get("options"),
            "group": i18n.get("notifications"),
            "name": "warning",
            "type": "checkbox",
            "label": i18n.get("warning"),
            "default": true
        },
        {
            "tab": i18n.get("options"),
            "group": i18n.get("notifications"),
            "name": "paused",
            "type": "checkbox",
            "label": i18n.get("paused"),
            "default": true
        },
        
        // Site connectors auto-populated
        
        
        {
            "tab": i18n.get("about"),
            "group": i18n.get("lullaby"),
            "name": "app-description",
            "type": "description",
            "label": "Description",
            "text": i18n.get("lullaby-description")
        },
        {
            "tab": i18n.get("about"),
            "group": i18n.get("author"),
            "name": "author",
            "type": "description",
            "label": "Author",
            "text": i18n.get("author-description")
        }
    ],
    
    "base_site": {
      "tab": i18n.get("options"),
      "group": i18n.get("sites"),
      "type": "checkbox",
      "default": true
    },
    
    "alignment": [ ]
};
