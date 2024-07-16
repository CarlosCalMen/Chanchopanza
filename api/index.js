const app = require('./src/app.js');
const PUERTO = 3001;
const {conn} = require('./src/db.js');

app.listen(PUERTO,()=>{
    conn.sync({force: true});
    console.log(`listening on PORT ${PUERTO}`);

});