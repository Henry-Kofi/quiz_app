import {randomBytes,pbkdf2Sync} from "node:crypto"

class Password{
    generate(password: string){
        const salt = randomBytes(32).toString('hex')
        const genHash = pbkdf2Sync(password,salt,10000,64,"sha512").toString('hex')
        return {genHash,salt}
    }
    validate(password:string,hashed:string,salt:string){
        const checkHash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
        console.log("hashed",checkHash)
        if(hashed != checkHash){
            return false
        }
        return true
    }
}

const encrypt = new Password()
export default encrypt