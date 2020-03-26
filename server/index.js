const express = require('express');
const app = express();

const users = [
    {
        id: 1,
        firstName: 'Jandeilson',
        lastName: 'De Sousa',
        email: 'jandeilson.desousa@gmail.com',
        phone: 123456789,
        testimonial: [{
            id: 1,
            created: 10121993,
            state: 'Brasília',
            text: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.',
            media: { 
              photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
              videos: ['video1.mp4', 'video2.mp4', 'video3.mp4'],
              audios: ['audio1.mp3', 'audio2.mp3']
            }
          }]
    },
    {
        id: 2,
        firstName: 'Elmo',
        lastName: 'Brazil',
        email: 'elmo@email.com',
        phone: 123456789,
        testimonial: [
          {
            id: 2,
            created: 10121993,
            state: 'São Paulo',
            text: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.',
            media: { 
              photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
              videos: ['video1.mp4', 'video2.mp4', 'video3.mp4'],
              audios: ['audio1.mp3', 'audio2.mp3']
            }
          }
        ]
      }
  ];
  
  // Allow cross-origin requests
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.get("/users", (req, res) => {
    return res.json(users);
  });
  
  app.get("/user/:id", (req, res) => {
    // To prevent the ID "0" we'll simply subtract by one. This way we can query for id = 2 which will serve us 1, etc.
    const idx = req.params.id - 1;
  
    if (!users[idx]) {
      return res.status(404).json({ error: "User not found" });
    }
  
    return res.json(users[idx]);
  });
  
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });