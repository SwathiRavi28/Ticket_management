const router = require('express').Router();

// agent Model
const agent = require('../models/agent.model');

// CREATE
router.route('/create').post((req, res) => {
    const name = req.body.name;

    const newagent = new agent({
    	name,
    });

    newagent.save()
        .then(() => res.json('agent successfully created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// READ
router.route('/').get((req, res) => {
    agent.find()
        .then(agents => res.json(agents))
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
router.route('/:id').delete((req,res) => {
agent.findByIdAndDelete(req.params.id)
    .then(ticket => res.json('agent deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

