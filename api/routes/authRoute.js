const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwtHelpers");
const { userAuthorization } = require("../middleware/userAuthorization");
const { setResetPin, getPinByEmailPin, updatePassword, deletePin } = require("../models/resetPin/resetPinModelFunctions");
const { emailProcessor, emailProcessorForUpdatePassword, newUserVerification } = require("../helpers/emailHelper");
const { reapeatPasswordValidation, updatePasswordValidation, newUserValidation } = require("../middleware/formValidation");
const { deleteJWT } = require("../helpers/redisHelper");
const { setRefreshJWT,verifyUser } = require("../models/userModelFunctions")


router.get("/", userAuthorization, async (req, res) => {
    const getUser = await Users.findById(req.userId);
    const { name, email, _id } = getUser
    res.json({ name, email, _id });
})

router.patch("/verify", async (req, res) => {
   const {id,email} = req.body;
   const result = await verifyUser(id,email);
   if(result.isVerified){
        return res.json({status:"success",message:"Your account has activated successfully"})
   }else{
       return res.json({status:"error",message:"Invalid Request"})
   }
})


router.post("/register", newUserValidation, async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await new Users({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address,
            company: req.body.company,
            password: hashPassword
        });
        const result = await newUser.save();
        if(result.isVerified === false && result._id){
            await newUserVerification(result.email,result._id,)
        }
        if (result){
             return res.status(200).json({ status: "success", message: "User created successfully, Verification Mail sent to your email,please check!", result })
            }
        return res.status(500).json({ status: "error", message: "user not created,please try again later" })
    } catch (error) {
        let message = "Unable to register user please try again later";
        console.log(error)
        res.json({ status: "error", message });
    }
})


router.post("/login", async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.json({ status: "error", message: "User or password is not correct" })
    }
    try {
        const logUser = await Users.findOne({ email: req.body.email })
        if (!logUser) return res.status(404).json({ status: "error", message: "User or password is not correct" })
        
        const comparePassword = await bcrypt.compare(req.body.password, logUser.password);
        if (!comparePassword) {
            return res.status(404).json({ status: "error", message: "User or password is not correct" })
        }
        if(!logUser.isVerified){
            return res.status(401).json({ status: "error", message: "Please verify Your Account" })
        }
        const accessToken = await createAccessJWT(logUser.email, logUser._id);
        const refreshToken = await createRefreshJWT(logUser.email, `${logUser._id}`);
        const result = await res.status(200).json({
            status: "success",
            message: "User Logged in Successfully",
            email: logUser.email,
            accessToken,
            refreshToken
        });

        if (!result) return res.status(404).json({ status: "error", message: "User or password is not correct" })


    } catch (error) {
        return res.json(error.message)
    }
})

router.post("/reset-password", reapeatPasswordValidation, async (req, res) => {

    const email = req.body.email;
    const user = await Users.findOne({ email });
    try {
        if (user && user._id) {
            try {
                const data = await setResetPin(email);
                const emailResult = await emailProcessor(email, data.pin)
                return res.status(200).json({ status: "success", message: "Password reset pin sent to the mail successfully", data })
            } catch (error) {
                return res.status(403).json({ status: "error", message: error.message })
            }
        }
        else {
            res.status(403).json({ status: "error", message: "forbidden" })
        }
    } catch (error) {
        console.log(error)
        res.status(403).json({ status: "error", message: error.message })
    }
})

router.patch("/reset-password", updatePasswordValidation, async (req, res) => {
    const { email, pin, newPassword } = req.body;
    const getPin = await getPinByEmailPin(email, pin);
    if (!getPin) {
        return res.status(404).json({ message: "invalid email or pin" })
    }
    const pinCreated = getPin.addedAt;
    const timeToExpire = 1;
    let expiryDate = pinCreated.setDate(pinCreated.getDate() + timeToExpire);
    expiryDate = new Date(expiryDate);
    const today = new Date();
    if (expiryDate < today) {
        return res.status(404).json({ message: "Pin expired Please request again" })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    const result = await updatePassword(email, hashedPassword);
    if (!result) {
        return res.status(404).json({ message: "Pin expired Please request again" })
    }
    await deletePin(pin);
    await emailProcessorForUpdatePassword(email);
    return res.status(200).json({ status: "success", message: "password updated successfully" })
})


router.delete("/logout", userAuthorization, async (req, res) => {
    const { authorization } = req.headers;
    const _id = req.userId;
    deleteJWT(authorization)
    // const getUser = await Users.findById(req.userId);
    const result = await setRefreshJWT(_id, "");
    if (result._id) {
        return res.json({ status: "success", message: "Loggedout successfully" });
    }
    return res.json({ status: "Error", message: " Unable to Logout" });
})

module.exports = router;