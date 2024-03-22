/**require express */
const express=require('express');
const Rout=require('./routes/appRoutes');
const port=process.env.port || 8000;


const app=express();

app.use(express.json());

/** Routes*/ 
app.use('/api', Rout);


/**strat the server */
app.listen(port, (err) => {
    if (err) {
        console.log("Error in starting the server:", err); 
    } else {
        console.log(`Server is running on http://localhost:${port}`); 
    }
});
 