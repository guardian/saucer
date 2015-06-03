(function () {
  'use strict';
  var $tags = $('#tags');
  var $tag = $('#tag');

  function pad(m) {
    if (m < 10) {
      m = '0' + m;
    }
    return m;
  }

  function addTag(tag) {
    var time = window.video.currentTime();
    var mins = Math.floor(time / 60);
    var secs = Math.floor(time % 60);

    var item = [
      '<li>',
        '<time data-time="' + time + '">' + pad(mins) + ':' + pad(secs) + '</time>',
        '<span>' + tag + '</span>',
        '<i class="glyphicon glyphicon-remove"></i>',
      '</li>'].join('');

    $tags.html(item + $tags.html());
  }

  $('#add_tag').submit(function (evt) {
    evt.preventDefault();
    addTag($tag.val());

    $('#custom-tags').append($('<button type="button" class="tag btn btn-primary btn-sm" />').text($tag.val()));
    $tag.val('');
  });

  $('#add_tag').on('click', '.tag', function (evt) {
    addTag(evt.target.textContent);
  });

  $tags.on('click', 'i', function (evt) {
    $(evt.target).parent().remove();
  });

  $tag.on('input', function () {
    window.video.pause();
    $play.toggleClass('is-paused', window.video.paused())
  });

  $('#save').click(function () {
    var data = $tags.children().map(function () {
      var time = this.querySelector('time').getAttribute('data-time');
      var tag = this.querySelector('span').textContent;
      return '{"time": ' + time + ', "tag": "' + tag + '"}';
    }).get().join(',\n');

    $('#saved').text('[' + data  + ']');
  });
})();
