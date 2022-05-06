const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll(
    {
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    }
  )
  .then(categoryData => res.json(categoryData))
  .catch(err =>{
    console.log(err)
    res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Category.findOne(
    {
      where: 
      {
        id: req.params.id
      },
      // be sure to include its associated Category and Tag data
      include: [{
        model: Product,
        attributes: ['id', 'product_name', "price", "stock", "category_id"]
      },
    ]
    })
  .then(productData => res.json(productData))
  .catch(err =>{
    console.log(err)
    res.status(500).json(err);
    });
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
  Category.update(req.body,{
      where:{
        id: req.params.id
      }
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
