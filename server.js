const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const fs = require('fs');

const db = {
  "albums": [
    {
      "id": 1,
      "name": "EPIC: The Troy Saga (Official Concept Album)",
      "artist": "Jorge Rivera-Herrans",
      "type": "EP",
      "songCount": 5,
      "duration": "00:15:40",
      "size": "45 MB",
      "releasedOn": "03 Sept 2024, 02:35 PM"
    },
    {
      "id": 2,
      "name": "EPIC: The Ocean Saga (Official Concept Album)",
      "artist": "Jorge Rivera-Herrans",
      "type": "EP",
      "songCount": 4,
      "duration": "00:13:00",
      "size": "15 MB",
      "releasedOn": "04 Sept 2024, 10:00 AM"
    },
    {
      "id": 3,
      "name": "EPIC: The Ithica Saga (Official Concept Album)",
      "artist": "Jorge Rivera-Herrans",
      "type": "EP",
      "songCount": 4,
      "duration": "00:12:24",
      "size": "30 MB",
      "releasedOn": "04 Sept 2024, 10:00 AM"
    },
    {
      "id": 4,
      "name": "Collection Name 4",
      "artist": "Artist Name",
      "type": "Album",
      "songCount": 8,
      "duration": "00:21:06",
      "size": "12 MB",
      "releasedOn": "10 Oct 2024, 02:35 PM"
    },
    {
      "id": 5,
      "name": "Collection Name 5",
      "artist": "Artist Name",
      "type": "Album",
      "songCount": 7,
      "duration": "00:20:22",
      "size": "10 MB",
      "releasedOn": "01 Sept 2024, 12:31 AM"
    },
    {
      "id": 6,
      "name": "Collection Name 6",
      "artist": "Artist Name",
      "type": "Album",
      "songCount": 9,
      "duration": "00:25:40",
      "size": "16 MB",
      "releasedOn": "05 Sept 2024, 12:31 AM"
    },
    {
      "id": 7,
      "name": "Collection Name 7",
      "artist": "Artist Name",
      "type": "Single",
      "songCount": 1,
      "duration": "00:01:20",
      "size": "24 MB",
      "releasedOn": "11 Oct 2024, 12:31 AM"
    },
    {
      "id": 8,
      "name": "Collection Name 8",
      "artist": "Artist Name",
      "type": "Single",
      "songCount": 1,
      "duration": "00:01:20",
      "size": "24 MB",
      "releasedOn": "11 Oct 2024, 12:31 AM"
    }
  ],
  "songs": [
    {
      "id": 1,
      "albumId": 1,
      "title": "The Horse and the Infant",
      "performers": "Jorge Rivera-Herrans, Luke Holt & Cast of EPIC: The Musical",
      "duration": "00:02:15",
      "size": "15 MB"
    },
    {
      "id": 2,
      "albumId": 1,
      "title": "Just a Man",
      "performers": "Jorge Rivera-Herrans & Cast of EPIC: The Musical",
      "duration": "00:02:30",
      "size": "16 MB"
    },
    {
      "id": 3,
      "albumId": 1,
      "title": "Full Speed Ahead",
      "performers": "Jorge Rivera-Herrans, Armando Julián, Steven Dookie & Cast of EPIC: The Musical",
      "duration": "00:05:10",
      "size": "24 MB"
    },
    {
      "id": 4,
      "albumId": 1,
      "title": "Open Arms",
      "performers": "Jorge Rivera-Herrans & Steven Dookie",
      "duration": "00:05:10",
      "size": "23 MB"
    },
    {
      "id": 5,
      "albumId": 1,
      "title": "Warrior of the Mind",
      "performers": "Jorge Rivera-Herrans, Teagan Earley & Cast of EPIC: The Musical",
      "duration": "00:05:10",
      "size": "23 MB"
    },
    {
      "id": 6,
      "albumId": 2,
      "title": "Ocean Song 1",
      "performers": "Jorge Rivera-Herrans & Cast",
      "duration": "00:03:15",
      "size": "4 MB"
    },
    {
      "id": 7,
      "albumId": 2,
      "title": "Ocean Song 2",
      "performers": "Jorge Rivera-Herrans",
      "duration": "00:03:30",
      "size": "4 MB"
    },
    {
      "id": 8,
      "albumId": 2,
      "title": "Ocean Song 3",
      "performers": "Jorge Rivera-Herrans & Cast",
      "duration": "00:03:05",
      "size": "3.5 MB"
    },
    {
      "id": 9,
      "albumId": 2,
      "title": "Ocean Song 4",
      "performers": "Jorge Rivera-Herrans & Cast",
      "duration": "00:03:10",
      "size": "3.5 MB"
    }
  ]
};

const dbPath = path.join(__dirname, 'db.json');
fs.writeFileSync(dbPath, JSON.stringify(db));

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

server.get('/albums/:id/songs', (req, res) => {
  const albumId = parseInt(req.params.id);
  const songs = db.songs.filter(song => song.albumId === albumId);
  
  if (songs.length > 0) {
    res.jsonp(songs);
  } else {
    res.status(404).jsonp({ error: "Songs not found" });
  }
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});