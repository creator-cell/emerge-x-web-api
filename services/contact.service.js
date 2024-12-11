const { Contact } = require("../models");

const createContact = async (newsBody) => {
  return await Contact.create(newsBody);
};

const getContacts = async (id) => {
  return await Contact.findById(id);
};

const updateContact = async (id, updateBody) => {
  return await Contact.findByIdAndUpdate(id, updateBody, { new: true });
};

const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

module.exports = {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
};
