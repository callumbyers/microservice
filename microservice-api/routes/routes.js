const Router = require("koa-router");
const koaBody = require("koa-body");
const AWS = require("aws-sdk");
const uniqid = require("uniqid");

const TEMP_BUCKET = "tp-team-image";

AWS.config.update({ region: "us-east-2" });

const router = new Router();
const s3 = new AWS.S3();

router.get("/", async (ctx) => {
  ctx.body = "hello world";
});

const createS3PresignedPost = async (key) => {
  const params = {
    Bucket: TEMP_BUCKET,
    Expires: 60,
    Fields: {
      key,
    },
  };

  return new Promise((resolve, reject) => {
    s3.createPresignedPost(params, (err, url) => {
      if (err) {
        return reject(err);
      }

      resolve(url);
    });
  });
};

const createUrlRequest = async (key) => {
  const params = {
    Bucket: TEMP_BUCKET,
    Key: key,
    ResponseContentDisposition: "inline",
    ResponseContentType: "*",
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) {
        return reject(err);
      }

      resolve(url);
    });
  });
};

router.post("/file", koaBody(), async (ctx) => {
  const { fileName } = JSON.parse(ctx.request.body);
  const fileID = uniqid("FILE-");
  const s3Post = await createS3PresignedPost(`temp/${fileName}`);

  ctx.body = JSON.stringify({
    fileID,
    s3Post,
  });

  if (s3Post) {
    ctx.status = 200;
    ctx.message = "OKAY";
  } else {
    ctx.status = 500;
    ctx.message = "Could not create presigned data";
  }
});

router.post("/fileUrl", koaBody(), async (ctx) => {
  const key = JSON.parse(ctx.request.body).Key;
  const url = await createUrlRequest(key);

  ctx.body = JSON.stringify({
    url,
  });

  if (url) {
    ctx.status = 200;
    ctx.message = "OKAY";
  } else {
    ctx.status = 500;
    ctx.message = "Could not create S3 url";
  }
});

module.exports = {
  router,
};
