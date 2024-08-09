export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const autherId = req.id
    if(!caption && !image){ 
      return res.status(400).json({
        message: "All fields are required",
        error: true,
      });
    }

    


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
};
