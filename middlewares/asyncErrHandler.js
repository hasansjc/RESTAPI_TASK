module.exports = function (handler){
    return async function(req, res, next){
        try {
            await handler(req,res,next);
        } catch (error) {
            next(error)
        }
    }
}