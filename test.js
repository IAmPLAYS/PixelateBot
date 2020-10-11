const express = require('express');
const app = express();
const port = 21;

app.get('/', (req, res) => {
	res.send('Hello Simon');
});

app.listen(port, () => {
	console.log('Listening on port', port);
})