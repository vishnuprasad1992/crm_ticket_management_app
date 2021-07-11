const express = require("express");
const router = express.Router();
const { verifyRefreshToken, createAccessJWT } = require("../helpers/jwtHelpers");
// const { deleteJWT } = require("../helpers/redisHelper");

const Users = require("../models/userModel")


router.get("/", async (req, res) => {
    const { authorization } = req.headers;
    const decoded = await verifyRefreshToken(authorization);
    if (!decoded) {
        return res.status(403).json({ status: "failed", message: "Forbidden" })
    }
    else{
        const email = decoded.payload;
        const getUserProfile = await Users.findOne({ email });
        const dbRefreshToken  = getUserProfile.refreshToken.token;
        let timeToExpire = getUserProfile.refreshToken.addedAt;
        timeToExpire = timeToExpire.setDate(timeToExpire.getDate() + +process.env.EXPIRY_DURATION);
        timeToExpire = new Date(timeToExpire)
        const today = new Date();
        if ( dbRefreshToken !== authorization && timeToExpire < today) {
            return res.status(403).json({ status: "failed", message: "Forbidden" })
        }
        const accessToken = await createAccessJWT(email, getUserProfile._id.toString());
        res.json(accessToken)
    }
})


module.exports = router;
