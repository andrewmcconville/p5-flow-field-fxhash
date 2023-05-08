let overScan = 200;
let pathCount = Math.floor(RN(20, 400));
let paths = [];
let segmentCountMin = Math.floor(RN(5, 7));
let segmentCountMax = Math.floor(RN(5, 30));
let magnitudeMin = Math.floor(RN(4, 8));
let magnitudeMax = Math.floor(RN(16, 26));
let pointWeight = RN(3, 8);
let curveWeight = RN(0, 1.25);
let curveAlpha = RN(10, 80);
let colorHue = Math.floor(RN(0, 360));
let colorSaturation = Math.floor(RN(10, 80));
let colorLightness = Math.floor(RN(60, 80));
let noiseField;
let noiseFieldxStep = RN(0.0008, 0.008);
let noiseFieldyStep = RN(0.0008, 0.008);
let noiseFieldDetail = Math.floor(RN(1, 6));

$fx.features({
  "A random feature": 5,
  "A random boolean": $fx.rand() > 0.5,
  "A random string": ["A", "B", "C", "D"].at(Math.floor($fx.rand()*4)),
  "Path Count": pathCount,
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 360, 100, 100, 100);
  noStroke();
  noFill();
  noiseSeed($fx.rand() * 1000);

  noiseField = new NoiseField({
    xStep: noiseFieldxStep,
    yStep: noiseFieldyStep,
    noiseDetail: noiseFieldDetail,
  });

  for(let i = 0; i < pathCount; i++) {
    let colorHueRange = Math.floor(RN(-60, 60));

    paths.push(
      new Path({
        startingSegment: createVector(RN(0 - overScan / 2, windowWidth + overScan / 2), RN(0 - overScan / 2, windowHeight + overScan / 2)),
        pointWeight: pointWeight,
        curveWeight: curveWeight,
        curveColor: color(colorHue + colorHueRange, colorSaturation, colorLightness, curveAlpha),
        pointColor: color(colorHue + colorHueRange, colorSaturation, colorLightness),
        highlightColor: color(colorHue + colorHueRange, colorSaturation, 80),
        segmentCount: floor(RN(segmentCountMin, segmentCountMax)),
        magnitude: floor(RN(magnitudeMin, magnitudeMax)),
      })
    );
  }

  background(color(colorHue, colorSaturation, 18));
  //noiseField.draw();

  paths.forEach(path => {
    path.draw();
  });

  //setInterval(refresh, 5000);
}

function draw() {
  noLoop();
}

function refresh() {
  window.location.reload();
}