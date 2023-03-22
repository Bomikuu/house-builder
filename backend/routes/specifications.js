const express = require('express');
const Specifications = require('../models/specifications');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.get('/', async (req, res) => {
  const specifications = await Specifications.find();
  res.json(specifications);
});

router.get('/:id', async (req, res) => {
  const specification = await Specifications.findById(req.params.id);
  res.json(specification);
});

router.post('/', upload.single('image'), async (req, res) => {
  const specification = new Specifications({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    image: req.file.buffer
  });

  await specification.save();
  res.json(specification);
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const specification = await Specifications.findById(req.params.id);

  specification.name = req.body.name;
  specification.type = req.body.type;
  specification.description = req.body.description;

  if (req.file) {
    specification.image = req.file.buffer;
  }

  await specification.save();
  res.json(specification);
});

router.delete('/:id', async (req, res) => {
  await Specifications.findByIdAndDelete(req.params.id);
  res.json({ message: 'Specification deleted' });
});

module.exports = router;