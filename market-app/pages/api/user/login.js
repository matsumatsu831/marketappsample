import jwt from "jsonwebtoken"
import connectDB from "../../../utils/database"
import {UserModel} from "../../../utils/schemaModels"

const secret_key = "nextmarket"

const loginUser = async(req,res) => {
    try{
        await connectDB() 
        const saveUserData = await UserModel.findOne({email:req.body.email})
        console.log(saveUserData)
        if(saveUserData){
            if(req.body.password ===saveUserData.password){
                const payload = {email:req.body.email,}
                //トークンを発行することで一定時間ログインなしで操作可能
                //ペイロード(トークンを含ませたいデータ)、シークレットキー、有効期限が必要
                const token = jwt.sign(payload, secret_key,{expiresIn:"23h"})
                console.log(token)
                return res.status(200).json({message:"ログイン成功", token:token})
            }else{
                return res.status(400).json({message:"ログイン失敗"})
            }
        }else{
            return res.status(400).json({message:"ログイン失敗"})
        }
    }catch(err){
        return res.status(400).json({message:"ログイン失敗"})
    }
}

export default loginUser