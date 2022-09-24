<?php

$transpop = 5;
$transcap = 16;
$poptroop = 0;
$transtpop = 0;
$transports = 0;
$troopcapacity = 0;
$fpop = $_GET['fpop'];
//$fpop = 2030;

function calculate($fpop,$transpop,$transcap,$transtpop,$transports,$troopcapacity) {
  if(($fpop > 0) AND ($fpop < 9999)) {
    $troopcapacity = $transports * $transcap;
    while($troopcapacity < $fpop-$transtpop) {
      $transports+=1;
      $troopcapacity = $transports * $transcap;
      $transtpop = $transports * $transpop;
    }
    if(($troopcapacity + $transtpop) > $fpop){
      $transports = $transports - 1;
      $troopcapacity = $transports * $transcap;
      $transtpop = $transports * $transpop;
    }
    echo "<div class='results'>";
    echo "<p id='troopcapacity'> Troop capacity: " . $troopcapacity;
    echo "<br>";
    //echo "<p id='transtpop'> Transport pop: " . $transtpop;
    //echo "<br>";
    echo "<p id='totalpop'> Total pop used: " . $troopcapacity + $transtpop;;
    echo "<br>";
    echo "<p id='leftpop'> Left over pop: " . $fpop - ($troopcapacity + $transtpop);
    echo "<p id='transports'> Transports to build: " . $transports;
    echo "<br>";
    echo "<a href='index.php'> GO BACK </a>";
    echo "</div>";
  }else {
      echo "<a href='index.php'> GO BACK IDIOT</a>";
    }
} 

calculate($fpop,$transpop,$transcap,$transtpop,$transports,$troopcapacity);

?>


<!DOCTYPE html>
<html>
  <head>
    <style>
      .results {
        margin: auto;
        width: 20%;
      }
      #troopcapacity {
        text-align: center;
        background-color: yellow;
        border: 1px solid;
      }
      #transtpop {
        text-align: center;
        background-color: yellow;
        border: 1px solid;
      }
      #totalpop{
        text-align: center;
        background-color: yellow;
        border: 1px solid;
      }
      #leftpop{
        text-align: center;
        background-color: yellow;
        border: 1px solid;
      }
      #transports{
        text-align: center;
        background-color: yellow;
        border: 1px solid;
      }
    </style>
  </head>
  <body>
  </body>
</html>
