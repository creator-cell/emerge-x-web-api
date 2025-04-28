const { Blog } = require("../models");
const { UploadBase64Image, DeleteFile } = require("../helper/s3Client.js");
const { default: mongoose } = require("mongoose");

const createBlog = async (newsBody) => {
  try {
    const {
      htmlBody,
      bannerImage,
      futureImages,
      title,
      description,
      mainDescription,
      authorName,
    } = newsBody;
    const bannerImageUrl = await UploadBase64Image(bannerImage);
    console.log(bannerImageUrl);
    const futureImagesUrl = await UploadBase64Image(futureImages);
    console.log(futureImagesUrl);
    return await Blog.create({
      htmlBody: htmlBody,
      bannerImage: bannerImageUrl?.ImageURl,
      futureImages: futureImagesUrl?.ImageURl,
      title: title,
      description: description,
      mainDescription: mainDescription,
      authorName: authorName,
    });
  } catch (err) {
    throw new Error(err.message || "Error create blog");
  }
};

const getBlogs = async (id) => {
  return await Blog.findById(id);
};

const getAllBlogs = async (limit, skip) => {
  return await Blog.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
};

const countBlog = async () => {
  return await Blog.countDocuments();
};

const updateBlog = async (id, updateBody) => {
  try {
    const {
      htmlBody,
      bannerImage,
      futureImages,
      description,
      mainDescription,
      title,
      authorName,
    } = updateBody;
    const blog = await Blog.findById(id);
    let newBannerImage = blog.bannerImage;
    let newFutureImages = blog.futureImages;
    if (bannerImage) {
      const image = await UploadBase64Image(bannerImage);
      newBannerImage = image.ImageURl;

      if (blog.bannerImage && blog.bannerImage.includes(".com/")) {
        await DeleteFile(blog.bannerImage.split(".com/")[1]);
      }
    }

    if (futureImages) {
      const image = await UploadBase64Image(futureImages);
      newFutureImages = image.ImageURl;

      if (blog.futureImages && blog.futureImages.includes(".com/")) {
        await DeleteFile(blog.futureImages.split(".com/")[1]);
      }
    }


    return await Blog.findByIdAndUpdate(
      id,
      {
        htmlBody: htmlBody || blog?.htmlBody,
        bannerImage: newBannerImage,
        futureImages: newFutureImages,
        title: title || blog?.title,
        description: description || blog?.description,
        mainDescription: mainDescription || blog?.mainDescription,
        authorName: authorName || blog?.authorName,
      },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message || "Error for update blog");
  }
};

const deleteBlog = async (id) => {
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      await DeleteFile(blog?.bannerImage?.split(".com/")[1]);
      await DeleteFile(blog?.futureImages?.split(".com/")[1]);
    }
    return await Blog.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message || "Error for delete blog");
  }
};

module.exports = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  countBlog,
};
