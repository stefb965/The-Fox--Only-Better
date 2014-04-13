moduleAid.VERSION = '1.0.0';

// this module catches the popup event and tells which nodes (triggers) the lessChrome script should check for

this.holdPanelUI = function(e) {
	e.detail = 'PanelUI-button';
	e.stopPropagation();
};

this.holdPopupAutoComplete = function(e) {
	e.detail = 'searchbar';
	e.stopPropagation();
};

this.holdPopupAutoCompleteRichResult = function(e) {
	e.detail = 'urlbar';
	e.stopPropagation();
};

this.setupHoldDownloadsPanel = function(e) {
	if(e.target.id == 'downloadsPanel') {
		listenerAid.remove(window, 'popupshowing', setupHoldDownloadsPanel);
		listenerAid.add($('downloadsPanel'), 'AskingForNodeOwner', holdDownloadsPanel);
	}
};

this.holdDownloadsPanel = function(e) {
	e.detail = 'downloads-button';
	e.stopPropagation();
};

moduleAid.LOADMODULE = function() {
	listenerAid.add($('PanelUI-popup'), 'AskingForNodeOwner', holdPanelUI);
	listenerAid.add($('PopupAutoComplete'), 'AskingForNodeOwner', holdPopupAutoComplete);
	listenerAid.add($('PopupAutoCompleteRichResult'), 'AskingForNodeOwner', holdPopupAutoCompleteRichResult);
	
	// the downloadsPanel is only created when first called
	if($('downloadsPanel')) {
		listenerAid.add($('downloadsPanel'), 'AskingForNodeOwner', holdDownloadsPanel);
	} else {
		listenerAid.add(window, 'popupshowing', setupHoldDownloadsPanel);
	}
};

moduleAid.UNLOADMODULE = function() {
	listenerAid.remove($('PanelUI-popup'), 'AskingForNodeOwner', holdPanelUI);
	listenerAid.remove($('PopupAutoComplete'), 'AskingForNodeOwner', holdPopupAutoComplete);
	listenerAid.remove($('PopupAutoCompleteRichResult'), 'AskingForNodeOwner', holdPopupAutoCompleteRichResult);
	listenerAid.remove($('downloadsPanel'), 'AskingForNodeOwner', holdDownloadsPanel);
	listenerAid.remove(window, 'popupshowing', setupHoldDownloadsPanel);
};
