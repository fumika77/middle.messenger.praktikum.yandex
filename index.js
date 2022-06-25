const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

app.use(express.static('./dist'))
app.get('/', function(req, res) {
    res.send(__dirname + 'index.html');
});
app.listen(port, hostname, () => console.log(`App listening to port ${port}`));