const config = require('config');
const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    const token = req.header('x-access-token')
    if(!token) return res.status(401).send("ERROR !! No access token provided")
    
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(400).send("bad Request")
    } 
}