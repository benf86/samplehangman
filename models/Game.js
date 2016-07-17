'use strict';

const _ = require('lodash');
const uuid = require('uuid');
const wordSet = require('../data/static/words');
const BaseModel = require('./BaseModel')();

var Game = function Game () {};

Game.create = function (params) {
    let randomWord = getRandomWord();
    if (!params) {
        params = {
            created_at: Date(),
            modified_at: null,
            uuid: uuid.v4(),
            game_ended: false,
            game_data: {
                word: randomWord,
                _word: new Array(randomWord.length),
                attempts: {},
                misses: 0,
                outcome: null
            }
        };
    }
    return BaseModel.create(Game, params);
};

Game.prototype.update = function (newData) {
    if (!!this.game_ended) return this;
    if (!!~Object.keys(this.game_data.attempts).indexOf(newData.letter)) return this;

    let letterIndex = this.game_data.word.indexOf(newData.letter);

    if (letterIndex > -1) {
        this.game_data.attempts[newData.letter] = true;
        this.game_data.word.split('').forEach((e, i) => {
            if (e === newData.letter) this.game_data._word[i] = e;
        });
    } else {
        this.game_data.misses++;
        this.game_data.attempts[newData.letter] = false;
    }

    this.data.modified_at = Date();

    if (this.game_data.misses >= 5) {
        this.data.game_ended = true;
        this.data.game_data.outcome = 0;
    } else if (this.game_data.word === this.game_data._word.join('')) {
        this.data.game_ended = true;
        this.data.game_data.outcome = 1;
    }

    return this;
};

function getRandomWord () {
    return wordSet[Math.floor(Math.random() * (wordSet.length -1))];
}

module.exports = () => Game;
