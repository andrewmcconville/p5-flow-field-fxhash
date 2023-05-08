class Segment {
  constructor(config) {
    this.start = config.start;
    this.end = createVector(0, 1);
    this.magnitude = config.magnitude;
    this.heading = 0;
    this.pointWeight = config.pointWeight;

    this.setup();
  }

  setup() {
    this.heading = noiseField.getValue(this.start.x, this.start.y);

    this.end.setMag(this.magnitude);
    this.end.setHeading(this.heading);
    this.end.add(this.start);
  }

  draw() {
    //strokeWeight(this.pointWeight);
    //point(this.start.x, this.start.y);
    circle(this.start.x, this.start.y, this.pointWeight);
  }
}