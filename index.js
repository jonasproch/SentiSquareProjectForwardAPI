const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());

const port = 4567;

app.post('/', async (req, res) => {
  if (req.body.extractors && req.body.text) {
    const urlencoded = new URLSearchParams();
    urlencoded.append('extractors', req.body.extractors);
    urlencoded.append('text', req.body.text);

    const innterRes = await fetch('https://api.textrazor.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-textrazor-key': 'cd9806d684c441dcad3c67d02a143de166e36dd997c37dc91f5f2b53',
      },
      body: urlencoded,
    });

    const data = await innterRes.json();

    res.json(data);
  } else {
    throw new Error('Extractors or text not provided');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});