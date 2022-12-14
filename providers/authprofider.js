// check keys in authid.txt file
// if the authid is not there then throw error
// if the authid is there then check the token in the authid.txt file
const { default: axios } = require('axios')
let fs=require('fs')
let authenticate=(token,publishkey)=>{
    console.log(token)
    // save the token and the publish key in auth.txt inside of profiders folder
try {
    // create auth folder if it is not there
    if(!fs.existsSync(__dirname+'/auth')){
        fs.mkdirSync(__dirname+'/auth')
    }

    fs.writeFileSync(__dirname+`/auth/auth.txt`,`${token} publishkey${publishkey}`)

    
} catch (error) {
    console.log(error.message)
    
}  

}
let isauthenticated=async()=>{
    // check if the authid.txt file is there or not
    // if the authid.txt file is there then check if the token is valid or not
    // if the token is valid then return true else return false
    try {
        let authid=fs.readFileSync(__dirname+'/auth/auth.txt','utf8')
        if(authid==''){
           throw new Error('Authid is not set or you have edited the authid.txt file')
        }
        else{
            // check if the token is valid or not
            // if valid then return true else return false
            let publishkey=authid.split('publishkey')[1]
            let token=authid.split('publishkey')[0]
           try {
            let res= await axios.post(`http://localhost:5500/keys/checktoken/${publishkey}`,{
                token:token
            })
            
            
            return publishkey
           } catch (error) {
            console.log(error.message)
            
           }
        }
    } catch (error) {
        return false
        
    }
    
}
module.exports={
    authenticate,
    isauthenticated
}