'use strict';
var sprite,
  realtime = new Socket(),
  interval = 0,
  fps = 1,
  $sprite,
  deadTime = (60 * 1000) / 4.0;

realtime.init();

$(realtime).on('new-twitter', function(evt, data) {
  runrun();
});

var runrun = function() {
  $sprite.animate({
    opacity: 1
  }, 500);
  setTimeout(function() {
    $sprite.animate({
      opacity: 0.1
    }, 250);
  }, deadTime / 3.0);
  clearInterval(interval);
  fps++;
  sprite.set('fps', fps);
  sprite.play();
  interval = setInterval(function() {
    if (fps >= 1)
      fps--;
    sprite.set('fps', fps);
  }, deadTime);
}

$(function() {
  $sprite = $('.sprite');
  $sprite.css({
    opacity: 0.1
  });
  sprite = new Motio($sprite[0], {
    fps: fps,
    frames: 16
  });
});