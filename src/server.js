const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());


app.put('/checkboxesData', (req, res) => {
  const data = JSON.stringify(req.body);
  fs.writeFile('checkboxesData.json', data, 'utf8', (err) => {
    if (err) {
      console.error('Error saving JSON data:', err);
      res.status(500).json({ error: 'Error saving data' });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
