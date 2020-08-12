const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    deviceName:{
        type: String,
        required: true,
        trim: true
    },
    model:{
        type: String,
        trim:true
    },
    deviceMacId: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Device', DeviceSchema);
