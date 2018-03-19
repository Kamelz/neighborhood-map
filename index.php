<html>
  <head>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="css/simple-sidebar.css"/>
    <link rel="stylesheet" type="text/css" href="css/style.css"/>
    <title>Neighborhood Map</title>
  </head>
  <body>
    <div id="wrapper" class="toggled">
      <!-- Sidebar -->
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <li>
            <a href = "#"> TODO add filter</a>
          </li>
          <li>
            <a href = "#"> TODO add location</a>
          </li>
        </ul>
      </div>
      <!-- /#sidebar-wrapper -->
      
      <!-- Page Content -->
      <div id="page-content-wrapper" style="padding:0px;">
        <div class="container">
          <div class="row nav-row">
            <nav class="navbar navbar-inverse">
              <div class="container-fluid">
                <div class="navbar-header">
                  <a class="navbar-brand" href="#">Neighborhood Map</a>
                </div>
              </div>
            </nav>
          </div>
          <div class="row">
            <div class="col-xs-12" id="map"></div>
          </div>
          
        </div>
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <script src="js/script.js"></script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAu40_ra6_cEk6HjhIjUSeLzLBJU-rzl_c&callback=initMap">
    </script>
  </body>
</html>