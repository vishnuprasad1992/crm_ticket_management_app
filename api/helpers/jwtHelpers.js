const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const { setJWT } = require("./redisHelper");
const { setRefreshJWT } = require("../models/userModelFunctions")


const createAccessJWT =  (payload, id) => {
    return new Promise(async(resolve,reject)=>{
        try {
            const accessJWT = await jwt.sign({ payload },
                process.env.JWT_ACCESS_TOKEN_KEY,
                { expiresIn: "15m" }
            );
            await setJWT(accessJWT, id.toString());
            resolve(accessJWT);
    
        } catch (error) {
            reject(error)
        }
    })
}

const verifyToken = (userJwt) => {
    return new Promise(async(resolve, reject) => {
        try {
            const decoded = await jwt.verify(userJwt, process.env.JWT_ACCESS_TOKEN_KEY)
            resolve(decoded);
        } catch (error) {
            reject(error)
        }
    })
}

const verifyRefreshToken = (userRefreshJwt) => {
    try {
        const decoded = jwt.verify(userRefreshJwt, process.env.JWT_REFRESH_TOKEN_KEY);
        if (!decoded) {
            return ({ message: "forbidden" })
        }
        return decoded;
    } catch (error) {
        console.log(error.message)
    }
}


// const verifyRefreshToken = (userRefreshJwt) =>{
//     return new Promise((resolve,reject)=>{
//         try {

//             const decoded = jwt.verify(userRefreshJwt,process.env.JWT_REFRESH_TOKEN_KEY);
//             if(!decoded){
//                 return reject({message:"forbidden"})
//             }
//             return resolve(decoded);
//         } catch (error) {

//            reject(error.message)
//         }
//     })
// }


const createRefreshJWT = async (payload, id) => {
    try {
        const refreshJWT = await jwt.sign({ payload },
            process.env.JWT_REFRESH_TOKEN_KEY,
            { expiresIn: "30d" }
        );
        await setRefreshJWT(id, refreshJWT)
        return refreshJWT;

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createAccessJWT,
    createRefreshJWT,
    verifyToken,
    verifyRefreshToken
}