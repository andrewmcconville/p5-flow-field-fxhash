class Path {
  constructor(config) {
    this.segmentCount = config.segmentCount;
    this.startingSegment = config.startingSegment;
    this.magnitude = config.magnitude;
    this.segments = [];
    this.pointDiameter = config.pointDiameter;
    this.curveWeight = config.curveWeight;
    this.curveColor = config.curveColor;
    this.pointColor = config.pointColor;
    this.highlightColor = config.highlightColor;

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
    noFill();
    beginShape();
    this.segments.forEach(segment => {
      curveVertex(segment.start.x, segment.start.y);
    });
    endShape();

    this.segments.forEach((segment, index) => {
      if (index == 0 || index == this.segments.length - 1) {
        //console.log(index)
      }
      else if(index == 2) {
        fill(this.highlightColor);
        segment.pointDiameter = this.pointDiameter * 1.25;
        segment.draw();
      }
      else {
        fill(this.pointColor);
        segment.pointDiameter = lerp(this.pointDiameter, this.curveWeight * 2, (index + 1) / (this.segments.length - 2));
        segment.draw();
      }
    });
  }
}