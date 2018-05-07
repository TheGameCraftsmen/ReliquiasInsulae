'use strict';

window.onload = function () {
    gameEngine.client.uiBuilder.init();
    gameEngine.client.eventDispatcher.emitEvent('requestDevTools');
    gameEngine.client.eventDispatcher.init();
    gameEngine.client.renderer.init();
    gameEngine.client.animationScheduler.init();
    gameEngine.client.inputHandler.init();

    window.addEventListener('tilesetReady', function (e) {
        murmures.initGameEngine("");
        gameEngine.client.uiBuilder.loadDevTools(gameEngine);
        gameEngine.client.eventDispatcher.emitEvent('requestCrawlUi');
    }, false);
    window.addEventListener('mainWindowReady', function (e) {
        gameEngine.client.eventDispatcher.emitEvent('requestRefreshCrawlUi');
        gameEngine.client.eventDispatcher.emitEvent('requestRenderFullEngine');
        gameEngine.client.uiBuilder.centerCrawlPanel();
    }, false);

    gameEngine.client.eventDispatcher.emitEvent('requestTileset');
};