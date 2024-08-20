'use strict';

const express = require('express');
const path = require('path');
const { firebaseMain, firebaseNotices } = require('./utilities/scripts/firebase');

const app = express();
const PORT = parseInt(process.env.PORT) || 8080;


/* ----- Uses -----*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* ----- Endpoints -----*/

app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/data', async (req, res) => {
  
  try {

    console.error("Receive fetch");

    const ref = firebaseNotices.ref(); 
    const snapshot = await ref.once('value');
    const data = snapshot.val(); 

    console.error("data", data);

    res.json(data);

  } catch (error) {

    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {

  console.log(`Server running at http://localhost:${PORT}`);
});

