'use strict';

window.onload = function () {
    gameEngine.client.uiBuilder.init();
    gameEngine.client.eventDispatcher.emitEvent('requestDevTools');
    gameEngine.client.eventDispatcher.init();
    gameEngine.client.renderer.init();
    gameEngine.client.animationScheduler.init();
    gameEngine.client.orderHandler.init();
    gameEngine.client.inputHandler.init();

    window.addEventListener('tilesetReady', function (e) {
        gameEngine.client.ws.send(JSON.stringify({ service: 'getLevel' }));
    }, false);
    window.addEventListener('engineReceivedFromServer', function (e) {
        gameEngine.initialize(e.detail);
        gameEngine.client.eventDispatcher.emitEvent('requestCrawlUi');
        gameEngine.client.eventDispatcher.emitEvent('requestTimeline');
    }, false);
    window.addEventListener('orderResponseReceivedFromServer', function (e) {
        if (gameEngine.state === murmures.C.STATE_ENGINE_DEATH) {
            gameEngine.client.uiBuilder.log('YOU DIE !');
        }
    }, false);
    window.addEventListener('mainWindowReady', function (e) {
        gameEngine.client.eventDispatcher.emitEvent('requestRefreshCrawlUi');
        gameEngine.client.eventDispatcher.emitEvent('requestRenderFullEngine');
    }, false);
    gameEngine.client.eventDispatcher.emitEvent('requestTileset');
};