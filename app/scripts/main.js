/* jshint devel:true */
var main = (function() {

    function getTeasers(data) {
        $.get('templates/your-mission.mst', function(template) {
            var rendered = Mustache.render(template, data);
            $('#your-missions').html(rendered);
        });
        $.get('templates/recommended.mst', function(template) {
            var rendered = Mustache.render(template, data);
            $('#recommended').html(rendered);
        });
        $.get('templates/close.mst', function(template) {
            var rendered = Mustache.render(template, data);
            $('#close').html(rendered);
        });
        $.get('templates/recent.mst', function(template) {
            var rendered = Mustache.render(template, data);
            $('#recent').html(rendered);
        });
        $.get('templates/featured.mst', function(template) {
            var rendered = Mustache.render(template, data);
            $('#featured').html(rendered);
        });
        $.get('templates/all.mst', function(template) {
            var rendered = Mustache.render(template, data);
            $('#all').html(rendered);
        });

    }

    function getData(callback) {
        var url = 'http://visuals.guim.co.uk/spreadsheetdata/1-xaQYSi2vCehcIhs_p1bNWLed1PQb3nUSmVkRrOciFw.json';
        $.get(url, function(data) {
            callback(data.sheets);
        });
    }

    function loadTemplates(data) {
      console.log(data)

      getTeasers(data);

    }

  function run() {
    getData(loadTemplates);
  }

  return {
    runApp: run
  }
}());

