import express from 'express';
import bodyParser from 'body-parser';

import { machinesRouter } from './routes/machines.js';
import { composeMachinesData } from './routes/machines.js';
import { machineLocations } from './routes/machines.js';
import { postLocationUpdates } from './scheduling.js';
import cors from 'cors';

const app = express();
const PORT = 5000;
const VEHCOUNT = 25;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use('/machines', machinesRouter);


//Routes

app.get('/', (req, res)=> {
    
    //request object updates every second 
    res.send("Fleet Backend HomePage");
});

app.listen(PORT, () => {
//compose the machine objects
composeMachinesData(VEHCOUNT);
//run one location update per second
postLocationUpdates(VEHCOUNT);
console.log(`Server running on port: http://localhost:${PORT}`);
});


