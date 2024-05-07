const app = require('./src/app.js');
const PUERTO = 3001;

app.listen(PUERTO,()=>{
    console.log(`listening on PORT ${PUERTO}`);
});