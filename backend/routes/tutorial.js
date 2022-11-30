const express = require("express");
const router = express.Router();

const _ = require("lodash");
const { Tutorial, validate } = require("../models/tutorial");

const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

// return all tutorials
router.get("/", async (req, res) => {
    const tutorials = await Tutorial.find().sort("title");
    res.send(tutorials);
});

// post a new tutorial
router.post("/", async (req, res) => {
    // validate input
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let tutorial = new Tutorial({
        title: req.body.title,
        contents: req.body.contents,
    });
    tutorial = await tutorial.save();
    res.send(tutorial);
});

// edit tutorial
router.put("/:id", async (req, res) => {
    // validate input
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // update tutorial title
    let tutorial = await Tutorial.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
        },
        { new: true }
    );

    if (!tutorial) return res.status(404).send("There are no project with the given id");

    // update tutorial content
    if (req.body.content) {
        tutorial.contents.push(req.body.content)
    }
    await tutorial.save();
    res.send(tutorial);
});


// delete a content: {header, detail} of a tutorial by its id
router.put("/content/:id/", async (req, res) => {
    let tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).send("There are no tutorials with the given ID");

    const index = tutorial.contents.findIndex(content => content._id.toString() === req.body.id.toString())
    if (index === -1) return res.status(404).send("There are no contents with the given ID in this project");
    tutorial.contents.splice(index, 1);
    await tutorial.save();
    res.send(tutorial);
})


// delete specific tutorial
router.delete("/:id", [auth, admin], async (req, res) => {
    let tutorial = await Tutorial.findByIdAndDelete(req.params.id);
    if (!tutorial) return res.status(404).send('Does not exist tutorial with a given ID');
    res.send(tutorial);
})


// get specific tutorial
router.get('/:id', async (req, res) => {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).send('There are no tutorial with the given ID');
    res.send(tutorial);
})


module.exports = router;
