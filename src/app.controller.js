import dbconeection from "./DB/db.connection.js"
import authroutes from '../src/moduels/auth/auth.routes.js'
import {globalErrorhandling} from '../src/utils/response/error.response.js'


const bootstrap = (app, express) => {
   app.use(express.json())



    app.use('/auth',authroutes)



   app.use("*", (req, res, next) => {
      return res.status(404).json({ message: "invalid routing" })


 })
 globalErrorhandling()
 dbconeection()

}


export default bootstrap