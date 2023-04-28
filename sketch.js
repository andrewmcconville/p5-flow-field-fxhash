let overScan;
let pathCount;
let paths;
let sampleImage;
let sampleImageCanvas;

function preload() {
  sampleImage = loadImage('sampleImage.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noFill();

  overScan = 200;
  pathCount = 200;
  paths = [];

  sampleImageCanvas = createGraphics(windowWidth + overScan * 2, windowHeight + overScan * 2);
  sampleImageCanvas.image(sampleImage, 0, 0, windowWidth + overScan * 2, windowHeight + overScan * 2);

  for(let i = 0; i < pathCount; i++) {
    paths.push(
      new Path({
        startingSegment: createVector(random(0 - overScan / 2, windowWidth + overScan / 2), random(0 - overScan / 2, windowHeight + overScan / 2)),
        pointWeight: 6,
        curveWeight: 0.5,
        curveColor: color(200, 0, 0),
        segmentCount: floor(random(5, 24)),
        magnitude: floor(random(8, 24)),
      })
    );
  }

  // let total = 0;
  // paths.forEach(path => {
  //   path.segments.forEach(segment => {
  //     total++;
  //   });
  // });
  // console.log(total);
}

function draw() {
  background(255, 245, 247);
  //image(sampleImage, 0, 0, windowWidth, windowHeight);
  //drawGridHeadings();

  paths.forEach(path => {
    path.draw();
  });

  noLoop();
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