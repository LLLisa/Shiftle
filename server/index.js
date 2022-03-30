const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8989;

const init = () => {
  try {
    app.listen(port, () => console.log(`~~~listening on port ${port}~~~`));
  } catch (error) {
    console.log(error);
  }
};

init();

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
