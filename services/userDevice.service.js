const { omit } = require('lodash');
const UserDevices = require('../model/userDevices.model');

const addDeviceToUser = async (userId, deviceId) => {
    const filter = {"userId": userId, devices: deviceId};
    const currentDevicesInUser = await UserDevices.findOne(filter);
    if(!!currentDevicesInUser){
        return await UserDevices.create({
            userId,
            devices: [deviceId],
        });
    }
    return currentDevicesInUser;
}

const removeDeviceFromUser = async (deviceId) => {
    const filter = {"userId": userId, devices: deviceId};
    const currentDevicesInUser = await UserDevices.findOne(filter);
    if(currentDevicesInUser) {
        const updateFilter = {"userId": userId};
        let index = currentDevicesInUser.devices.indexOf(deviceId);
        currentDevicesInUser.devices.splice(index, 1);
        UserDevices.updateOne(updateFilter,currentDevicesInUser);
    }
}

const getUserDevices = async (user) => {
    const filter = {"userId": user.id};
    const currentDevicesInUser = await UserDevices.findOne(filter);
    if(currentDevicesInUser){
        return {
            user,
            devices: omit(currentDevicesInUser, 'userId'),
        }
    }else {
        return {
            user,
            devices: [],
        }
    }
}

module.exports = {
    addDeviceToUser,
    removeDeviceFromUser,
    getUserDevices,
}
