const pick = require('lodash/pick');
const omit = require('lodash/omit');
const Device = require('../model/device.model');
const DeviceStatusService = require('../services/deviceStatus.service');
const UserDevice = require('./userDevice.service');

// TODO: Need to safeguard with transaction control
const saveDevice = async (userId, device) => {
    const deviceStatus = {...pick(device, ['id', 'status'])};
    try{
        const savedDevice = await Device.create(device);
        const savedDeviceStatus = await DeviceStatusService.createOrUpdateDeviceStatus(deviceStatus);
        await UserDevice.addDeviceToUser(userId, device.id);        
        return {
            ...omit(savedDevice, ['status']),
            status: omit(savedDeviceStatus, ['userId']),
        };
    }catch(err){
        return {
            error: "Device duplicate entry...",
        }
    }
}

const updateDeviceStatus = async (deviceStatus) => {
    return await DeviceStatusService.createOrUpdateDeviceStatus(deviceStatus);
}

const removeDevice = async (userId, deviceId) => {
    const filter = {"deviceId": deviceId};
    const device = await Device.findOne(filter);
    await UserDevice.removeDeviceFromUser(userId, deviceId);
    const deviceStatus = await DeviceStatusService.getDeviceStatus(deviceId);
    deviceStatus.remove();
}

module.exports = {
    saveDevice,
    updateDeviceStatus,
    removeDevice,
}
