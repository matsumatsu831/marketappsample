//ログイン状態判定
import jwt from "jsonwebtoken"

const secret_key = "nextmarket"

const auth =(handler) =>{
    return async(req,res) => {
        if (req.method === "GET"){
            return handler(req,res)
        }
        //const token = await req.headers.authorization.split("")[1]
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QiLCJpYXQiOjE2OTg1NDQ2MzQsImV4cCI6MTY5ODYyNzQzNH0.zz0mwJQc0gjAzDGDl0dpyQA93_hrfsU7watBkztnDVg"
        if(!token){
            return res.status(401).json({message:"トークンはありません"})
        try{
            const decoded = jwt.verify(token,secret_key)
            req.body.email = decoded.email
            return handler(req,res)
        }catch(err){
            return res.status(401).json({message:"トークンが正しくないのでログインしてください"})
        }
        }
    }
}

export default auth