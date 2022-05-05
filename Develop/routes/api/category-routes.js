const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Tag.findAll(
    // be sure to include its associated Products
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  )
  .then(tagData => res.json(tagData))
  .catch(err =>{
    console.log(err)
    res.status(500).json("an error occured", err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    // be sure to include its associated Products
    include: [{
      model: Product
    }]
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((categoryName) => {
    res.json(categoryName)
  })
  .catch((err) => {
    res.json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where:{
        id: req.params.book_id,
      },
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory)
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((deletedCategory) => {
    res.json(deletedCategory)
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

module.exports = router;
