// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';
import { FFT } from 'tone';
import { Visualizer } from '../Visualizers';

//project imports
export const jaq19_visual = new Visualizer(
  'Wavy_Lines',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight;//const height = window.innerHeight / 2;
    //const dim = Math.min(width, height);

    p5.background(0, 0, 138, 255); // p5.background(0, 0, 0, 255);
    p5.stroke(255); // p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();

    p5.beginShape();

    for (let i = 0; i < 360; i++) {
      //p5.stroke(255);
      const amplitude = values[i] as number;
      var r = p5.map(amplitude,(values.length)*(.55), values.length, 0, 1500);//var r = p5.map(amplitude,(values.length - 1)*(.75), values.length - 1, 0, 20);
      var x = p5.map(i, 360, values.length, 0, width);
      var y = height + amplitude * height;
       x = r * Math.cos(y);
       y = r * Math.sin(x);
      p5.curveVertex(x, y);
    }

    p5.endShape();

  },
);



 /*  working code
      for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      //const x = p5.map(i, 0, values.length - 1, 0, width);
      //const y = height / 2 + amplitude * height;
      // Place vertex
      var r = p5.map(amplitude,(values.length)*(.5), values.length, 5, 1500);//var r = p5.map(amplitude,(values.length - 1)*(.75), values.length - 1, 0, 20);
      var x = p5.map(i, 610, values.length, 0, width);// var x = p5.map(i, 2040, values.length - 1, 0, width/2);
      var y = height + amplitude * height;//var y = height / 2 + amplitude * height;
        x = r * Math.cos(x)
        y = r * Math.sin(y)
      p5.curveVertex(x, y);

      // console.log(`Amplitude: ${amplitude}, x:${x}, y:${y}`);
    } */



/* working code
// project imports
import { Visualizer } from '../Visualizers';

export const jaq19_visual = new Visualizer(
  'jaq19',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 138, 255); // p5.background(0, 0, 0, 255);
    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 138, 255); // p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();

    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height + 2*amplitude * height; //const y = height / 2 + amplitude * height;
      // Place vertex
      p5.vertex(x, y);

      // console.log(`Amplitude: ${amplitude}, x:${x}, y:${y}`);

    }

    p5.endShape();
  },
);
*/

/**\

    //start of new code here
    const fft = new Tone.FFT();
     // default mode is radians
    p5.angleMode("radians");
    p5.translate(width/2, height/2);
    p5.background(255, 255, 255, 100);
    p5.stroke(237, 34, 93, 120);
      // min radius of ellipse
    let minRad = 2;

    // max radius of ellipse
    let maxRad = height;
    // array of values from -1 to 1
    let timeDomain = new Tone.Waveform(1024);
    let corrBuff = autoCorrelate(timeDomain);


    function autoCorrelate(buffer: number): [] {
      var newBuffer = [];
      var len = corrBuff.length;
      var nSamples = buffer.length;
      const centerClip = 0;
      const bNormalize = true;
      var autocorrelation = [];

      // center clip removes any samples under 0.1
      if (centerClip) {
        var cutoff = centerClip;
        for (var i = 0; i < buffer.length; i++) {
          var val = buffer[i];
          buffer[i] = Math.abs(val) > cutoff ? val : 0;
        }
      }

      for (var lag = 0; lag < nSamples; lag++){
        var sum = 0;
        for (var index = 0; index < nSamples; index++){
          var indexLagged = index+lag;
          var sound1 = buffer[index];
          var sound2 = buffer[indexLagged % nSamples];
          var product = sound1 * sound2;
          sum += product;
        }

        // average to a value between -1 and 1
        newBuffer[lag] = sum/nSamples;
      }

      if (bNormalize){
        var biggestVal = 0;
        for (var index = 0; index < nSamples; index++){
          if (abs(newBuffer[index]) > biggestVal){
            biggestVal = abs(newBuffer[index]);
          }
        }
        // dont divide by zero
        if (biggestVal !== 0) {
          for (var index = 0; index < nSamples; index++){
            newBuffer[index] /= biggestVal;
          }
        }
      }

      return newBuffer;
    };
*/



/*

project imports
import { Visualizer } from '../Visualizers';

export const jaq19_visual = new Visualizer(
  'jaq19',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 138, 255); // p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    //p5.stroke(255, 255, 138, 255); // p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();

    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height + 2*amplitude * height; //const y = height / 2 + amplitude * height;
      // Place vertex
      p5.vertex(x, y);

      // console.log(`Amplitude: ${amplitude}, x:${x}, y:${y}`);

    }

    p5.endShape();
  },
);
 */




/*
  export const jaq19_Visual = new Visualizer(
  'jaq19_Visual',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight/2;//const height = window.innerHeight / 2;
    //const dim = Math.min(width, height);

    //const fft = analyzer.set({type:'fft', size:128}); // NEED TO FIX, DOES NOT WORK!!!

    p5.background(0); // p5.background(0, 0, 0, 255);
    p5.stroke(255); // p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();

    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      //const x = p5.map(i, 0, values.length - 1, 0, width);
      //const y = height / 2 + amplitude * height;
      // Place vertex
      var r = p5.map(amplitude,(values.length - 1)*(.75), values.length - 1, 0, 20);
      var x = p5.map(i, 4080, values.length - 1, 0, width/2);// var x = p5.map(i, 2040, values.length - 1, 0, width/2);
      var y = height + amplitude * height/2;//var y = height / 2 + amplitude * height;
        x = r * Math.cos(x+20)
        y = r * Math.sin(y+20)
      p5.vertex(x+200, y+200);

      // console.log(`Amplitude: ${amplitude}, x:${x}, y:${y}`);

    }

    p5.endShape();
  },
);
*/


/**
 *
 * // project imports
import { Visualizer } from '../Visualizers';

export const jaq19_visual = new Visualizer(
  'jaq19',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0);
    p5.noFill();
    p5.translate(width/2, height/2);
    const values = analyzer.getValue();
    let fft:any;
    var spectrum = fft.analyze();

    p5.beginShape();

    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const vol = amplitude.getLevel();
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height + 2*amplitude * height; //const y = height / 2 + amplitude * height;
      // Place vertex
      p5.vertex(x, y);

      // console.log(`Amplitude: ${amplitude}, x:${x}, y:${y}`);

    }

    p5.endShape();
  },
);
 */
