import connectDB from "../../../utils/database"
import {ItemModel} from "../../../utils/schemaModels"

const getAllItems = async(req,res) => {
    try{
        await connectDB() 
        const allItems =  await ItemModel.find()
        return res.status(200).json({message:"全てのアイテム読み取り成功", allItems:allItems})
    }catch(err){
        return res.status(200).json({message:"アイテムの読み取り失敗"})
    }
}

export default getAllItems