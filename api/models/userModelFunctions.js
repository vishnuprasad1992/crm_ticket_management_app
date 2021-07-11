const Users = require("../models/userModel");

const setRefreshJWT = (id,token) =>{
    return new Promise((resolve,reject)=>{
        try {
            const updateToken = Users.findByIdAndUpdate(id,{
                $set : {
                    "refreshToken.token" : token,
                    "refreshToken.addedAt" : Date.now()
                }
            },{new:true})
            .then((res) => resolve(res))
            .catch(err => reject(err))
        } catch (error) {
            reject(error),
            console.log(error);
        }
    })
}


const verifyUser = (_id,email) =>{
    return new Promise((resolve,reject)=>{
        try {
            // const gettingVerified = Users.findOne({_id,email})
            Users.findOneAndUpdate({_id,email},
               { $set : {
                    "isVerified" : true
                }
            },{new:true})
            .then((res) => resolve(res))
            .catch(err => reject(err))
        } catch (error) {
            reject(error),
            console.log(error);
        }
    })
}

module.exports = {
    setRefreshJWT,verifyUser
}