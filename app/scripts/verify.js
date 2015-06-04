(function () {
  'use strict';

  var tagTemplate = $('#tag_template').html();

  function pad(m) {
    if (m < 10) m = '0' + m;
    return m;
  }

  load('video-1').then(function(data) {

    /*var data = [{"time": 273.203315, "tag": "Firing into houses"},
      {"time": 208.22751, "tag": "Smoke grenades"},
      {"time": 207.10596, "tag": "Rubber bullets"},
      {"time": 204.095411, "tag": "Firework"},
      {"time": 178.782998, "tag": "Rubber bullets"},
      {"time": 165.901084, "tag": "Firework"},
      {"time": 157.630896, "tag": "Police"},
      {"time": 151.866414, "tag": "Hands up"},
      {"time": 146.255265, "tag": "Stand off"},
      {"time": 65.762938, "tag": "Gas mask"},
      {"time": 57.94692, "tag": "Stand off"},
      {"time": 47.17198, "tag": "Raised arms"},
      {"time": 9.925671, "tag": "Protestors"}]*/

    data.sort(function (a, b) { return a.time - b.time; });

    var ractive = new Ractive({
      'el': '#tags_verify',
      'template': tagTemplate,
      'data': {
        'data': data,
        'videoTime': 0,
        'formattedTime': function (time) {
          var mins = Math.floor(time / 60);
          var secs = Math.floor(time % 60);
          return pad(mins) + ':' + pad(secs);
        },
        'class': function (time, videoTime) {
          var clazz;
          if (time < videoTime - 10) clazz = 'is-done';
          else if (time < videoTime) clazz = 'in-progress';
          return clazz;
        }
      }
    });

    ractive.on('status', function (evt, s) {
      ractive.set(evt.keypath + '.status', s);
    });

    function showTags() {
      ractive.set('videoTime', window.video.currentTime());
    }

    setInterval(showTags, 500);
  });

})();
