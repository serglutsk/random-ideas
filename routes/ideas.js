const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

//Get requests
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({success: true, data: ideas});
    } catch (error) {
        res.status(500).json({success: false, error: 'Something went wrong'})
    }

});
router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({success: true, data: idea});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something went wrong'})
    }
});

//Post requests
router.post('/', async (req, res) => {
    const idea = new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username
    });

    try {
        const savedIdea = await idea.save();
        res.json({success: true, data: savedIdea});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something went wrong'})
    }

});
router.put('/:id', async (req, res) => {
    try {
        const idea =
            await Idea.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        text: req.body.text,
                        tag: req.body.tag,
                    }
                }
            );

        res.json({success: true, data: idea});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something went wrong'})
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const idea = await Idea.findByIdAndDelete(req.params.id);
        res.json({success: true, data: idea});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something went wrong'})
    }

});

module.exports = router;
