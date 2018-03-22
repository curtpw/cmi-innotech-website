if(document.getElementById('biblio_regions_div')!=undefined){
  google.charts.load('current', {
    'packages':['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyCc3U_YDbluAh_Eja8Zc4e4PX04ndyDXgE'
  });
  google.charts.setOnLoadCallback(getData);
  function getData() {
    $.get("https://raw.githubusercontent.com/ChildMindInstitute/biblio-reader/master/biblio_reader/map/affiliations.csv", function(csvString) {
      var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
      var data = new google.visualization.arrayToDataTable(arrayData);
      $.getJSON("https://raw.githubusercontent.com/ChildMindInstitute/biblio-reader/master/biblio_reader/scale_color_perceptual/hex/plasma.json", function(viridis) {
        var options = {'title':'Affiliations of Papers indexed in PubMed using FCP/INDI Data',
                      colorAxis: {colors: viridis}};
        var chart = new google.visualization.GeoChart(document.getElementById('biblio_regions_div'));
        chart.draw(data, options);
      });
    });
  }
}
if(document.getElementById('biblio_us_states_div')!=undefined){  
  google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyCc3U_YDbluAh_Eja8Zc4e4PX04ndyDXgE'
      });
      google.charts.setOnLoadCallback(getDataUS);

      function getDataUS() {
        $.get("https://raw.githubusercontent.com/ChildMindInstitute/biblio-reader/master/biblio_reader/map/us_affiliations.csv", function(csvString) {
          var arrayDataUS = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});

          var USdata = new google.visualization.arrayToDataTable(arrayDataUS);
          $.getJSON("https://raw.githubusercontent.com/ChildMindInstitute/biblio-reader/master/biblio_reader/scale_color_perceptual/hex/plasma.json", function(viridis) {
            var USoptions = {'title':'Affiliations of Papers indexed in PubMed using FCP/INDI Data',
                           region: "US", resolution: "provinces",
                           colorAxis: {colors: viridis}};

            var USchart = new google.visualization.GeoChart(document.getElementById('biblio_us_states_div'));

            USchart.draw(USdata, USoptions);
          });
        });
      }
}
if(document.getElementById('biblio_regions_minus_us_div')!=undefined){
      google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyCc3U_YDbluAh_Eja8Zc4e4PX04ndyDXgE'
      });
      google.charts.setOnLoadCallback(getnoUSData);
      function getnoUSData() {
        $.get("https://raw.githubusercontent.com/ChildMindInstitute/biblio-reader/master/biblio_reader/map/no_usa.csv", function(csvString) {
          var arrayDatanoUS = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
          var noUSdata = new google.visualization.arrayToDataTable(arrayDatanoUS);
          $.getJSON("https://raw.githubusercontent.com/ChildMindInstitute/biblio-reader/master/biblio_reader/scale_color_perceptual/hex/plasma.json", function(viridis) {
            var noUSoptions = {'title':'Affiliations of Papers indexed in PubMed using FCP/INDI Data',
                          colorAxis: {colors: viridis}};
            var noUSchart = new google.visualization.GeoChart(document.getElementById('biblio_regions_minus_us_div'));
            noUSchart.draw(noUSdata, noUSoptions);
          });
        });
      }
}