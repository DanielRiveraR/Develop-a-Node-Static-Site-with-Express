const express = require('express');
const data = require('./data.json');

const app = express();
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {data: data.projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id',(req,res,next)=> {
    if (data.projects[req.params.id]) {
        res.render('project', {data: data.projects[req.params.id]});
    } else {
        const err = new Error();
        err.status = 404;
        err.message = `Ooops! Looks that the project you request doesn't exist`;
        next(err);
    }
});

app.use((req,res,next)=> {
    console.log('404 error handler called')
    const err = new Error();
    err.status = 404;
    err.message = `Ooops! Looks that the page you request doesn't exist`;
    next(err);
});

// app.use((err, req, res next) => {
//     if (err) {
//         console.log('Global error handler called', err);
//     }
//     if (err.status === 404) {
//         res.status(404).render('not-found', {err});
//     } else {
//         err.message = err.message || 'Ooops, looks like there is something wrong with the server';
//         res.status(err.status || 500).render('error', {err});
//     }
// }); 


app.listen(3000, () => {
    console.log('The app is running on port 3000');
});

