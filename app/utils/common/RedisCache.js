const Redis = require('redis')
const Bluebird = require('bluebird')
const dotEnv = require('dotenv')
Bluebird.promisifyAll(Redis)
    dotEnv.config()
const cacheConnection = Redis.createClient({
  // rediss for TLS
  url:
        'rediss://' +
        process.env.REDISCACHEHOSTNAME +
        ':' +
        process.env.REDISPORT,
  password: process.env.REDISCACHEKEY
})
cacheConnection.on('connect', function () {
  console.log('Connected!')
})

cacheConnection.on('error', function (err) {
  console.error(err)
})

const redisClient = (key, result) => {
  try {
    cacheConnection.set(key, JSON.stringify(result))
  } catch (error) {
    console.log(error.message)
  }
}
const getRedisClient = async (key) => {
    try {
        const result = await cacheConnection.getAsync(key);
        if (result == null) {
            return null;
        } else {
            return JSON.parse(result);
        }
    } catch (err) {}
};
const getRedisClientForCheck = async (key) => {
    try {
        const result = await cacheConnection.getAsync(key);
        let returnValue = false;
        if (result == null) {
            return returnValue;
        } else {
            returnValue = true;
            return returnValue;
        }
    } catch (err) {}
};
const deleteRedisClient =  (key) => {
    try {
        key.map(async (redisKey) => {
            let value = await getRedisClientForCheck(redisKey)
            if (value === true){
                cacheConnection.del(redisKey, function (err,reply) {
                    console.log("Redis Del", reply);
                });
            }else{
                return null;
            }
        });
    } catch (err) {}
};

const expiry=(key,result)=>{
    try {
        cacheConnection.set(key, JSON.stringify(result),'EX', 60*60*25,()=>{
            console.log("failure")
        })
      } catch (error) {
        console.log(error.message)
      }
}
module.exports = { redisClient, getRedisClient, deleteRedisClient,expiry };

