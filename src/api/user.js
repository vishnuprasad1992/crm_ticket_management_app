import axios from 'axios';

export const userRegistration = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post("http://localhost:5000/api/auth/register",data);
            // if(!result && !result.data._id) return  reject("something went wrong")
            resolve(result.data)
        } catch (error) {
            reject(error)
        }
    })
}

export const loginUserDetails = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post("http://localhost:5000/api/auth/login", data)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const getUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAccessToken = sessionStorage.getItem("accessToken");
            if(!getAccessToken) return reject("Token not found")
            const result = await axios.get("http://localhost:5000/api/auth/", {
                headers: {
                    Authorization: getAccessToken
                }
            })
            if(!result && !result.data._id) return  reject("something went wrong")
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}


export const logout = async () =>{
    try {
        const accessToken = sessionStorage.getItem("accessToken")
        await axios.delete("http://localhost:5000/api/auth/logout",{
            headers:{
                Authorization : accessToken
            }
        })
    } catch (error) {
        console.log(error)
    }
}
// http://localhost:5000/api/tokens/

export const fetchAccessToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if(!refreshToken)  return reject("Token not found")
            const result = await axios.get("http://localhost:5000/api/tokens/", {
                headers: {
                    Authorization: refreshToken
                }
            })
            sessionStorage.setItem("accessToken", result.data);
            if(!result) return  reject("something went wrong")
            resolve(true)
        } catch (error) {
            if(error) {
                localStorage.removeItem("refreshToken")
            }
            reject(false)
        }
    })
}

export const userVerify = (id,email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.patch("http://localhost:5000/api/auth/verify",{id,email});
            resolve(result.data)
        } catch (error) {
            reject(error)
        }
    })
}
