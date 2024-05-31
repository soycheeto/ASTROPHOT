const express = require('express');
const path = require('path');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

// use EJS as the templating engine for rendering views
app.set('view engine', 'ejs');

// setting directory where view files are located by creating an absolute path with root dir and views dir
app.set('views', path.join(__dirname, 'views'));


//middleware functions are funcs that have access to the program's req, res and the next middleware in the req-res cycle

// Serve static files from the 'public' directory
//static() is a middleware function from the express module
// any file in the 'public' dir can be accessed by the client via a url
// static files do not need to be processed
app.use(express.static(path.join(__dirname, 'public')));

// mounts the weatherRoutes middleware on the root path `/`
// any requests to paths starting with `/` will by hanled by weatherRoutes middleware
// weatherRoutes module defines routing logic for handling different endpoints of weather data
app.use('/', weatherRoutes);

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
