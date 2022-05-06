const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
  // find all tags
  Tag.findAll(
    // be sure to include its associated Product data
    {
      include: {
        model: Product,
      }
    }
  )
  .then(tagData => res.json(tagData))
  .catch(err =>{
    console.log(err)
    res.status(500).json(err);
    });
});


// get one product
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne(
    {
      where: 
      {
        id: req.params.id
      },
      // be sure to include its associated Category and Tag data
      include: [{
        model: Product,
      },
    ]
    })
  .then(productData => res.json(productData))
  .catch(err =>{
    console.log(err)
    res.status(500).json(err);
    });
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(
    {
      tag_name: req.body.tag_name
    })
  .then((tagName) => {
    res.json(tagName)
  })
  .catch((err) => {
    res.json(err)
  })
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where:{
        id: req.params.id,
      },
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag)
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((deletedTag) => {
    res.json(deletedTag)
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

module.exports = router;
