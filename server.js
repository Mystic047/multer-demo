const express = require('express');
const uploadRoutes = require('./upload'); // Import the routes from upload.js
const cors = require('cors');
const fs = require('fs');


const app = express();
const port = 4000;
const DIR = './uploads/';


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/files', express.static('uploads'));

app.use('/api', uploadRoutes);

app.get('/photo/:uuid', (req, res) => {
  const uuid = req.params.uuid;

  console.log(`Looking for file with UUID: ${uuid}`);
  

  const filename = fs.readdirSync(DIR).find(file => file.startsWith(uuid));
  if (filename) {
      res.sendFile(`${DIR}/${filename}`, { root: '.' });
  } else {
      console.log(`File not found: ${uuid}`); 
      res.status(404).send('Image not found');
  }
});




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
