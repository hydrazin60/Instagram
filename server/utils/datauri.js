import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
  try {
    // Ensure file and its properties are defined
    if (!file || !file.originalname || !file.buffer) {
      throw new Error("Invalid file object");
    }

    // Get the file extension
    const extName = path.extname(file.originalname).toString();

    // Generate and return the Data URI
    return parser.format(extName, file.buffer).content;
  } catch (error) {
    console.error("Error generating Data URI:", error);
    throw error;
  }
};

export default getDataUri;

// import dataUriParser from "datauri/parser.js";
// import path from "path";
// const parser = new dataUriParser();
// const getdataUri = (file) => {
//   const extName = path.extname(file.originalname).toString();
//   return parser.format(extName, file.buffer).content;
// };

// export default getdataUri
