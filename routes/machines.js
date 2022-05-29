import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const machineLocations = [];

function composeMachinesData(numberOfMachines){
    if (machineLocations.length == numberOfMachines) return;
    for(let i = 0; i < numberOfMachines; i++){
        machineLocations.push({
            uid : uuidv4(),
            vin : i+1,
            posx : 0,
            posy: 0
        });
    }
}

function updateLocation(machineData){
   let thisMachine = machineLocations.findIndex(machine => machine.vin === machineData.vin);
   if(thisMachine != -1){
    machineLocations[thisMachine].posx = machineData.posx;
    machineLocations[thisMachine].posy = machineData.posy;
    }
    else{
    console.log('couldnt find the element');

    }    
}
   

const machinesRouter = express.Router();


//all routes start with /machines

machinesRouter.get('/', (req, res) =>{
     
    res.send(machineLocations);
});

machinesRouter.post('/', (req, res) =>{
    const machineData = req.body;
    updateLocation(machineData);
    res.send(`position of machine ${machineData.vin} updated`);
});

export {machinesRouter, machineLocations, composeMachinesData, updateLocation};