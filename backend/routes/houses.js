const express = require('express');
const House = require('../models/houses');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { foundationType, size, floorCount, roomSpecs } = req.body;
    const house = new House({
      foundationType,
      size,
      floorCount,
      roomSpecs,
    });
    await house.save();
    res.json(house);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router