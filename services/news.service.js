const { News } = require("../models");
const { DeleteFile, UploadBase64Image } = require("../helper/s3Client");

const createNews = async (newsBody) => {
  try {
    const {
      heading,
      mainDescription,
      description1,
      description2,
      finalDescription,
      heroBanner,
      featureImage,
      subFeatureImage1,
      subFeatureImage2,
    } = newsBody;
    const heroBannerUrl = heroBanner ? await UploadBase64Image(heroBanner) : "";
    const featureImageUrl = featureImage ? await UploadBase64Image(featureImage) : "";
    const subFeatureImage1Url = subFeatureImage1 ? await UploadBase64Image(subFeatureImage1) : "";
    const subFeatureImage2Url = subFeatureImage2 ? await UploadBase64Image(subFeatureImage2) : "";
    console.log(heroBannerUrl, featureImageUrl);
    return await News.create({
      heading: heading,
      mainDescription: mainDescription,
      description1: description1,
      description2: description2,
      finalDescription: finalDescription,
      heroBanner: heroBannerUrl?.ImageURl,
      featureImage: featureImageUrl?.ImageURl,
      subFeatureImage1: subFeatureImage1Url?.ImageURl,
      subFeatureImage2: subFeatureImage2Url?.ImageURl,
    });
    // return await News.create(newsBody);
  } catch (error) {
    throw new Error(error.message || "Error for create news");
  }
};

const getAllNews = async (limit, skip) => {
  return await News.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
};

const countNews = async () => {
  return await News.countDocuments();
};

const getNews = async (id) => {
  return await News.findById(id);
};

const updateNews = async (id, updateBody) => {
  try {
    const {
      heading,
      mainDescription,
      description1,
      description2,
      finalDescription,
      heroBanner,
      featureImage,
      subFeatureImage1,
      subFeatureImage2,
    } = updateBody;
    const news = await News.findById(id);
    let newHeroBanner = news.heroBanner;
    let newFeatureImage = news.featureImage;
    let newSubFeatureImage1 = news.subFeatureImage1;
    let newSubFeatureImage2 = news.subFeatureImage2;
    if (heroBanner) {
      const image = await UploadBase64Image(heroBanner);
      newHeroBanner = image.ImageURl;
      await DeleteFile(news.heroBanner?.split(".com/")[1]);
    }
    if (featureImage) {
      const image = await UploadBase64Image(featureImage);
      newFeatureImage = image.ImageURl;
      await DeleteFile(news.featureImage?.split(".com/")[1]);
    }
    if (subFeatureImage1) {
      const image = await UploadBase64Image(subFeatureImage1);
      newSubFeatureImage1 = image.ImageURl;
      await DeleteFile(news.subFeatureImage1?.split(".com/")[1]);
    }
    if (subFeatureImage2) {
      const image = await UploadBase64Image(subFeatureImage2);
      newSubFeatureImage2 = image.ImageURl;
      await DeleteFile(news.subFeatureImage2?.split(".com/")[1]);
    }

    return await News.findByIdAndUpdate(
      id,
      {
        heading: heading || news.heading,
        mainDescription: mainDescription || news.mainDescription,
        description1: description1 || news.description1,
        description2: description2 || news.description2,
        finalDescription: finalDescription || news.finalDescription,
        heroBanner: newHeroBanner,
        featureImage: newFeatureImage,
        subFeatureImage1: newSubFeatureImage1,
        subFeatureImage2: newSubFeatureImage2,
      },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message || "Error for update news");
  }
};

const deleteNews = async (id) => {
  try {
    const news = await News.findById(id);
    if (news) {
      await DeleteFile(news.heroBanner?.split(".com/")[1]);
      await DeleteFile(news.featureImage?.split(".com/")[1]);
      await DeleteFile(news.subFeatureImage1?.split(".com/")[1]);
      await DeleteFile(news.subFeatureImage2?.split(".com/")[1]);
    }
    return await News.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message || "Error for Delete news");
  }
};

module.exports = {
  createNews,
  getNews,
  updateNews,
  deleteNews,
  getAllNews,
  countNews,
};
