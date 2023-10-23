const mongoose = require('mongoose');

const topics = new mongoose.Schema({
    topicName: String,
    topicDescription:String
});

const Topic = mongoose.model("Topic", topics)

module.exports = Topic
