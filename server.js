const express = require('express');
const path = require('path');
const app = express();
const apiRouter = require('./apiRouter');

const PORT = 3000;

//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// retrieves entire api data from transactions json
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public', 'transactions.json')))

app.use('/api', apiRouter);

app.use((req, res) => res.status(404).send('<h1> 404 Error - Page not found </h1>'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});