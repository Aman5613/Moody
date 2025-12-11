import ImageKit from "imagekit";

// var imagekit = new ImageKit({
//     publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
//     privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
//     urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
// });




// you can get these keys from your ImageKit dashboard
var imagekit = new ImageKit({
  publicKey: "",
  urlEndpoint: "",
  privateKey: "",
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

export default uploadFile;
