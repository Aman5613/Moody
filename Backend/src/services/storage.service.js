var ImageKit = require("imagekit");

// var imagekit = new ImageKit({
//     publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
//     privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
//     urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
// });




var imagekit = new ImageKit({
  publicKey: "public_631+e128gPQYHdgLFqJWql0rx5Q=",
  privateKey: "private_WI+Fu1lMgFTCfMoZ75fpbqcYBo4=",
  urlEndpoint: "https://ik.imagekit.io/6i2qiqf2n",
});

function uploadFile(file) {

    // file? console.log("file here") : console.log("file is not here");
    // console.log(file);
    
    // console.log(process.env.IMAGEKIT_PUBLIC_KEY);
    
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer,
        fileName: file.originalname,
      },
      (error, result) => {
        error ? reject(error) : resolve(result);
      }
    );
  });
}

module.exports = uploadFile;
