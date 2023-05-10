let overScan = 200;
let pathCount = Math.floor(RN(20, 400));
let paths = [];
let segmentCountMin = Math.floor(RN(5, 7));
let segmentCountMax = Math.floor(RN(6, 40));
let magnitudeMin = Math.floor(RN(4, 8));
let magnitudeMax = Math.floor(RN(16, 26));
let pointDiameter = RN(3, 8);
let curveWeight = RN(0, 1.5);
let curveAlpha = RN(0, 80);
let pathMinAlpha = RN(0, 20);
let pathMaxAlpha = RN(40, 100);
let colorHue = Math.floor(RN(0, 360));
let colorSaturation = Math.floor(RN(20, 90));
let colorLightness = Math.floor(RN(30, 50));
let noiseField;
let noiseFieldxStep = RN(0.0002, 0.006);
let noiseFieldyStep = RN(0.0002, 0.006);
let noiseFieldDetail = Math.floor(RN(1, 4));
let isDarkTheme = Math.round(R());
let isContrastColor = Math.round(R());

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
    let colorHueRange = Math.floor(RN(-20, 20));
    let pathAlpha = floor(RN(pathMinAlpha, pathMaxAlpha));

    paths.push(
      new Path({
        startingSegment: createVector(RN(0 - overScan / 2, windowWidth + overScan / 2), RN(0 - overScan / 2, windowHeight + overScan / 2)),
        pointDiameter: pointDiameter,
        curveWeight: curveWeight,
        curveColor: color(colorHue + colorHueRange, colorSaturation, getForegroundLightness(colorLightness), curveAlpha),
        pointColor: color(colorHue + colorHueRange, colorSaturation, getForegroundLightness(colorLightness), pathAlpha),
        highlightColor: color(colorHue + colorHueRange, colorSaturation, getForegroundLightness(colorLightness) + 10, pathAlpha),
        segmentCount: floor(RN(segmentCountMin, segmentCountMax)),
        magnitude: floor(RN(magnitudeMin, magnitudeMax)),
      })
    );
  }

  background(color(getBackgroundHue(colorHue), getBackgroundSaturation(colorSaturation), getBackgroundLightness(colorLightness)));
  //noiseField.draw();

  paths.forEach(path => {
    path.draw();
  });

  //setInterval(refresh, 8000);
}

function draw() {
  noLoop();
}

function getForegroundLightness(_colorLightness) {
  let foregroundLightness = _colorLightness;

  if(isDarkTheme) {
    foregroundLightness += 20;
  }

  return foregroundLightness
}

function getBackgroundHue(_colorHue) {
  let backgroundColor = _colorHue;

  if(isContrastColor) {
    backgroundColor += 180;
  }

  return backgroundColor
}

function getBackgroundSaturation(_colorSaturation) {
  let backgroundSaturation = _colorSaturation;

  if(isDarkTheme) {
    backgroundSaturation = (_colorSaturation - 20) / 3;
  }
  else {
    backgroundSaturation = (_colorSaturation - 20) / 2;
  }

  return backgroundSaturation
}

function getBackgroundLightness(_colorLightness) {
  let backgroundLightness = 100 - (_colorLightness / 10);

  if(isDarkTheme) {
    backgroundLightness -= 76;
  }

  return backgroundLightness
}

function refresh() {
  window.location.reload();
}