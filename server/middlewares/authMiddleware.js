const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).send({
                    sucess: false,
                    messege:'Auth Failed'
                })

            } else {
                req.body.existingUserId = decoded.existingUserId;
                next();
            }
        });
        
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            sucess: false,
            error,
            messege:'Auth Failed'
        })
    }
    
}