const { News } = require("../models");

const createNews = async (newsBody) => {
  const { htmlBody, bannerImage, futureImages, Images, title } = newsBody;
  // const bannerImageUrl = await UploadBase64Image(bannerImage);
  // let futureImagesUrl = await UploadBase64Image(futureImages);
  // let ImagesURl = [];
  // for (let index = 0; index < ImagesURl.length; index++) {
  //   const imageUrl = await UploadBase64Image(ImagesURl[index]);
  //   ImagesURl.push(imageUrl.ImageURl);
  // }

  return await News.create(newsBody);

  // return await News.create({
  //   htmlBody: htmlBody,
  //   bannerImage: "https://picsum.photos/300/200",
  //   futureImages: "https://picsum.photos/300/200",
  //   Images: [
  //     "https://picsum.photos/300/200",
  //     "https://picsum.photos/300/200"
  //   ],
  //   title: title
  // });
};

const getNews = async (id) => {
  return await News.findById(id);
};

const updateNews = async (id, updateBody) => {
  return await News.findByIdAndUpdate(id, updateBody, { new: true });
};

const deleteNews = async (id) => {
  return await News.findByIdAndDelete(id);
};

module.exports = {
  createNews,
  getNews,
  updateNews,
  deleteNews,
};
