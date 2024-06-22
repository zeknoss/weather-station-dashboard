<?php
echo json_decode(file_get_contents('./storage/report.json'));

function RoundIt($ee){
  return round($ee, 2);
}
function toKM( $a) {
  return  RoundIt( floatval($a)*1.60934);
}
function toC( $a) {
  return RoundIt(  (floatval($a)-32) * (5/9) );
}
function toMM( $a) {
    return RoundIt( floatval($a)*25.4);
}
function toHPA( $a) {
  return RoundIt((floatval($a)*33.8639));
}

function wind_cardinal( $degree ) { 
    switch( $degree ) {
        case ( $degree >= 348.75 && $degree <= 360 ):
            $cardinal = "N";
        break;
        case ( $degree >= 0 && $degree <= 11.249 ):
            $cardinal = "N";
        break;
        case ( $degree >= 11.25 && $degree <= 33.749 ):
            $cardinal = "NNE";
        break;
        case ( $degree >= 33.75 && $degree <= 56.249 ):
            $cardinal = "NE";
        break;
        case ( $degree >= 56.25 && $degree <= 78.749 ):
            $cardinal = "ENE";
        break;
        case ( $degree >= 78.75 && $degree <= 101.249 ):
            $cardinal = "E";
        break;
        case ( $degree >= 101.25 && $degree <= 123.749 ):
            $cardinal = "ESE";
        break;
        case ( $degree >= 123.75 && $degree <= 146.249 ):
            $cardinal = "SE";
        break;
        case ( $degree >= 146.25 && $degree <= 168.749 ):
            $cardinal = "SSE";
        break;
        case ( $degree >= 168.75 && $degree <= 191.249 ):
            $cardinal = "S";
        break;
        case ( $degree >= 191.25 && $degree <= 213.749 ):
            $cardinal = "SSW";
        break;
        case ( $degree >= 213.75 && $degree <= 236.249 ):
            $cardinal = "SW";
        break;
        case ( $degree >= 236.25 && $degree <= 258.749 ):
            $cardinal = "WSW";
        break;
        case ( $degree >= 258.75 && $degree <= 281.249 ):
            $cardinal = "W";
        break;
        case ( $degree >= 281.25 && $degree <= 303.749 ):
            $cardinal = "WNW";
        break;
        case ( $degree >= 303.75 && $degree <= 326.249 ):
            $cardinal = "NW";
        break;
        case ( $degree >= 326.25 && $degree <= 348.749 ):
            $cardinal = "NNW";
        break;
        default:
            $cardinal = null;
    }
    return $cardinal;
}
