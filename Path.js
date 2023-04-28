class Path {
  constructor(config) {
    this.segmentCount = config.segmentCount;
    this.startingSegment = config.startingSegment;
    this.magnitude = config.magnitude;
    this.segments = [];
    this.pointWeight = config.pointWeight;
    this.curveWeight = config.curveWeight;
    this.curveColor = config.curveColor;

    this.setup();
  }

  setup() {
    this.segments.push(
      new Segment({
        start: this.startingSegment,
        magnitude: this.magnitude,
      })
    );

    for (let i = 1; i < this.segmentCount; i++) {
      this.segments.push(
        new Segment({
          start: createVector(this.segments[i - 1].end.x, this.segments[i - 1].end.y),
          magnitude: this.magnitude,
        })
      );

      if (
        this.segments[i].end.x < 0 - overScan || this.segments[i].end.x > windowWidth + overScan ||
        this.segments[i].end.y < 0 - overScan || this.segments[i].end.y > windowHeight + overScan
      ) {
        //console.log('segment off canvas');
        this.segmentCount = i + 1;
      }
    }
  }

  draw() {
    strokeWeight(this.curveWeight);
    stroke(this.curveColor);
    beginShape();
    this.segments.forEach(segment => {
      curveVertex(segment.start.x, segment.start.y);
    });
    endShape();

    this.segments.forEach((segment, index) => {
      if (index == 0 || index == this.segments.length - 1) {
        //console.log(index)
      } else {
        stroke(this.curveColor);
        segment.pointWeight = lerp(this.pointWeight, this.curveWeight * 2, (index + 1) / (this.segments.length - 2));
        segment.draw();
      }
    });

    this.drawActiveSegment();
  }

  drawActiveSegment() {
    stroke(100, 0, 0);
    this.segments[2].pointWeight *= 1.5;
    this.segments[2].draw();
  }
}