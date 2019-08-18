function getTimestamp() {
  let d = new Date();
  return d.getTime();
}

function randomDivId(x, y) {
  let d = Math.floor(Math.random() * x) + 1;
  let n = Math.floor(Math.random() * y) + 1;
  return `#slot-${d}${n}`;
}
