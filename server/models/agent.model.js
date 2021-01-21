const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const agentSchema = new Schema({
    name: { type: String, required: true,},
}, {
    timestamps: true,
});

const agent = mongoose.model('agent', agentSchema);

module.exports = agent;
