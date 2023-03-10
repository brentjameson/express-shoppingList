const express = require("express");
const ExpressError = require("./expressError");
const router = new express.Router();
const items = require('./fakeDB');


// GET /items - this should render a list of shopping items.
// Here is what a response looks like:

// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]

router.get('/', function(req, res) {
    debugger
    console.log(res.json(items))
    return res.json(items)
})

// POST /items - this route should accept JSON data and add it to the shopping list.
// Here is what a sample request/response looks like:

// {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

router.post("/", function (req, res, next) {
    try {
      if (!req.body.name) throw new ExpressError("Name is required", 400);
      if (!req.body.price) throw new ExpressError("Price is required", 400);
      console.log(req.body, 'i am req body')
      const newItem = { name: req.body.name, price: req.body.price }
      items.push(newItem)
      return res.status(201).json({ name: newItem.name, price: newItem.price })
    } catch (e) {
      return next(e)
    }
  })


// GET /items/:name - this route should display a single item’s name and price.
// Here is what a sample response looks like:

// {“name”: “popsicle”, “price”: 1.45}

router.get("/:name", function (req, res) {
    console.log('****************************************')
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined){
        throw new ExpressError('Item not found', 404)
    }
    res.json({item: foundItem})
  })


// PATCH /items/:name, this route should modify a single item’s name and/or price.
// Here is what a sample request/response looks like:

// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

router.patch("/:name", function (req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) throw new ExpressError("Item not found", 404)
    if (!req.body.price) throw new ExpressError("Price is required", 400);

    foundItem.name = req.body.name
    foundItem.price = req.body.price
    
    res.json({item: foundItem})
})

// DELETE /items/:name - this route should allow you to delete a specific item from the array.

// Here is what a sample response looks like:

// {message: “Deleted”}


router.delete("/:name", function (req, res) {
    console.log('****************************************')
    const foundIndex = items.findIndex(item => item.name === req.params.name)
    if (foundIndex === -1){
        throw new ExpressError('Item not found', 404)
    }
    
    items.splice(foundIndex,1)

    res.json({message: "Deleted"})
  })


module.exports = router;