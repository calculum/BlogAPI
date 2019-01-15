const express = require('express');
const router = express.Router();



const {BlogPosts} = require('./models');


BlogPosts.create(
  'If you are always trying to be normal, you will never know how amazing you can be' + '--Maya Angelou');
BlogPosts.create(
    'The Way Get Started Is To Quit Talking And Begin Doing.' +'--Walt Disney');
BlogPosts.create(
    'The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.' +'--Winston Churchill');
    

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});



router.post('/', (req, res) => {
  
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Please enter \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});

// Delete post (by id)!
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.id}\``);
  res.status(204).end();
});


router.put('/:id', (req, res) => {
  const requiredFields = ['id', 'title', 'content','author', 'publicationDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating shopping list item \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    pulicationDate: req.body.pulicationDate
  });
  res.status(204).end();
})

module.exports = router;