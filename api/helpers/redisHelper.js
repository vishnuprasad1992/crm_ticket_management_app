const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);


const setJWT = (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            return client.set(key, value, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res);
            })
        } catch (error) {
            return reject(error)
        }
    });
}


const getJWT = (key) => {
    return new Promise((resolve, reject) => {
        try {
            return client.get(key, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res);
            })
        } catch (error) {
            return reject(error)
        }
    });
}

const deleteJWT = (key) => {
    try {
        client.del(key)
    } catch (error) {
        conssole.log(error)
    }
}


module.exports = {
    setJWT,
    getJWT,
    deleteJWT
}