// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface PianoKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth | Tone.MonoSynth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function PianoKey({
  note,
  synth,
  minor,
  index,
}: PianoKeyProps): JSX.Element {
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
    onMouseDown={() => synth?.triggerAttackRelease(`${note}`, "8n")}//onMouseDown={() => synth?.triggerAttackRelease(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.05')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor, // minor keys are black
        'orange bg-orange h4': !minor, // major keys are white // line 43+ changed from black bg-white h4 to black bg-brown h4 
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      }}
    ></div>
  );
}

// eslint-disable-next-line
function PianoKeyWithoutJSX({
  note,
  synth,
  minor,
  index,
}: PianoKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `PianoKey` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttackRelease(`${note}`, "8n"),//onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.05'), //onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,  
        'orange bg-orange h4': !minor, // line 75+ changed from black bg-white h4 to black bg-brown h4
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      },
    },
    [],
  );
}

function PianoType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Piano({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'D', idx: 2 },
    { note: 'E', idx: 4 },
    { note: 'F', idx: 6 },
    { note: 'G', idx: 8 },
    { note: 'A', idx: 10 },
    { note: 'B', idx: 12 },
    { note: 'C', idx: 14 },
    { note: 'D', idx: 14 },
    { note: 'E', idx: 16 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    console.log("setOscillator, has been CALLED!!!");
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };
  /* added changed from 129 to 135 */
  const setOscillator2 = () => {
    console.log("setOscillator2, has been CALLED!!!");
    const synth = new Tone.PolySynth().toDestination();
    synth.set({ detune: -1200 });
    return synth; 
  } // end of changes
/* .type ↝ String #
The type of the oscillator: either sine, square, triangle, or sawtooth. 
Also capable of setting the first x number of partials of the oscillator. 
For example: “sine4” would set be the first 4 partials of the sine wave 
and “triangle8” would set the first 8 partials of the triangle wave.
Uses PeriodicWave internally even for native types so that it can set the phase. 
PeriodicWave equations are from the Webkit Web Audio implementation.*/
  const oscillators: List<OscillatorType> = List([
    'sine',
    'sine30',
    'square10',
    'triangle10',
    'fmtriangle10',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(3, 4).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <PianoKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <PianoType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
      {/* added changed see lines 163-171 */}
      {/* <div className={'pl4 pt4 flex'}> 
        { <PianoType
            key={'sine2'} 
            title={'sine2'}
            onClick={() => setOscillator2()}
            active={true}
          />
        }
      </div>  */} {/* end of added */}
    </div>
  );
}

export const jaq19_instrument = new Instrument('Xylophone', Piano);