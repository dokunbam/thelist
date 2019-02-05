const multer = require('multer'); 


const multerConfig = {
    storage: multer.diskStorage({
      //setup where the user's file will go
      destination: function(req, file, next){
        next(null, './public/images');
      },
      //then give the file a unique name here
      filename: function(reg, file, next){
        console.log(file);
        const ext = file.mimetype.split('/')[1];
        //next(null, file.originalname + '-' + Date.now() + '.'+ext)
        //next(null, Date.now() + '-' + file.originalname)
        next(null, file.originalname)
      }
    }),
    //a means of ensuring only images are uploaded.
    fileFilter: function(req, file, next){
      if(!file){
        next();
      }
      const image = file.mimetype.startsWith('image/');
      if(image){
        
        console.log('photo uploaded ');
        next(null, true);
      }else{
        console.log('file not supported');
    
        return next();
      }
    }
  }

  module.exports = multerConfig;