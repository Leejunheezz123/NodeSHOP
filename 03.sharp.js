const path = require("path");
const sharp = require("sharp");
const { absPath } = require("./modules/util");

const files = [
  "220114_6d26ac09-ef78-4daf-b753-ea56ea5d9313.png",
  "220114_c843d4d9-670f-4c73-a953-c8fb27310d52.jpg",
  "220114_8a4594d0-e50a-46a9-a152-9d827d10c04f.jpg",
  "220114_7504b35a-29b6-4275-a011-670e12eceeda.jpg",
  "220114_b5bc7898-8702-4bc1-b986-664ce75a32c7.jpg",
];

async function start() {
  for (let v of files) {
    let loc = path.join(__dirname, "storages", v.split("_")[0], "thumb");
    v.thumb = await sharp(absPath(v))
      .resize(200)
      .jpeg({ mozjpeg: true })
      .toFile(path.join(loc, v));
  }
}

start();
