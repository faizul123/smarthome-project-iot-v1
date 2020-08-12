const Device = require('../model/device.model');

const saveDevice = async (device) => {
    return await Device.create(device);
}

const getDeviceByMacId =  async (macId) => {
    return Device.findById(macId);
}

const findByDevicesByUserId = async (userId, options={limit: 20}) => {
    const filter = { "userId": userId};
    return Device.find(filter).limit(options.limit);
}

module.exports.deviceService = {
    saveDevice,
    getDeviceByMacId,
    findByDevicesByUserId,
}
