/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	let View = function (game, $el){
	  this.game = game;
	  this.grid = $el;

	  this.begin = null;
	  this.finish = null;

	  this.setupTowers();
	  this.clickTower();
	};

	View.prototype.clickTower = function () {
	  const view = this;
	  const game = this.game;

	  $('.tower').on("click", function () {
	    if (view.begin === null) {
	      view.begin = parseInt($(this).attr('data-pos'));
	    } else {
	      view.finish = parseInt($(this).attr('data-pos'));
	    }

	    if (view.finish !== null) {
	      game.move(view.begin, view.finish);

	      let $begin_tower = $('.tower').slice(view.begin,view.begin + 1);
	      let $disc = $begin_tower.find('.disc').slice(0, 1);
	      let $finish_tower = $('.tower').slice(view.finish,view.finish + 1);

	      $begin_tower.find($disc).remove();
	      $finish_tower.append($disc);

	      view.begin = null;
	      view.finish = null;
	    }
	  });
	};

	View.prototype.setupTowers = function () {
	  const $ul = $('<ul></ul>');

	  for (let i = 0; i < 3; i++) {
	    const $li = $('<li></li>');

	    if (i === 0) {
	      for (let j = 0; j < 3; j++) {
	        const $disc = $('<li></li>');
	        $disc.attr('data-size', j).addClass('disc').css('width',(j + 1) * 100);
	        $li.append($disc);
	      }
	    }

	    $li.attr('data-pos',i).addClass('tower');
	    $ul.append($li);
	  }

	  $('.hanoi').append($ul);
	};

	module.exports = View;


/***/ }
/******/ ]);