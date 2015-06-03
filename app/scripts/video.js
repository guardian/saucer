(function () {
  'use strict';
  var $play = $('#play');
  var video = Popcorn.smart('#video', 'https://www.youtube.com/watch?v=GO1SKC6dK7o');

  $('#video').on('play pause', function () { $play.toggleClass('is-paused', video.paused()) });

  $play.click(function () {
    if (video.paused()) {
      video.play();
    } else {
      video.pause();
    }
    $play.toggleClass('is-paused', video.paused())
  });

  window.video = video;
})();
