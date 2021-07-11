import axios from 'axios';


export const getAllTickets = async ()=>{

        try {
            const result = await axios.get("http://localhost:5000/api/tickets/", {
                headers: {
                    Authorization: sessionStorage.getItem("accessToken")
                }
            })
             return result;
        } catch (error) {
            return error
        }
}

export const getSingleTicket = async (id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await axios.get(`http://localhost:5000/api/tickets/${id}`, {
                headers: {
                    Authorization: sessionStorage.getItem("accessToken")
                }
            })
             resolve(result);
        } catch (error) {
            reject(error)
        }
    })
}

export const updateSingleTicket = async (id,conversationData)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await axios.put(`http://localhost:5000/api/tickets/${id}`,conversationData, {
                headers: {
                    Authorization: sessionStorage.getItem("accessToken")
                }
            })
             resolve(result.data);
        } catch (error) {
            reject(error)
        }
    })
}


export const closeSingleTicket = async (id,conversationData)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await axios.patch(`http://localhost:5000/api/tickets/close-ticket/${id}`,{}, {
                headers: {
                    Authorization: sessionStorage.getItem("accessToken")
                }
            })
             resolve(result.data);
        } catch (error) {
            reject(error)
        }
    })
}


export const addNewTicket = (formData)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await axios.post(`http://localhost:5000/api/tickets`,formData, {
                headers: {
                    Authorization: sessionStorage.getItem("accessToken")
                }
            })
             resolve(result.data);
        } catch (error) {
            reject(error)
        }
    })
}