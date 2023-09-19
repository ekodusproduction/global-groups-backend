const dotEnv = require('dotenv')
dotEnv.config()





const jsonFormatData = (data) => {
  
  if (data.length != 0) {
    if (typeof data[0] !== 'undefined') {
      const row = data[0]
      return row
    } else if (typeof data === 'object') {
      return data
    } else {
      return []
    }
  } else {
    return []
  }
}

const titleToSlug = title => {
  let slug;

  // convert to lower case
  slug = title.toLowerCase();

  // remove special characters
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

  // replace spaces with dash symbols
  slug = slug.replace(/ /gi, "-");
  
  // remove consecutive dash symbols 
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');

  // remove the unwanted dash symbols at the beginning and the end of the slug
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
}

const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};


const validateAndProcessFile = (file, allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.svg'], size = 25) => {
  let errors = []
  const maxFileSize = size * 1024 * 1024; // 10 MB
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (!allowedFileTypes.includes(fileExtension)) {
    errors.push(`Invalid file type: ${fileExtension} for ${file?.name} Required type is ${JSON.stringify(allowedFileTypes)}`)
    return errors
    
  }
  if (file.size > maxFileSize) {
     errors.push(`File size ${Math.floor(file?.size/(1024*1024))} MB exceeds the limit: ${Math.floor(maxFileSize/(1024 * 1024))} MB for file ${file?.name}`)
     return errors
  
  }
 return errors
}


module.exports = { jsonFormatData,
  titleToSlug,
   imageFilter,
   validateAndProcessFile
 }


