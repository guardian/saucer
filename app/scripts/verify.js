(function () {
  'use strict';

  var tagTemplate = $('#tag_template').html();

  function pad(m) {
    if (m < 10) m = '0' + m;
    return m;
  }

  var data = [{"time": 273.203315, "tag": "Firing into houses"},
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
    {"time": 9.925671, "tag": "Protestors"}]

  function showTags() {
    var time = window.video.currentTime();
    var currentData = data.filter(function (d) { return d.time >= time - 10 && d.time < time; });

    var html = Mustache.render(tagTemplate, {
      'currentData': currentData,
      'formattedTime': function () {
        var mins = Math.floor(this.time / 60);
        var secs = Math.floor(this.time % 60);
        return pad(mins) + ':' + pad(secs);
      }
    });

    $('#tags_verify').html(html);
  }

  setInterval(showTags, 500);

})();
