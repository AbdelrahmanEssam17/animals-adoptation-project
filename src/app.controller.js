import dbconeection from "./DB/db.connection.js"

const bootstrap =(app,express)=>{
    app.use(express.json())




 app.use("*",(req,res,next)=>{
    return res.status(404).json({message:"invalid routing"})



 })
 dbconeection()

}


export default bootstrap