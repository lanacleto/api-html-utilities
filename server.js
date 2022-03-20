const express = require('express');
const attributesRemover = require('./src/controller/attributesRemover');

const app = express();

app.use(express.json({ type: '*/*' }));

app.get('/attributesRemover', attributesRemover);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
