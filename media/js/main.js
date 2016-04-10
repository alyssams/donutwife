$(function(){
  jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
      '-moz-transform' : 'rotate('+ degrees +'deg)',
      '-ms-transform' : 'rotate('+ degrees +'deg)',
      'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
  };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function Donut(){
    this.$el = $('<div>', {'class': 'donut'});
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function DonutContainer(attributes){
    this.$el = $(attributes.el);
    this.$boundsContainer = $(attributes.bounds_el);
  }

  DonutContainer.prototype = {
    spawnDonut: function(){
      console.log('spawnDonut')
      var donut = new Donut();
      this.$el.append(donut.$el);
      var startingPosition = this.getSpawnPosition(donut);
      donut.$el.css({left: startingPosition.x, top: startingPosition.y});

      this.tweenToFloor(donut);
    },
    getSpawnPosition: function(donut){
      var startingPosition = {
        x: this.$el.width() / 2 - (donut.$el.width() / 2),
        y: this.$el.height() / 2 - (donut.$el.height() / 2)
      };
      return startingPosition;
    },
    tweenToFloor: function (donut){
      var containerPosition = this.$el.position();
      var endPosition = {
        left: containerPosition.left + Math.random() * this.$boundsContainer.width(),
        top: containerPosition.top + (1.5 * this.$boundsContainer.height())
      };

      donut.$el.data('rotation', 0);
      donut.$el.animate(endPosition, { duration: 5000, complete: this.onTweenComplete, progress: this.onTweenProgress});
    },
    onTweenProgress: function(){
      var rotation = $(this).data('rotation');
      $(this).rotate(rotation + 1);
      $(this).data('rotation', rotation + 1);
    },
    onTweenComplete: function(){
      $(this).remove();
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var SPAWN_TIME_RANGE = [200, 1000];
  var donutContainer = new DonutContainer({ el: $('#wifey'), bounds_el: $('body')});
  var spawnTimeoutId = 0;

  spawnHandler();

  function spawnHandler(){
    donutContainer.spawnDonut();

    var spawnTime = SPAWN_TIME_RANGE[0] + (Math.random() * SPAWN_TIME_RANGE[1] - SPAWN_TIME_RANGE[0]);
    spawnTimeoutId = setTimeout(spawnHandler, spawnTime);
  }
});