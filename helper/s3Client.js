const {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");

const config = {
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
};

const S3 = new S3Client(config);

// const UploadFile = async (File, FileName) => {
//   try {
//     if (!File || !FileName) {
//       return { Error: "file and fileName not found", Success: false };
//     }
//     const Params = {
//       Bucket: process.env.BUCKET_NAME,
//       Key: FileName,
//       Body: File,
//       ContentType: "image/jpg,jpeg,png,ico",
//     };
//     const Command = new PutObjectCommand(Params);
//     const Response = await S3.send(Command);
//     if (Response.$metadata.httpStatusCode !== 200) {
//       return { Error: Response.$metadata, Success: false };
//     }
//     const ImageURl = `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${Params.Key}`;
//     return { Success: true, ImageURl: ImageURl };
//   } catch (Error) {
//     return Error;
//   }
// };

const UploadBase64Image = async (base64String) => {
  try {
    if (!base64String) {
      return { Error: "Base64 string not found", Success: false };
    }
    const base64Pattern = /^data:(image\/[a-z]+);base64,/;
    const match = base64String.match(base64Pattern);
    if (!match) {
      return { Error: "Invalid Base64 format", Success: false };
    }
    const fileType = match[1].split("/")[1];
    const base64Data = base64String.replace(base64Pattern, "");
    const binaryFile = Buffer.from(base64Data, "base64");
    const FileName = `image_${Date.now()}.${fileType}`;
    const Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: FileName,
      Body: binaryFile,
      ContentType: `image/${fileType}`,
    };
    const Command = new PutObjectCommand(Params);
    const Response = await S3.send(Command);

    console.log(Response);

    if (Response.$metadata.httpStatusCode !== 200) {
      return { Error: Response.$metadata, Success: false };
    }

    const ImageURl = `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${Params.Key}`;
    return { Success: true, ImageURl: ImageURl };
  } catch (Error) {
    return { Error: Error.message, Success: false };
  }
};

const GetFile = async (FileName) => {
  try {
    if (!FileName) {
      return { Error: "fileName not found", Success: false };
    }
    const Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: FileName,
    };
    const Command = new GetObjectCommand(Params);
    const Response = await S3.send(Command);
    // console.log(response);
    if (Response.$metadata.httpStatusCode !== 200) {
      return { Success: false, Error: Response.$metadata };
    }
    return {
      Success: true,
      Message: "File Get successfully",
      Data: Response.$metadata,
    };
  } catch (Error) {
    return Error;
  }
};

const DeleteFile = async (FileName) => {
  try {
    if (!FileName) {
      return { Error: "fileName not found", Success: false };
    }
    const Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: FileName,
    };
    const Command = new DeleteObjectCommand(Params);
    const Response = await S3.send(Command);
    console.log(Response);
    if (Response.$metadata.httpStatusCode !== 204) {
      return { Success: false, Error: Response.$metadata };
    }
    return { Success: true, Message: "File Removed successfully" };
  } catch (Error) {
    return Error;
  }
};

module.exports = { DeleteFile, GetFile, UploadBase64Image };
