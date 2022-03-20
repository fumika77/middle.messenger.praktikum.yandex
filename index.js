const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('./dist'))
console.log(__dirname)
app.listen(port, () => console.log(`App listening to port ${port}`));