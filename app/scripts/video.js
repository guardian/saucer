(function () {
  'use strict';
  var $play = $('#play');

  function pad(m) {
    if (m < 10) {
      m = '0' + m;
    }
    return m;
  }

  var video = Popcorn.youtube('#video', 'https://www.youtube.com/watch?v=GO1SKC6dK7o');

  $play.click(function () {
    if (video.paused()) {
      video.play();
      $play.removeClass('is-paused');
    } else {
      video.pause();
      $play.addClass('is-paused');
    }
  });

  $('#add_tag').submit(function (evt) {
    evt.preventDefault();

    var tag = $('#tag').val();
    var time = video.currentTime();
    var mins = Math.floor(time / 60);
    var secs = Math.floor(time % 60);

    $('#tags').get(0).textContent += pad(mins) + ':' + pad(secs) + ' - ' + tag + '\n';
  });
})();
