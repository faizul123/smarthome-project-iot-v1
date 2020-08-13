const httpStatus = require('http-status');
const get = require('lodash/get');
const authService = require('../services/user.services');
const deviceService = require('../services/device.service');
const userDeviceService = require('../services/userDevice.service');
const deviceStatusService = require('../services/deviceStatus.service');

const getUserId = (res) => get(res, 'locals.userId', '');

const saveDevice = async (req, res) => {
  const device = get(req, 'body', {});
  const userId = getUserId(req);
  const savedDevice = await deviceService.saveDevice(userId, device);
  res.status(httpStatus.OK).send({ ...savedDevice });
};

const removeDevice = async (req, res) => {
  const deviceId = get(req, 'params.deviceid', '');
  const userId = getUserId(res);
  await deviceService.removeDevice(userId, deviceId);
  res.status(httpStatus.OK).send({message: "removed successfully"});
}

const getUserDevices = async (req, res) => {
    const userId = getUserId(res);
    const currentUser = await authService.getUserById(userId);
    const data = await userDeviceService.getUserDevices(currentUser);
    res.status(httpStatus.OK).send({...data});
}

const deviceStatusChange = async (req, res) => {
  const deviceStatus = get(req, 'body', {});
  return await deviceStatusService.createOrUpdateDeviceStatus(deviceStatus);
}

module.exports = {
    saveDevice,
    removeDevice,
    getUserDevices,
    deviceStatusChange,
};