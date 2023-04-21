// 3rd party library imports
//import { Translate32 } from '@carbon/icons-react';
import P5 from 'p5';
import * as Tone from 'tone';
//import { SideNav } from '../SideNav';
// project imports
import { Visualizer } from '../Visualizers';

export const matthewMadore_Visual = new Visualizer(
  'The_Sound_Swirl',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    p5.background(0, 0, 0, 255);
    // p5.stroke(255, 255, 255, 255);

    p5.angleMode('degrees');
    const values = analyzer.getValue();
    // AVERAGE IS 0
    p5.translate(width / 2, height / 2);
    const radiusRange = 20; // r - 50px and r + 50px will be range for waveform
    const radiusCenter = 50;

    p5.noFill();
    const numRings = 5;
    for(let j = 1; j <= numRings; j++ ){
      p5.stroke(255, 255-(85*j), 255-(90*j), 255);
      p5.beginShape();
      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;
        const angle = p5.map(i, 0, values.length - 1, 0, 359);
        let radius = p5.map(amplitude, -1,1,radiusCenter-radiusRange, radiusCenter+radiusRange )
        radius *= j;
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);
        // Place vertex-
        p5.vertex(x, y);
      }
      p5.endShape();
    }
  },
  );