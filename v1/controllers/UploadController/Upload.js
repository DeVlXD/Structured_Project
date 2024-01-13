module.exports.uploadFile = async (err, req, res, next) => {
    try {
        // if (!req.file) throw new Error(constants.MESSAGES.UPLOADING_ERROR);
        if (!req.file) throw new Error(err);
        console.log(err);
        res.status(200);
        return res.json({ status: "success" });
    } catch (error) {
        next(error);
    }
};