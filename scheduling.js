import pkg from "node-cron";
import fetch from 'node-fetch';

function postLocationUpdates(numberOfVehicles){
    const {schedule} = pkg;
    const job = schedule("* * * * * *", function jobYouNeedToExecute() {
        // write post location updates
        for(let i=0; i<numberOfVehicles; i++){
            const body = {
                vin : i+1,
                posx: Math.floor(Math.sin((i+1) * Math.random()) * 500),
                    //Math.random() *700),
                posy: Math.floor(Math.cos((i+1) * Math.random()) * 600),
                    //Math.random() *800),
            };

            try {
                fetch('http://localhost:5000/machines', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
                
            } catch (error) {
                console.log("There is an error" + error.stringify);
                
            }           
            
        }
        
      });
}

export {postLocationUpdates};



