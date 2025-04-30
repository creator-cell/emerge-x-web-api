
const { UploadBase64Image, DeleteFile } = require("../helper/s3Client");
const ContactCard = require("../models/contactCard.model");
const slugify = require('slugify')

const createContactCardService = async (contactCardBody) => {
  const photo = await UploadBase64Image(contactCardBody.photo);
  return await ContactCard.create({ ...contactCardBody, photo: photo?.ImageURl, slug: slugify(contactCardBody.name, { lower: true }) });
};

const getContactCardService = async (id) => {
  return await ContactCard.findById(id);
};

const getContactCardByNameService = async (slug) => {
  return await ContactCard.findOne({ slug });
};

const updateContactCardService = async (id, updateBody) => {
  const contactCard = await ContactCard.findById(id);
  let newPhoto = contactCard.photo;
  if (updateBody?.photo) {
    const image = await UploadBase64Image(updateBody?.photo);
    newPhoto = image.ImageURl;

    if (contactCard.photo && contactCard.photo.includes(".com/")) {
      await DeleteFile(contactCard.photo.split(".com/")[1]);
    }
  }
  return await ContactCard.findByIdAndUpdate(id, { ...updateBody, photo: newPhoto }, { new: true });
};

const deleteContactCardService = async (id) => {
  const card = await ContactCard.findById(id);
  if (card) {
    await DeleteFile(card?.photo?.split(".com/")[1]);
  }
  return await ContactCard.findByIdAndDelete(id);
};

const getAllContactCardService = async (limit, skip) => {
  return await ContactCard.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
};
const countContactCardService = async () => {
  return await ContactCard.countDocuments();
};

module.exports = {
  createContactCardService,
  getContactCardService,
  updateContactCardService,
  deleteContactCardService,
  getAllContactCardService,
  countContactCardService,
  getContactCardByNameService
};
