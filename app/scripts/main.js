/* jshint devel:true */
var main = (function() {

    function getData(callback) {
        var url = 'http://visuals.guim.co.uk/spreadsheetdata/1-xaQYSi2vCehcIhs_p1bNWLed1PQb3nUSmVkRrOciFw.json';
        $.get(url, function(data) {
            console.log(data);
        });
    }

    function loadTemplates(data) {
      $.get('templates/mission-teaser.mst', function(template) {
        var rendered = Mustache.render(template, data);
        $('#mission-teaser').html(rendered);
      });
    }

  function run() {
    getData(loadTemplates);
  }

  return {
    runApp: run
  }
}());

