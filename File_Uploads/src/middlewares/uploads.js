const path = require('path');
const multer=require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,`../${req.params.type}`))
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrefix+"-"+file.originalname);
    }
  });

  const fileFilter =(req,file,cb)=>{
      if(file.mimetype==="image/jpeg" || file.mimetype==="image/png"){
          cb(null,true);
      }else{
          cb(null,false);
      }
  }
  
const upload=multer({
    storage,
    fileFilter,
    limits:{
        fileSize:1024 * 1024 * 5,
    },
})

module.exports = upload;