export function RoundIt($ee){
    return $ee.toFixed(2);
}
export function toKM($a) {
    return RoundIt(parseFloat($a) * 1.60934);
}
export function toKnots ($a) { return RoundIt(parseFloat($a) * 0.539957) }
export function toCelsius($a) {
    return RoundIt((parseFloat($a) - 32) * (5/9));
}
export function toFahrenheit($a) {
    return RoundIt((parseFloat($a) * 9/5 ) + 32);
}
export function toMM($a) {
    return RoundIt(parseFloat($a) * 25.4);
}
export function toHPA($a) {
    return parseFloat($a) * 33.8639;
}