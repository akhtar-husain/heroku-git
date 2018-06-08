const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = new express();

app.set('view engine', 'hbs');
app.use((req, res, next) => {
    const now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });
    next();
});
/* app.use((req, res, next) => {
    res.render('maintenance', {
        pageTitle: "Maintenance page"
    });
}); */
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: "Homepage",
        welcomeMessage: "Welcome express..."
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: "About page"
    });
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});