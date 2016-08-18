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
