import express from 'express';
// import data.json from 

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'))

app.listen(3000, () => {
    console.log('The app is running!');
});

