const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

// app.use((req,res,next) => {
//   res.render('maintenence.hbs');
//
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use(express.static(__dirname +'/public'));
app.use((req,res,next) => {
  var now = new Date().toString();
  // console.log(`${now}: ${req.method} ${req.url}`)
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log +'\n', (err) =>{
    if(err){
      console.log('unable to append File server.log');
    }
  } );
next();
});

app.get('/',(req,res) => {
  res.render('home.hbs', {
    Pagetitle: 'Welcome Page',
    welcomeMessage: 'welcome to my site',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    Pagetitle: 'About Page',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/projects',(req,res) => {
  res.render('projects.hbs', {
    Pagetitle: 'projects Page',
    // currentYear: new Date().getFullYear()
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
