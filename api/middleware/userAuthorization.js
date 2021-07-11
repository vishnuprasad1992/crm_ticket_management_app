const { verifyToken } = require("../helpers/jwtHelpers");
const { getJWT,deleteJWT } = require("../helpers/redisHelper")

const userAuthorization = async (req, res, next) => {
        const { authorization } = req.headers;

        if(!authorization) return res.status(403).json({ message: "Forbidden" })

        const decoded = await verifyToken(authorization)
        if(!decoded){
            deleteJWT(authorization)
            return res.status(403).json({ message: "Forbidden" })
        }
        else{
            try {
                if (decoded.payload) {
                    const userID = await getJWT(authorization);
                    if (userID) {
                        req.userId = userID;
                        return next()
                    }
                     return res.status(403).json({ message: "Forbidden" })
                }  
            } catch (error) {
                console.log(error)
                return res.status(403).json({ message: "Forbidden" })
            }
        }
        return res.status(403).json({ message: "Forbidden" })
}

module.exports = {
    userAuthorization
}