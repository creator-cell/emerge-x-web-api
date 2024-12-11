function HandleError(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        return res.status(401).json({ Message: "The user is not authorization" });
    }

    if (err.name === "ValidationError") {
        return res.status(401).json({ Message: err });
    }
    console.log(err);
    return res.status(500).json(err);
}

module.exports = HandleError;
