'use strict';

gameEngine.client = {
    renderer : new murmures.Renderer(),
    eventDispatcher : new murmures.EventDispatcher(),
    uiBuilder : new murmures.UiBuilder(),
    animationScheduler : new murmures.AnimationScheduler(),
    inputHandler : new murmures.InputHandler(),
};