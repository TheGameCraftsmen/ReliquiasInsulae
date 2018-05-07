'use strict';

murmures.EventDispatcher = function () {    
    this.eventsRegistered = false;
}

murmures.EventDispatcher.prototype = {
    emitEvent : function (type, payload) {
        let event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, false, false, payload);
        window.dispatchEvent(event);
    },
    
    init : function () {
        if (this.eventsRegistered) return; // We want to resister events only once
                
        // TODO : move this function to dispatcher prototype ?
        this.onXhrError = function (e) {
            gameEngine.client.uiBuilder.log('<span style="color:#f66">' + 'ERROR - Vous avez été déconnecté du serveur</span>', 'general');
        }
        
        this.eventsRegistered = true;
    },
};
