const { default: axios } = require("axios")
const { Authenticate, authenticate } = require("../providers/authprofider")
// genearte function randomid with 11 characters

let checkkeys = async(publishkey,privatekey)=>{
    if(privatekey==''||publishkey==''){
        throw new Error('Privatekey and publishkey are required')
    }
    else{
      try {
        let res = await axios.post(`http://localhost:5500/keys/${publishkey}`,{
          secretkey:privatekey
        })
        // saver the authid in the authid.txt file
        authenticate(res.data.token,publishkey)
        
        return res.data
        
        
      } catch (error) {
        return error.response
        
      }
    
    }
  

}
module.exports = {
    checkkeys
}