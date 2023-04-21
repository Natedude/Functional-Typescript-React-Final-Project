-- NOTE: I figured we'd want this for the section on SQL
PRAGMA foreign_keys;
-- NOTE: For the SQL assignment, we could have them normalize
-- this database farther. Perhaps they can learn about SERIAL and
-- then go implement a way to change a room_name without losing
-- references by using a FOREIGN KEY into a rooms table with an
-- int primary key.
CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL,
	artist varchar NOT NULL,
	album varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes, artist, album)
VALUES (
		1,
		'Ode to Joy (Dubstep Remix)',
		'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4',
		'Blue Claw Philharmonic',
		'Dubstep Classical Remix(Epic Classical Dubstep Remixes)'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		2,
		'Yours',
		'F4 F4 F4 F4 F4 F4 F4 F4 C4 D4 C4 C4 F4 F4 F4 F4 F4 F4 F4 F4 F5 G5 F5 F5 Eb4 Eb4 Eb4 Eb4 Eb4 Eb4 Eb4 Eb4 Bb3 Bb3 Bb3 Bb3 Bb3 Bb3 Bb3 Bb3',
		'King Gizzard & The Lizard Wizard',
		'Butterfly3000'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		3,
		'Everything in its Right place',
		'B3 B3 C3 C3 C3 C3 D3 D3 D3 D3 B3 B3 C3 C3 C3 C3 D3 D3 D3 D3',
		'Radiohead',
		'Kid A'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		4,
		'WAP',
		'Gb4 Gb4 Gb4 Gb4 A4 A4 A4 A4 B4 B4 B4 B4',
		'Cardi B',
		'WAP'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		5,
		'Free Falling',
		'G3 C3 C3 C3 D3 D3 G3 C3 C3 C3 D3 D3 G3 C3 C3 C3 D3 D3',
		'Tom Petty',
		'Full Moon Fever'
	);
INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		6,
		'I want you back',
		'E4 E4 E4 E4 A4 A4 A4 A4 B4 B4 B4 B4 E4 E4 E4 E4 A4 A4 A4 A4 B4 B4 B4 B4',
		'Jackson 5',
		'Diana Ross Presents The Jackson 5'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		7,
		'Wish You Were Here',
		'A4 A4 A4 A4 C4 C4 C4 C4 G4 G4 G4 G4',
		'Pink Floyd',
		'Wish You Were Here'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		8,
		'Here Comes the sun',
		'A4 E4 B4 D4 B4 A4 A4 E4 E4 E4 G4 G4',
		'The Beatles',
		'Abbey Roas'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		9,
		'We Will Rock You',
		'E4 E4 D4 D4 A4 A4 A4 E4 E4 D4 D4 A4 A4 A4',
		'Queen',
		'News of the World'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		10,
		'Waterfalls',
		'G4 D4 D4 D4 A4 A4 A4 E4 E4 D4 D4 A4 A4 A4',
		'TLC',
		'CrazySexyCool'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		11,
		'Money',
		'Db4 Db4 Db4 Db4 Ab4 Ab4 Ab4 Eb4 Eb4 C4 C4 C4 C4 C4',
		'Pink Floyd',
		'Dark Side of the Moon'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		12,
		'saftey dance',
		'F4 F4 F4 F4 F4 D4 D4 D4 A4 A4 A4 C4 C4 C4 C4 C4',
		'Angle Olsen',
		'Aisles'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		13,
		'Run run run',
		'Gb4 Gb4 Gb4 B4 Gb4 Gb4 Gb4 B4 Gb4 Gb4 Gb4 B4 Gb4 Gb4 Gb4 B4',
		'Velvet Underground',
		'Oh Sweet Jane'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		14,
		'Run run run',
		'Gb4 Gb4 Gb4 B4 Gb4 Gb4 Gb4 B4 Gb4 Gb4 Gb4 B4 Gb4 Gb4 Gb4 B4',
		'Velvet Underground',
		'Banana'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		15,
		'Dreams',
		'C4 C4 C4 C4 F4 F4 F4 F4 G4 G4 G4 G4 C4 C4 C4 C4 F4 F4 F4 F4 G4 G4 G4 G4',
		'Cranberries',
		'Everyone Else is Doing it'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		16,
		'Low',
		'E4 E4 D4 D4 A4 A4 A4 E4 E4 D4 D4 A4 A4 A4',
		'Chet Faker',
		'Hotel Surrender'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		17,
		'sitting on the dock the bay',
		'E4 E4 D4 D4 A4 A4 A4 E4 E4 D4 D4 A4 A4 A4',
		'Otis redding',
		'The Dock of the Bay'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		18,
		'Dance Yrself Clean',
		'E4 E4 D4 D4 A4 A4 A4 E4 E4 D4 D4 A4 A4 A4',
		'Lcd Soundsystem',
		'Silver'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		19,
		'Just Dance',
		'E4 E4 D4 D4 A4 A4 A4 E4 E4 D4 D4 A4 A4 A4',
		'David Bowie',
		'Ziggy stardust'
	);

INSERT INTO songs (id, song_title, notes, artist, album)
VAlUES (
		20,
		'Fading',
		'Db4 Db4 Db4 Db4 EB4 EB4 EB4 EB4 Ab4 Ab4 Ab4',
		'Sylan Esso',
		'Fading Colors'
	);

-- TODO: add metadata: album, artist, len,