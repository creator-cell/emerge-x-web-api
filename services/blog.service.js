const { Blog } = require("../models");
const { UploadBase64Image } = require("../helper/s3Client.js");
const { default: mongoose } = require("mongoose");

const createBlog = async (newsBody) => {
  try {
    const { htmlBody, bannerImage, futureImages, Images, title } = newsBody;
    // const bannerImageUrl = await UploadBase64Image(bannerImage);
    // let futureImagesUrl = await UploadBase64Image(futureImages);
    // let ImagesURl = [];
    // for (let index = 0; index < ImagesURl.length; index++) {
    //   const imageUrl = await UploadBase64Image(ImagesURl[index]);
    //   ImagesURl.push(imageUrl.ImageURl);
    // }
    return await Blog.create(newsBody);
    // return await Blog.create({
    //   htmlBody:htmlBody,
    //   bannerImage: "https://picsum.photos/300/200",
    //   futureImages: "https://picsum.photos/300/200",
    //   Images: [
    //     "https://picsum.photos/300/200",
    //     "https://picsum.photos/300/200"
    //   ],
    //   title:title
    // });
  } catch (err) {
    throw new Error(err.message || "Error create blog");
  }
};

const getBlogs = async (id) => {
  return await Blog.findById(id);
};

const getAllBlogs = async (limit, skip) => {
  return await Blog.find().limit(limit).skip(skip);
};

const countBlog = async () => {
  return await Blog.countDocuments();
};

const updateBlog = async (id, updateBody) => {
  return await Blog.findByIdAndUpdate(id, updateBody, { new: true });
};

const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

module.exports = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  countBlog,
};
