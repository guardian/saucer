/* jshint devel:true */
var main = (function() {

    function getTeasers(data) {
        var yourMissions = [];
        var recommended = [];

        data.missions.forEach(function (row) {
          if (row['your-missions']) yourMissions.push(row);
          if (row['recommended']) recommended.push(row);
        });

        $.get('templates/item.mst', function (template) {
          $('#your-missions').html(Mustache.render(template, {'cols': 3, 'missions': yourMissions}));
          $('#recommended').html(Mustache.render(template, {'cols': 4, 'missions': recommended}));
        });
    }

    function getData(callback) {
        var url = 'http://visuals.guim.co.uk/spreadsheetdata/1-xaQYSi2vCehcIhs_p1bNWLed1PQb3nUSmVkRrOciFw.json';
        $.get(url, function(data) {
            callback(data.sheets);
        });
    }

    function loadTemplates(data) {

      getTeasers(data);

    }

  function run() {
    getData(loadTemplates);
  }

  return {
    runApp: run
  }
}());

