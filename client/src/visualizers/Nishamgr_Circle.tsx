// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';
// import { convertToObject } from 'typescript';

// project imports
import { Visualizer } from '../Visualizers';


export const Nishamgr_Circle = new Visualizer(
  'Nishamgr_Circle',
  (p5: P5, analyzer: Tone.Analyser) => {
    const strokeWidth = 2;
    const backgroundColor = p5.color(77, 123, 129);
    // Move around the center of the circle
    const posX = 500;
    const posY = 200;
    const diam = 500;

    // Set the background color
    p5.background(backgroundColor);

    p5.strokeWeight(strokeWidth);
    p5.noFill();

    const values = analyzer.getValue();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i];

      // Diameter is based on the amp
      const d = p5.abs(amplitude as number) * diam;

      // Adjust color range from here
      p5.stroke(Math.floor(d%255), Math.floor(d%155), Math.floor(d%200), Math.floor(d%255));

      // Draw the circle
      p5.circle(posX, posY, d);
    }


  },
);
