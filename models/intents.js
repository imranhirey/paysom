const { default: axios } = require("axios")
const { isauthenticated } = require("../providers/authprofider")

class Intents{
    // check if the user is authenticated to use the api 
    // if not authenticated then return error message
    // if authenticated then perform the action that the user wants to perform

    // create intent
    createintent = async({reason,amount,surl,furl})=>{ // surl is the success url and furl is the failure url
        let authenticated=await isauthenticated()
        if(!authenticated){
            throw new Error('You are not authenticated to use this api please setup your keys')
        }
        else{
            try {
                let res = await axios.post(`http://localhost:5500/api/intents/create/${authenticated}`,{
                    reason:reason,
                    amount:amount,
                    surl:surl,
                    furl:furl
                })
                return res.data
            } catch (error) {
                return error.response
            }
            
        }
        
    }
    // track intent
    trackintent = async(intentid)=>{
        let authenticated=await isauthenticated()
        if(!authenticated){
            throw new Error('You are not authenticated to use this api please setup your keys')
        }
        else{
            try {
                let res = await axios.post(`http://localhost:5500/api/intents/getstatus/${authenticated}`,{
                    intentid:intentid
                })
                return res.data
            } catch (error) {
                return error.response
            }}}
        
    // get intent info
    getall = async()=>{
        let authenticated=await isauthenticated()
        if(!authenticated){
            throw new Error('You are not authenticated to use this api please setup your keys')
        }
        else{
            try {
                let res = await axios.post(`http://localhost:5500/api/intents/getall/${authenticated}`)
                return res
            } catch (error) {
                return error.response
            }
            
        }
        

    }
}
module.exports=Intents