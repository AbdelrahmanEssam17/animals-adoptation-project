


import express from 'express' 
import bootstrap from './src/app.controller.js';
const app=express()
bootstrap(app,express)

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port 4000`)
})

import favouriteRoutes from "./src/moduels/favourite/favourite.routes.js"

app.use("/api/favourite", favouriteRoutes);
