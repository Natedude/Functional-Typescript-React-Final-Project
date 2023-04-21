// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';
// matthewMadore
import { matthewMadore_Instrument } from './instruments/matthewMadore';
import { matthewMadore_Visual } from './visualizers/matthewMadore';
// Nathan Hildum - Natedude
import { Natedude_Instrument } from './instruments/Natedude';
import { Natedude_Visual } from './visualizers/Natedude';
// Neesha Magar
import { Nishamgr_Flute } from './instruments/Nishamgr_Flute';
import { Nishamgr_Circle } from './visualizers/Nishamgr_Circle';
// Andres - jaq19
import { jaq19_instrument } from './instruments/jaq19_instrument'; //uncomment after file compiles
import { jaq19_visual } from './visualizers/jaq19_visual';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;


const instruments = List([PianoInstrument, matthewMadore_Instrument, Natedude_Instrument, Nishamgr_Flute, jaq19_instrument]); //add jaq19_Xylophone to list after it compiles
const visualizers = List([WaveformVisualizer, matthewMadore_Visual, Natedude_Visual, Nishamgr_Circle, jaq19_visual]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
