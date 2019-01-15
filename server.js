const express = require('express');
const morgan = require('morgan');

const app = express();

const blogPostRouter = require('./blogPostsRouter');

app.use(morgan('common'));

app.use(express.json());

// when requests come into `/shopping-list` or
// `/recipes`, we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
app.use('/blog-posts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});