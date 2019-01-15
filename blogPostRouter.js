const express = require('express');
const router = express.Router();



const {BlogPosts} = require('./models');


BlogPosts.create(
  'If you are always trying to be normal, you will never know how amazing you can be' + '--Maya Angelou');
BlogPosts.create(
    'The Way Get Started Is To Quit Talking And Begin Doing.' +'--Walt Disney');
BlogPosts.create(
    'The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.' +'--Winston Churchill');
    
// send back JSON representation of all recipes
// on GET requests to root
router.get('/', (req, res) => {
  res.json(Recipes.get());
});


// when new recipe added, ensure has required fields. if not,
// log error and return 400 status code with hepful message.
// if okay, add new item, and return it with a status 201.
router.post('/', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['name', 'ingredients'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = Recipes.create(req.body.name, req.body.ingredients);
  res.status(201).json(item);
});

// Delete recipes (by id)!
router.delete('/:id', (req, res) => {
  Recipes.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.ID}\``);
  res.status(204).end();
});


router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['name', 'ingredients', 'id'];
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
  const updatedItem = Recipes.update({
    id: req.params.id,
    name: req.body.name,
    ingredients: req.body.ingredients
  });
  res.status(204).end();
})

module.exports = router;