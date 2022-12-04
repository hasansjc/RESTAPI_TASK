module.exports = function(err, req, res, next){
    //Logging the exception information.
    res.status(500).send("Internal server error !! Some;thing failed");
}