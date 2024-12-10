const { DemoRequest } = require("../models");

const createDemoRequest = async (newsBody) => {
  return await DemoRequest.create(newsBody);
};

const getDemoRequests = async (id) => {
  return await DemoRequest.findById(id);
};

const updateDemoRequest = async (id, updateBody) => {
  return await DemoRequest.findByIdAndUpdate(id, updateBody, { new: true });
};

const deleteDemoRequest = async (id) => {
  return await DemoRequest.findByIdAndDelete(id);
};

module.exports = {
  createDemoRequest,
  getDemoRequests,
  updateDemoRequest,
  deleteDemoRequest,
};
