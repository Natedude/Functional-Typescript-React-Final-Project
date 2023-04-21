// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

// let pixelArray = ...

export const Natedude_Visual = new Visualizer(
  'Fast_Fourier_Transform',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const fftSize = 2048;
    analyzer.set({
      type: 'fft',
      size:  fftSize,
      smoothing: 0.5
    });

    const dimensions = Math.min(width, height);
    p5.background(0, 0, 0, 255);
    p5.strokeWeight(dimensions * 0.005);
    p5.stroke(0, 128, 128, 255);

    const values = analyzer.getValue().slice(0,fftSize); //len = width not 256

    // const len = values.length
    // console.log(`values.length: ${len}`)
    // console.log(`values[0]: ${values[0]} - values[]]: ${values[ len - 1 ]}`)
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number; // -1 < amplitude < 1

      // console.log(amplitude);

      // maps i from 0-255 range to 0-width range -> x
      // x pos of line
      const x = p5.map(i, 0, values.length - 1, 0, width);

      // map range 0-(-900) to 0-height
      const y = p5.map(amplitude, 0, -900, 0, 5*height);
      // height of line
      // const y = height / 2 + amplitude * height;

      // console.log(`start (x,y): (${x},${0}) - end (x,y): (${x},${y})`);
      p5.line(x,height,x,y);
    }
  },
);


// export const Natedude_Visual = new Visualizer(
//   'Natedude_Visual',
//   (p5: P5, analyzer: Tone.Analyser) => {
//     const width = window.innerWidth;
//     const height = window.innerHeight / 2;
//     const dim = Math.min(width, height);

//     p5.background(0, 0, 0, 255);

//     p5.strokeWeight(dim * 0.01);
//     p5.stroke(255, 255, 255, 255);
//     p5.noFill();

//     const values = analyzer.getValue(); //len 256
//     p5.beginShape();
//     for (let i = 0; i < values.length; i++) {
//       const amplitude = values[i] as number; // -1 < amplitude < 1
//       if(i % 100 === 0){
//         console.log(values.length);
//       }
//       const x = p5.map(i, 0, values.length - 1, 0, width);
//       // maps i from 0-255 range to 0-width range -> x
//       const y = height / 2 + amplitude * height;
//       // Place vertex
//       p5.vertex(x, y);
//     }
//     p5.endShape();
//   },
// );

/*
How to add viz to sidebar in app: (replace Natedude with your github handle)
- duplicate Waveform.tsx
- rename file to Natedude_Visual
- rename WaveformVisualizer to Natedude_Visual
line 9ish: export const Natedude_Visual = new Visualizer(
- rename 'Waveform' string to 'Natedude_Visual' on next line
- go to State.tsx and create a comment with your school name to put your stuff under
// Nathan Hildum
    - add import for Natedude_Visual
    import { Natedude_Visual } from './visualizers/Natedude_Visual';
    - add Natedude_Visual to list of visualizers on line 21ish
    const visualizers = List([WaveformVisualizer, Natedude_Visual]);
*/