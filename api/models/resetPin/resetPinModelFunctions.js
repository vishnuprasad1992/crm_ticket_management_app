const resetPin = require("./resetPinModel");
const Users = require("../userModel");

const randGenerator = (len) =>{
    let pin = '';
    for (let i = 0; i < len; i++) {
        pin += Math.floor(Math.random()*10);
    }
    return pin;
}
const setResetPin = (email) =>{
        try {
            return new Promise((resolve,reject)=>{
                const pin = new resetPin({
                    email,
                    pin:randGenerator(6)
                });
                pin.save()
    
                .then((data)=>resolve(data))
                .catch(err=> reject(error))
                    
                })
            }
        catch (error) {
            console.log(error)
        }
}


const getPinByEmailPin = async (email,pin)=>{
    try {
        const getPin = await resetPin.findOne({email,pin})
        return getPin;        
    } catch (error) {
        console.log(error)
    }
}


const updatePassword = (email,password) =>{
    return new Promise((resolve,reject)=>{
        try {
            const updatepass = Users.findOneAndUpdate(email,{
                $set : {
                    "password" : password,
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


const deletePin = async (pin) =>{
    try {
        await resetPin.findOneAndDelete(pin)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    setResetPin,
    getPinByEmailPin,
    updatePassword,
    deletePin
}