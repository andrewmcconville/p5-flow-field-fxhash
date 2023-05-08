class NoiseField {
    constructor(config) {
        this.x = 0;
        this.y = 0;
        this.xStep = config.xStep; //0.002;
        this.yStep = config.yStep; //0.002;
        this.xoff = 0;
        this.yoff = 0;
        this.angle = 0;
        this.noiseDetail = config.noiseDetail; //1;
        this.maxAngle = 0;

        noiseDetail(this.noiseDetail);
    }

    getValue(x, y) {
        this.x = x;
        this.y = y;

        this.xoff = this.xStep * this.x;
        this.yoff = this.yStep * this.y;

        this.angle = noise(this.xoff, this.yoff) * 720;

        // if(this.maxAngle < this.angle) {
        //     this.maxAngle = this.angle;
        //     console.log(`max: ${this.maxAngle}`);
        // }
        
        return map(this.angle, 0, 360, -PI, PI);
    }

    draw() {
        pixelDensity(1);
        loadPixels();

        this.yoff = 0;
        for(let y = 0; y < windowHeight; y++) {
            this.xoff = 0;
            for(let x = 0; x < windowWidth; x++) {
                this.angle = noise(this.xoff, this.yoff) * 720;

                let index = (x + y * windowWidth) * 4;
                pixels[index + 0] = map(this.angle, 0, 360, 0, 255);
                pixels[index + 1] = map(this.angle, 0, 360, 0, 255);
                pixels[index + 2] = map(this.angle, 0, 360, 0, 255);
                pixels[index + 3] = 255;

                this.xoff += this.xStep;
            }
            this.yoff += this.yStep;
        }

        updatePixels();
    }
}