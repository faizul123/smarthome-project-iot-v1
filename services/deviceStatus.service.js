const DeviceStatusSchema = require('../model/DeviceStatus.model');

const createOrUpdateDeviceStatus = async (deviceStatus) => {
    const filter = {deviceId: deviceStatus.deviceId};
    const status = await DeviceStatusSchema.findOneAndUpdate(filter, deviceStatus, {
        new: true,
        upsert: true,
    });
    return status;
};

const getDeviceStatus = async (deviceId) => {
    const filter = {"deviceId": deviceId};
    const deviceStatus = await DeviceStatusSchema.findOne(filter);
    if(deviceStatus){
        return deviceStatus;
    }else {
        throw new Error(`${deviceId} is not found`);
    }
}

module.exports = {
    createOrUpdateDeviceStatus,
    getDeviceStatus
}