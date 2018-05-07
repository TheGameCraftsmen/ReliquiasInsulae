'use strict';
var murmures = murmures || {};
//debugger;

murmures.initGameEngine = function (targetLevel) {
    gameEngine.bodies = murmures.bodies;
    gameEngine.skills = murmures.skills;
    gameEngine.locale = {};
    gameEngine.locale.en = murmures.localeEn;
    gameEngine.locale.fr = murmures.localeFr;

    gameEngine.levels = [];
    gameEngine.levelIds = [];
    gameEngine.activeLevel = 0;
    let loopCounter = 0;
    for (let levelName in murmures.staticLevels) {
        const level1 = new murmures.Level();
        level1.build(murmures.staticLevels[levelName]);
        level1.id = levelName;
        gameEngine.levels.push(level1);
        gameEngine.levelIds.push(levelName);
        if (levelName === targetLevel) {
            gameEngine.activeLevel = loopCounter;
        }
        loopCounter++;
    }
    gameEngine.level = gameEngine.levels[gameEngine.activeLevel];

    gameEngine.heros = [];
    const allHeroesKeys = [];
    Object.keys(gameEngine.bodies).forEach(function (assetId) {
        const ref = gameEngine.bodies[assetId];
        if (murmures.C.LAYERS[ref.layerId][0] === 'Hero') allHeroesKeys.push(assetId);
    });

    const chosenHeroesKeys = [];
    let chosenHero;
    for (loopCounter = 0; loopCounter < 1; loopCounter++) {
        do {
            const rand = Math.floor(Math.random() * allHeroesKeys.length);
            chosenHero = allHeroesKeys[rand];
        } while (chosenHeroesKeys.indexOf(chosenHero) >= 0); // This loop prevents duplicate heroes
        chosenHeroesKeys.push(chosenHero);
        let hero1 = new murmures.Character();
        hero1.build(gameEngine.level.getEntrance(), chosenHero, 2);
        if (loopCounter === 0) {
            hero1.setVision();
        }
        gameEngine.heros.push(hero1);
    }

    gameEngine.state = murmures.C.STATE_ENGINE_INIT;
};