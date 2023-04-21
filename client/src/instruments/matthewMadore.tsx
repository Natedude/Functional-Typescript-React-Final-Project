// 3rd party library imports
import * as Tone from 'tone'
import classNames from 'classnames'
import { List, Range } from 'immutable'
//import React from 'react'
import React, { useState } from 'react'

// project imports
import { Instrument, InstrumentProps } from '../Instruments'

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface ButtonProps {
  notesNameDisplay: string
  notesToPlay: string[] // chords
  idx: number
  keyboardKey: string
  passToButtons: {
    majorI?: string[]
    minorii?: string[]
    minoriii?: string[]
    majorIV?: string[]
    majorV?: string[]
    minorvi?: string[]
    diminishedvii?: string[]
    tonic?: string[]
    supertonic?: string[]
    mediant?: string[]
    subdominant?: string[]
    dominant?: string[]
    submediant?: string[]
    leadingTone?: string[]
    octave?: string[]
  }
}

function MakeSampler () {
  const [sampler, setSampler] = useState(
    new Tone.Sampler({
      urls: {
        A1: 'A1.wav',
        A2: 'A2.wav',
        A3: 'A3.wav',
        B1: 'B1.wav',
        B2: 'B2.wav',
        B3: 'B3.wav',
        Bb1: 'Bb1.wav',
        Bb2: 'Bb2.wav',
        Bb3: 'Bb3.wav',
        C1: 'C1.wav',
        C2: 'C2.wav',
        C3: 'C3.wav',
        C4: 'C4.wav',
        Db1: 'Db1.wav',
        Db2: 'Db2.wav',
        Db3: 'Db3.wav',
        Db4: 'Db4.wav',
        D1: 'D1.wav',
        D2: 'D2.wav',
        D3: 'D3.wav',
        Eb1: 'Eb1.wav',
        Eb2: 'Eb2.wav',
        Eb3: 'Eb3.wav',
        E1: 'E1.wav',
        E2: 'E2.wav',
        E3: 'E3.wav',
        F1: 'F1.wav',
        F2: 'F2.wav',
        F3: 'F3.wav',
        Gb1: 'Gb1.wav',
        Gb2: 'Gb2.wav',
        Gb3: 'Gb3.wav',
        C5: 'wrongKey.wav'
      },
      baseUrl: 'http://localhost:3000/matthewMadore/samples/'
    }).toDestination()
  )
  return [sampler, setSampler] as [
    Tone.Sampler,
    React.Dispatch<React.SetStateAction<Tone.Sampler>>
  ]
}

function generateKeyToPlay (
  keyToBuild: string // 'A'
): List<ButtonProps> {
  const chromaticScale = [
    'A', // 0,
    'Bb', // 1
    'B', // 2
    'C', // 3
    'Db', // 4
    'D', // 5
    'Eb', // 6
    'E', // 7
    'F', // 8
    'Gb', // 9
    'G', // 10
    'Ab', // 11,
    'A', // 12,
    'Bb', // 13
    'B', // 14
    'C', // 15
    'Db', // 16
    'D', // 5
    'Eb', // 6
    'E', // 7
    'F', // 8
    'Gb', // 9
    'G', // 10
    'Ab' // 11
  ]
  const chromaticScaleWithOctave = [
    'A1', // 0,
    'Bb1', // 1
    'B1', // 2
    'C1', // 3
    'Db1', // 4
    'D1', // 5
    'Eb1', // 6
    'E1', // 7
    'F1', // 8
    'Gb1', // 9
    'G1', // 10
    'Ab1', // 11
    'A2', // 12
    'Bb2', // 13
    'B2', // 14
    'C2', // 15
    'Db2', // 16
    'D2', // 17
    'Eb2', // 18
    'E2', // 19
    'F2', // 20
    'Gb2', // 21
    'G2', // 22
    'Ab2', // 23
    'A3', // 12
    'Bb3', // 13
    'B3', // 14
    'C3', // 15
    'Db3', // 16
    'D3', // 17
    'Eb3', // 18
    'E3', // 19
    'F3', // 20
    'Gb3', // 21
    'G3', // 22
    'Ab3' // 23
  ]

  //building first key
  // acrynome for shars and flats: fat cats give dog an everlasting battle or Beadgfc
  // In key of Amajor sharps are are F C G or in flats it is Gb Db Ab
  // scale for 'A' with sharps: A B C# D E F# G# A
  // scale for 'A':              A B Db D E Gb Ab A
  // A major chord is A Db E or 0 4 7
  // b minor is B D Gb or 2 5 9
  //  0 , 2 , 4 , 5, 7, 9, 11, 12

  const usersSelectedKey = chromaticScale.indexOf(keyToBuild)

  function getNote (number: number) {
    return chromaticScale[chromaticScale.indexOf(keyToBuild) + number]
  }

  function getNoteOctave (number: number) {
    return chromaticScaleWithOctave[usersSelectedKey + number]
  }
  // scale for 'A':              A B Db D E Gb Ab A
  const keyToPlay = List([
    {
      notesNameDisplay: `${getNote(0)}maj`,
      notesToPlay: [
        `${getNoteOctave(0)}`,
        `${getNoteOctave(4)}`,
        `${getNoteOctave(7)}`
      ],
      idx: 1,
      keyboardKey: '1='
    },
    {
      notesNameDisplay: `${getNote(2)}min`,
      notesToPlay: [
        `${getNoteOctave(2)}`,
        `${getNoteOctave(5)}`,
        `${getNoteOctave(9)}`
      ],
      idx: 2,
      keyboardKey: '2='
    },
    {
      notesNameDisplay: `${getNote(4)}min`,
      notesToPlay: [
        `${getNoteOctave(4)}`,
        `${getNoteOctave(7)}`,
        `${getNoteOctave(11)}`
      ],
      idx: 3,
      keyboardKey: '3='
    },
    {
      notesNameDisplay: `${getNote(5)}maj`,
      notesToPlay: [
        `${getNoteOctave(5)}`,
        `${getNoteOctave(9)}`,
        `${getNoteOctave(12)}`
      ],
      idx: 4,
      keyboardKey: '4='
    },
    {
      notesNameDisplay: `${getNote(7)}maj`,
      notesToPlay: [
        `${getNoteOctave(7)}`,
        `${getNoteOctave(11)}`,
        `${getNoteOctave(14)}`
      ],
      idx: 5,
      keyboardKey: 'Q='
    },
    {
      notesNameDisplay: `${getNote(9)}min`,
      notesToPlay: [
        `${getNoteOctave(9)}`,
        `${getNoteOctave(12)}`,
        `${getNoteOctave(16)}`
      ],
      idx: 6,
      keyboardKey: 'W='
    },
    {
      notesNameDisplay: `${getNote(11)}dim`,
      notesToPlay: [
        `${getNoteOctave(11)}`,
        `${getNoteOctave(14)}`,
        `${getNoteOctave(17)}`
      ],
      idx: 7,
      keyboardKey: 'E='
    },
    {
      notesNameDisplay: `${getNote(0)}`,
      notesToPlay: [`${getNoteOctave(0)}`],
      idx: 8,
      keyboardKey: 'I='
    },
    {
      notesNameDisplay: `${getNote(2)}`,
      notesToPlay: [`${getNoteOctave(2)}`],
      idx: 9,
      keyboardKey: 'O='
    },
    {
      notesNameDisplay: `${getNote(4)}`,
      notesToPlay: [`${getNoteOctave(4)}`],
      idx: 10,
      keyboardKey: 'P='
    },
    {
      notesNameDisplay: `${getNote(5)}`,
      notesToPlay: [`${getNoteOctave(5)}`],
      idx: 11,
      keyboardKey: '[='
    },
    {
      notesNameDisplay: `${getNote(7)}`,
      notesToPlay: [`${getNoteOctave(7)}`],
      idx: 12,
      keyboardKey: 'K='
    },
    {
      notesNameDisplay: `${getNote(9)}`,
      notesToPlay: [`${getNoteOctave(9)}`],
      idx: 13,
      keyboardKey: 'L='
    },
    {
      notesNameDisplay: `${getNote(11)}`,
      notesToPlay: [`${getNoteOctave(11)}`],
      idx: 14,
      keyboardKey: ';='
    },
    {
      notesNameDisplay: `${getNote(12)}`,
      notesToPlay: [`${getNoteOctave(12)}`],
      idx: 15,
      keyboardKey: "'="
    }
  ])
  return keyToPlay as List<ButtonProps>
}
let newKeyToPlay = generateKeyToPlay('Gb')

type mess = {
  majorI?: string[]
  minorii?: string[]
  minoriii?: string[]
  majorIV?: string[]
  majorV?: string[]
  minorvi?: string[]
  diminishedvii?: string[]
  tonic?: string[]
  supertonic?: string[]
  mediant?: string[]
  subdominant?: string[]
  dominant?: string[]
  submediant?: string[]
  leadingTone?: string[]
  octave?: string[]
}
let playChordOrNote: mess = {
  majorI: ['Ab3', 'B4', 'Eb4'], // [A, Db, E]
  minorii: ['Bb4', 'Db4', 'F4'],
  minoriii: ['B4', 'Eb4', 'Gb4'],
  majorIV: ['Db4', 'F4', 'Ab4'],
  majorV: ['Ab3', 'B4', 'Eb4'],
  minorvi: ['Ab3', 'B4', 'Eb4'],
  diminishedvii: ['Ab3', 'B4', 'Eb4'],
  tonic: ['Ab3', 'B4', 'Eb4'],
  supertonic: ['Ab3', 'B4', 'Eb4'],
  mediant: ['Ab3', 'B4', 'Eb4'],
  subdominant: ['Ab3', 'B4', 'Eb4'],
  dominant: ['Ab3', 'B4', 'Eb4'],
  submediant: ['Ab3', 'B4', 'Eb4'],
  leadingTone: ['Ab3', 'B4', 'Eb4'],
  octave: ['Ab3', 'B4', 'Eb4']
}

function assignKeyBoardKeysToNotes (
  keyToPlay: List<{
    notesNameDisplay: string
    notesToPlay: string[]
    idx: number
    keyboardKey: string
  }>
): mess {
  playChordOrNote = {
    majorI: newKeyToPlay.get(0)?.notesToPlay, // [A, Db, E]
    minorii: newKeyToPlay.get(1)?.notesToPlay,
    minoriii: newKeyToPlay.get(2)?.notesToPlay,
    majorIV: newKeyToPlay.get(3)?.notesToPlay,
    majorV: newKeyToPlay.get(4)?.notesToPlay,
    minorvi: newKeyToPlay.get(5)?.notesToPlay,
    diminishedvii: newKeyToPlay.get(6)?.notesToPlay,
    tonic: newKeyToPlay.get(7)?.notesToPlay,
    supertonic: newKeyToPlay.get(8)?.notesToPlay,
    mediant: newKeyToPlay.get(9)?.notesToPlay,
    subdominant: newKeyToPlay.get(10)?.notesToPlay,
    dominant: newKeyToPlay.get(11)?.notesToPlay,
    submediant: newKeyToPlay.get(12)?.notesToPlay,
    leadingTone: newKeyToPlay.get(13)?.notesToPlay,
    octave: newKeyToPlay.get(14)?.notesToPlay
  }

  return playChordOrNote
}
assignKeyBoardKeysToNotes(newKeyToPlay)
// let playChordOrNote: {
//   majorI?: string[]
//   minorii?: string[]
//   minoriii?: string[]
//   majorIV?: string[]
//   majorV?: string[]
//   minorvi?: string[]
//   diminishedvii?: string[]
//   tonic?: string[]
//   supertonic?: string[]
//   mediant?: string[]
//   subdominant?: string[]
//   dominant?: string[]
//   submediant?: string[]
//   leadingTone?: string[]
//   octave?: string[]
// }

let soundToPlay = ['C5']

const keyDownHandler = (
  event: React.KeyboardEvent<HTMLDivElement>
): string[] => {
  // console.log(event)
  switch (event.code) {
    case 'Digit1': {
      soundToPlay = playChordOrNote.majorI!
      break
    }
    case 'Digit2': {
      soundToPlay = playChordOrNote.minorii!
      break
    }
    case 'Digit3': {
      soundToPlay = playChordOrNote.minoriii!
      break
    }
    case 'Digit4': {
      soundToPlay = playChordOrNote.majorIV!
      break
    }
    case 'KeyQ': {
      soundToPlay = playChordOrNote.majorV!
      break
    }
    case 'KeyW': {
      soundToPlay = playChordOrNote.minorvi!
      break
    }
    case 'KeyE': {
      soundToPlay = playChordOrNote.diminishedvii!
      break
    }
    case 'KeyI': {
      soundToPlay = playChordOrNote.tonic!
      break
    }
    case 'KeyO': {
      soundToPlay = playChordOrNote.supertonic!
      break
    }
    case 'KeyP': {
      soundToPlay = playChordOrNote.mediant!
      break
    }
    case 'BracketLeft': {
      soundToPlay = playChordOrNote.subdominant!
      break
    }
    case 'KeyK': {
      soundToPlay = playChordOrNote.dominant!
      break
    }
    case 'KeyL': {
      soundToPlay = playChordOrNote.submediant!
      break
    }
    case 'Semicolon': {
      soundToPlay = playChordOrNote.leadingTone!
      break
    }
    case 'Quote': {
      soundToPlay = playChordOrNote.octave!
      break
    }
    default: {
      soundToPlay = ['C5']
      break
    }
  }
  return soundToPlay
}

const keyUpHandler = (
  event: React.KeyboardEvent<HTMLDivElement>
): string[] | undefined => {
  let soundToPlay: string[] | undefined
  // console.log(event)
  switch (event.code) {
    case 'Digit1': {
      soundToPlay = playChordOrNote.majorI
      break
    }
    case 'Digit2': {
      soundToPlay = playChordOrNote.minorii
      break
    }
    case 'Digit3': {
      soundToPlay = playChordOrNote.minoriii
      break
    }
    case 'Digit4': {
      soundToPlay = playChordOrNote.majorIV
      break
    }
    case 'KeyQ': {
      soundToPlay = playChordOrNote.majorV
      break
    }
    case 'KeyW': {
      soundToPlay = playChordOrNote.minorvi
      break
    }
    case 'KeyE': {
      soundToPlay = playChordOrNote.diminishedvii
      break
    }
    case 'KeyI': {
      soundToPlay = playChordOrNote.tonic
      break
    }
    case 'KeyO': {
      soundToPlay = playChordOrNote.supertonic
      break
    }
    case 'KeyP': {
      soundToPlay = playChordOrNote.mediant
      break
    }
    case 'BracketLeft': {
      soundToPlay = playChordOrNote.subdominant
      break
    }
    case 'KeyK': {
      soundToPlay = playChordOrNote.dominant
      break
    }
    case 'KeyL': {
      soundToPlay = playChordOrNote.submediant
      break
    }
    case 'Semicolon': {
      soundToPlay = playChordOrNote.leadingTone
      break
    }
    case 'Quote': {
      soundToPlay = playChordOrNote.octave
      break
    }
    default: {
      soundToPlay = ['C5']
      break
    }
  }
  return soundToPlay
}

//let passToButtons = setKeyBoardKeys(newKeyToPlay)

export function ChordOrNoteButton ({
  notesNameDisplay,
  idx,
  keyboardKey
}: // passToButtons,
ButtonProps): JSX.Element {
  // TODO: recieve front into to select what key the user wants to play
  // waiting input

  let soundToPlay: string[]
  soundToPlay = ['C5']
  const [sampler, setSampler] = MakeSampler()
  const displayString = `${keyboardKey}${notesNameDisplay}`

  const topPlacement = (): number => {
    if (idx <= 4 || (idx >= 8 && idx <= 11)) {
      // left 1st row
      return 0
    } else {
      // left 2nd row
      return 4
    }
  }

  const leftPlacement = (): number => {
    if (idx <= 4) {
      // top left
      return idx * 6 - 6
    } else if (idx >= 8 && idx <= 11) {
      //top right
      return idx * 6 - 6 * 3
    } else if (idx >= 5 && idx <= 8) {
      // bottom left
      return idx * 6 - 6.8 * 4
    } else {
      // bottom right
      return idx * 6 - 10 * 4
    }
  }
  return (
    <div
      onMouseDown={() => sampler?.triggerAttack(['C5'])} // Question: what is `onMouseDown`?
      onMouseUp={() => sampler?.triggerRelease(['C5'], '+0.10')} // Question: what is `onMouseUp`?
      onKeyDown={e => sampler?.triggerAttack(`${keyDownHandler(e)}`)}
      tabIndex={0}
      onKeyUp={e => sampler?.triggerRelease(`${keyUpHandler(e)}`, '+0.10')}
      className={classNames('ba pointer absolute dim bg-light-red black h1 br4')}
      style={{
        // CSS
        display: 'flex',
        top: `${topPlacement()}rem`,
        left: `${leftPlacement()}rem`,
        zIndex: 0,
        height: '3rem',
        width: '5rem',
        padding: 0.1,
        marginLeft: '0.25rem',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',

      }}
    >
      {displayString}
    </div>
  )
}

function Chords_and_Notes_Generator ({
  synth,
  setSynth
}: InstrumentProps): JSX.Element {
  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect()

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions
      }).toDestination()
    })
  }


  return (
    <div className='pv4 bg-near-black'>
      <div
        className='pb2 pl4 white'
        style={{
          top: '0rem',
          left: '5rem'
        }}
      >
        Instructions:
        Click a red button to activate the keyboard, then use keyboard keys (1-4, Q-E, i-[, k-') to play chords (with left hand) and single notes (with right hand).
      </div>
      <div className='relative dib w-100 ml4' style={{ height: '43vh' }}>
        {generateKeyToPlay('B').map(c => {
          const stringOfNotes = c.notesToPlay
          return (
            <ChordOrNoteButton
              notesNameDisplay={c.notesNameDisplay} //react key
              notesToPlay={stringOfNotes}
              idx={c.idx}
              keyboardKey={c.keyboardKey}
              passToButtons={c.passToButtons}
            />
          )
        })}
      </div>
      {}
    </div>
  )
}

export const matthewMadore_Instrument = new Instrument(
  'ChordNoteGenerator',
  Chords_and_Notes_Generator
)


