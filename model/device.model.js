const mongoose = require('mongoose');
const toJSON = require('./toJSON.plugin');

const DeviceSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    deviceName:{
        type: String,
        required: true,
        trim: true
    },
    model:{
        type: String,
        trim:true
    },
    commands: [
        {
            name: {
                type: String,
                trim:true,
            },
            valueType: {
                type: String,
                trim: true
            },
            value: mongoose.Mixed,
        }
    ]
});

DeviceSchema.plugin(toJSON);

module.exports = mongoose.model('Device', DeviceSchema);
