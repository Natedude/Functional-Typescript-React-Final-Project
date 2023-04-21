// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List } from 'immutable';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface ToneHoleProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth | Tone.MonoSynth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave?: number;
  index: number; // octave + index together give a location for the piano key
}

interface FluteStripeProps {
  color?: string; // Hex value or color name, #786663 or, red
  width?: string; // width in pixels
  height?: string; // in pixels
}

/**
 * This component is used to create the stripes on the flute
 * @param param0
 * @returns
 */
export function FluteStripe({ color, width, height }: FluteStripeProps): JSX.Element {
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      style={{
        backgroundColor: `${color || 'red'}`,
        height: `${height || 70}px`,
        width: `${width || 25}px`,
      }}
    ></div>
  );
}

export function ToneHole({ note, synth, index }: ToneHoleProps): JSX.Element {
  /**
   * This component will manage the tone holes
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(note, '8n')} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.15')} // Question: what is `onMouseUp`?
      className="bg-black"
      style={{
        borderRadius: '50%',
        height: '2rem',
        width: '2rem',
        marginTop: '1.3rem',
        left: `${index * 3}rem`,
      }}
    ></div>
  );
}

function FluteType({ title, onClick, active }: any): JSX.Element {
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

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
  // Adjust keys, add or remove new keys
  const keys = List([
    { note: 'C4', idx: 0 },
    { note: 'D4', idx: 1 },
    { note: 'E4', idx: 2 },
    { note: 'F4', idx: 3 },
    { note: 'G4', idx: 4 },
    { note: 'A4', idx: 5 },
    { note: 'B4', idx: 6 },
  ]);

  // C Pentatonic ["C4", "D4", "E4", "G4", "A4", "C5"]

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth((oldSynth) => {
      oldSynth.disconnect();

      const newSynth = new Tone.MonoSynth({
        oscillator: {
          type: newType,
          // frequency: 600, // Set the base frequency
        } as Tone.OmniOscillatorOptions,
        // Synth comprises of oscillator and envelop
        // Amplitude Envelop
        envelope: {
          attack: 0.11,
          decay: 0.2,
          release: 0.4,
          sustain: 0.8,
        },
        // Apply filter
        filter: {
          frequency: 240,
        },
        // Adjust filterEnvelop | FrequencyEnvelop
        filterEnvelope: {
          attack: 0.2,
          baseFrequency: 'C2',
          octaves: 4,
        },
      }).toDestination();

      // Added LFO to modify the synth
      // const lfo = new Tone.LFO(4, 800, 1400); // frequency, minimum, maximum
      // lfo.connect(newSynth.oscillator.frequency).start();

      // Add filter
      // var filter = new Tone.Filter(200, 'lowpass').toDestination();
      // filter.frequency.rampTo(6000, '4n');
      // newSynth.connect(filter.frequency);

      const filter = new Tone.AutoFilter(5).start();
      const distortion = new Tone.Distortion(0.7);

      newSynth.chain(filter, distortion, Tone.Destination);

      return newSynth;
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="bg-yellow flex" style={{ height: '70px', width: '570px', margin: 'auto' }}>
        <FluteStripe />

        <div className="ml2 mr2">
          <ToneHole note={keys.toArray()[0].note} synth={synth} index={0} />
        </div>

        <FluteStripe color="#aa0000" />
        <FluteStripe color="#00ee00" />
        <FluteStripe color="#4444ff" />

        <div className="ml-auto flex">
          {keys.map((key, indx) => {
            // Skip the first one
            if (!indx) return null;

            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}`;
            return (
              <div key={indx} className="mr2">
                <ToneHole
                  key={note} //react key
                  note={note}
                  synth={synth}
                  minor={isMinor}
                  index={key.idx + 1}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className={'pl4 pt4 flex'}>
        {oscillators.map((o) => (
          <FluteType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const Nishamgr_Flute = new Instrument('Nishamgr_Flute', Flute);
