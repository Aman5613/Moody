import ImageKit from "imagekit";

// var imagekit = new ImageKit({
//     publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
//     privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
//     urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
// });




var imagekit = new ImageKit({
  publicKey: "public_Yu427TLvjC2Jd7Hw5WNwlDk6LOE=",
  urlEndpoint: "https://ik.imagekit.io/aman5613",
  privateKey: "private_AB02AvOmoJGJh/4fjxgDly9aTdA=",
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
