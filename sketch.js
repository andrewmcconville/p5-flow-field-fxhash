let overScan = 200;
let pathCount = Math.floor(RN(20, 400));
let paths = [];
let segmentCountMin = Math.floor(RN(5, 7));
let segmentCountMax = Math.floor(RN(5, 30));
let magnitudeMin = Math.floor(RN(6, 8));
let magnitudeMax = Math.floor(RN(20, 30));
let pointWeight = RN(3, 8);
let curveWeight = RN(0.125, 1.25);
let colorHue = Math.floor(RN(0, 360));
let colorSaturation = Math.floor(RN(10, 80));
let sampleImage;
let sampleImageCanvas;

$fx.features({
  "A random feature": 5,
  "A random boolean": $fx.rand() > 0.5,
  "A random string": ["A", "B", "C", "D"].at(Math.floor($fx.rand()*4)),
  "Path Count": pathCount,
});

function preload() {
  sampleImage = loadImage('sampleImage.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 360, 100, 100, 1);
  noStroke();
  noFill();

  sampleImageCanvas = createGraphics(windowWidth + overScan * 2, windowHeight + overScan * 2);
  sampleImageCanvas.image(sampleImage, 0, 0, windowWidth + overScan * 2, windowHeight + overScan * 2);

  for(let i = 0; i < pathCount; i++) {
    let colorHueRange = Math.floor(RN(0, 100));

    paths.push(
      new Path({
        startingSegment: createVector(RN(0 - overScan / 2, windowWidth + overScan / 2), RN(0 - overScan / 2, windowHeight + overScan / 2)),
        pointWeight: pointWeight,
        curveWeight: curveWeight,
        curveColor: color(colorHue + colorHueRange, colorSaturation, 50),
        activeColor: color(colorHue + colorHueRange, colorSaturation, 20),
        segmentCount: floor(RN(segmentCountMin, segmentCountMax)),
        magnitude: floor(RN(magnitudeMin, magnitudeMax)),
      })
    );
  }

  setInterval(refresh, 5000);

  // let total = 0;
  // paths.forEach(path => {
  //   path.segments.forEach(segment => {
  //     total++;
  //   });
  // });
  // console.log(total);
}

function draw() {
  background(color(colorHue, colorSaturation, 98));
  //image(sampleImage, 0, 0, windowWidth, windowHeight);
  //drawGridHeadings();

  paths.forEach(path => {
    path.draw();
  });

  noLoop();
}

function refresh() {
  window.location.reload();
}

function drawGridHeadings() {
  let cols = 32;
  let rows = 32;
  let colScale = windowWidth / cols;
  let rowScale = windowHeight / rows;
  let heading;
  let startPoint;
  let endPoint;
  let magnitude = 8;

  for(let row = 0; row < rows; row++ ) {
    for(let col = 0; col < cols; col++) {
      push();
      fill(0 + row * (rowScale / (windowHeight / 256)));
      rect(col * colScale, row * rowScale, colScale + 1, rowScale + 1);
      pop();
    }
  }

  for(let row = 0; row < rows; row++ ) {
    for(let col = 0; col < cols; col++) {
      startPoint = createVector(col * colScale, row * rowScale);
      startPoint.add(colScale / 2, rowScale / 2);

      heading = get(col * colScale, row * rowScale);
      heading = map(heading[0], 0, 255, -PI, PI);

      endPoint = createVector(0, 1);
      endPoint.setMag(magnitude);
      endPoint.setHeading(heading);
      endPoint.add(startPoint);

      push();
      stroke(0);
      strokeWeight(4);
      point(startPoint.x, startPoint.y);
      strokeWeight(2);
      point(endPoint.x, endPoint.y);
      strokeWeight(1);
      line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
      pop();
    }
  }
}