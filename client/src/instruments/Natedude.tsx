// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
// import React from 'react';
import React, { useState } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */




interface DrumKitProps {
  name: string;
  prefix: string;
  kitNum: number;
  urls: {
    A3: string; //kick
    B3: string; //snare
    C3: string; //highHat
    D3: string; //tomLeft
    E3: string; //tomRight
    Eb3: string;//floorTom
    F3: string; //crash
    G3: string; //ride
  }
  // color: string;
}

function getDrumKitProps(){
  return {
    name: 'Kurzweil Kit 01',
    prefix: 'Kurzweil_Kit_01/',
    kitNum: 0,
      urls: {
        A3: 'CYCdh_Kurz01-Kick03.wav',
        B3: 'CYCdh_Kurz01-Snr02.wav',
        C3: 'CYCdh_Kurz01-ClHat.wav',
        D3: 'CYCdh_Kurz01-Tom04.wav', //leftTom
        E3: 'CYCdh_Kurz01-Tom03.wav', //rightTom
        Eb3: 'CYCdh_Kurz01-Tom01.wav', //floorTom
        F3: 'CYCdh_Kurz01-Crash01.wav',
        G3: 'CYCdh_Kurz01-Ride01.wav'
      }
    } as DrumKitProps;
  };

  const urlPrefix = 'Natedude/'

  // takes in DrumKitProps and returns [sampler, setSampler]
  function MakeSampler(newKit: DrumKitProps){
    const [sampler, setSampler] = useState(
      new Tone.Sampler({
        urls: newKit.urls,
        baseUrl: `http://localhost:3000/${urlPrefix}${newKit.prefix}`,
      }).toDestination()
      );
      return [sampler, setSampler] as [Tone.Sampler, React.Dispatch<React.SetStateAction<Tone.Sampler>>];
    }

    interface DrumKitPieceProps {
      note: string; // kick, snare, highHat, tomLeft, tomRight, crash, ride
      sampler: Tone.Sampler;
      styles: Object;
      hitboxStyles: Object;
    }

    export function DrumKitPiece({
      note,
      sampler,
      styles,
      hitboxStyles
    }: DrumKitPieceProps): JSX.Element {
      /**
       * This React component corresponds to either a major or minor key in the piano.
       * See `PianoKeyWithoutJSX` for the React component without JSX.
       */
      return (
        // Observations:
        // 1. The JSX refers to the HTML-looking syntax within TypeScript.
        // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
        // 3. The curly braces `{` and `}` should remind you of string interpolation.
        <div
          className={classNames('b--blue absolute h1')} // removed ba to hide borders
          style={Object.assign({},
            {
              // CSS
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }, styles)}
        >
          <div
            onMouseDown={() => sampler.triggerAttack(`${note}`)}
            onMouseUp={() => sampler.triggerRelease(`${note}`,'+0.25')}
            className={classNames('b--red pointer')} //removed ba to hide borders
            style={hitboxStyles}
          ></div>
          {/* <div></div> */}
        </div>
      );
    }

// function PianoType({ title, onClick, active }: any): JSX.Element {
//   return (
//     <div
//       onClick={onClick}
//       className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
//         'b--red green': active,
//         'gray b--light-gray': !active,
//       })}
//     >
//       {title}
//     </div>
//   );
// }
//  Object.keys(drumKits)
// interface Styles {
//   backgroundImage: string;
//   width: string;
//   height: string;
//   top: string;
//   left: string;
// }

// interface DrumKitPieceSpec {

// }

function DrumKit({ synth, setSynth }: InstrumentProps): JSX.Element {

  // drumPieces instead of keys
  const wUnit = 'rem'
  const hUnit = 'rem'

  const uiScale = 1;
  const drumPieces = [
    {
      note: 'F3', //crash
      styles: {
        backgroundImage: 'url(Natedude/img/crash.png)',
        width: `${uiScale*8}${wUnit}`,
        height: `${uiScale*20}${hUnit}`,
        top: `${uiScale*2}${hUnit}`,
        left: `${uiScale*4}${wUnit}`,
      },
      hitboxStyles:{
        float: 'right',
        width: `${uiScale*6.5}${wUnit}`,
        height: `${uiScale*4.5}${hUnit}`,
        // borderRadius: '1rem',
        borderTopLeftRadius: '70%',
        borderTopRightRadius: '120%',
        borderBottomRightRadius: '70%',
        borderBottomLeftRadius: '120%',

      }
    },
    {
      note: 'G3', //ride
      styles: {
        backgroundImage: 'url(Natedude/img/ride.png)',
        width: `${uiScale*7.7}${wUnit}`,
        height: `${uiScale*16}${hUnit}`,
        top: `${uiScale*4}${hUnit}`,
        left: `${uiScale*23}${wUnit}`,
      },
      hitboxStyles:{
        // float: 'right',
        width: `${uiScale*5}${wUnit}`,
        height: `${uiScale*5.3}${hUnit}`,
        // borderRadius: '1rem',
        borderTopLeftRadius: '130%',
        borderTopRightRadius: '60%',
        borderBottomRightRadius: '130%',
        borderBottomLeftRadius: '70%',

      }
    },
    {
      note: 'A3', //kick
      styles: {
        backgroundImage: 'url(Natedude/img/kick.png)',
        width: `${uiScale*11}${wUnit}`,
        height: `${uiScale*11}${hUnit}`,
        top: `${uiScale*11}${hUnit}`,
        left: `${uiScale*11}${wUnit}`,
      },
      hitboxStyles:{
        // float: 'center',
        position: 'absolute',
        width: `${uiScale*8.8}${wUnit}`,
        height: `${uiScale*9}${hUnit}`,
        top: `${uiScale*3}%`,
        left: `${uiScale*10.4}%`,
        borderRadius: '100%',
        // marginTop: '-4.5${hUnit}',
        // marginLeft: '-6.5${wUnit}',
        // borderRadius: '1rem',
      }
    },
    {
      note: 'C3', //high hat
      styles: {
        backgroundImage: 'url(Natedude/img/entireHighHat.png)',
        width: `${uiScale*7}${wUnit}`,
        height: `${uiScale*14}${hUnit}`,
        top: `${uiScale*8}${hUnit}`,
        left: `${uiScale*3}${wUnit}`,
      },
      hitboxStyles:{
        position: 'absolute',
        width: `${uiScale*5.8}${wUnit}`,
        height: `${uiScale*1.5}${hUnit}`,
        top: `${uiScale*7.7}%`,
        left: `${uiScale*2}%`,
        // borderRadius: '1rem',
        borderTopLeftRadius: '100%',
        borderTopRightRadius: '100%',
        borderBottomRightRadius: '100%',
        borderBottomLeftRadius: '100%',
      }
    },
    {
      note: 'B3', //snare
      styles: {
        backgroundImage: 'url(Natedude/img/fullSnare.png)',
        width: `${uiScale*7.5}${wUnit}`,
        height: `${uiScale*12}${wUnit}`,
        top: `${uiScale*11.3}${hUnit}`,
        left: `${uiScale*7}${wUnit}`,
      },
      hitboxStyles:{
        width: `${uiScale*7}${wUnit}`,
        height: `${uiScale*3}${wUnit}`,
      }
    },

    {
      note: 'D3', //leftTom
      styles: {
        backgroundImage: 'url(Natedude/img/leftTom.png)',
        width: `${uiScale*6}${wUnit}`,
        height: `${uiScale*4.5}${hUnit}`,
        top: `${uiScale*6.5}${hUnit}`,
        left: `${uiScale*10.2}${wUnit}`,
      },
      hitboxStyles:{
        width: `${uiScale*5.1}${wUnit}`,
        height: `${uiScale*4.3}${hUnit}`,
      }
    },
    {
      note: 'E3', //rightTom
      styles: {
        backgroundImage: 'url(Natedude/img/rightTom.png)',
        width: `${uiScale*5}${wUnit}`,
        height: `${uiScale*4.5}${hUnit}`,
        top: `${uiScale*6.5}${hUnit}`,
        left: `${uiScale*17}${wUnit}`,
      },
      hitboxStyles:{
        float: 'right',
        width: `${uiScale*4.2}${wUnit}`,
        height: `${uiScale*4.3}${hUnit}`,
      }
    },
    {
      note: 'Eb3', //floorTom
      styles: {
        backgroundImage: 'url(Natedude/img/floorTom.png)',
        width: `${uiScale*7.3}${wUnit}`,
        height: `${uiScale*11}${hUnit}`,
        top: `${uiScale*11}${hUnit}`,
        left: `${uiScale*22}${wUnit}`,
      },
      hitboxStyles:{
        position: 'absolute',
        width: `${uiScale*6.1}${wUnit}`,
        height: `${uiScale*6.5}${hUnit}`,
        top: `${uiScale*2}%`,
        left: `${uiScale*6}%`,
      }
    },
  ]
  // const p = drumPieces[0];


  //setDrumKit
  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  var [sampler, setSampler] = MakeSampler(getDrumKitProps());

  return (
    <div className="bg-near-black">
      <div className="relative dib w-100 ml4" style={{height: '43vh'}}>
        {drumPieces.map(p => {
          return (
            <DrumKitPiece
              note={p.note}
              sampler={sampler}
              styles={p.styles}
              hitboxStyles={p.hitboxStyles}
            />
          );
        })}
        {/* <DrumKitPiece
          note={p.note}
          sampler={sampler}
          image={p.image}
          height={p.height}
          width={p.width}
        /> */}
      </div>
      <div className={'pl4 pt4 flex'}>
        {}
      </div>
    </div>
  );
}

export const Natedude_Instrument = new Instrument('Drum_Kit', DrumKit);
