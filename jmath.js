function jlerp(a, b, pct) {
  return (a + (b - a) * pct);
}

function jclamp(x, min, max) {
  if (x > max) {
    x = max;
  }else if(x < min) {
    x = min;
  }

  return x;
}

function jround(x){
  return Math.round(x * 100)/100;
}