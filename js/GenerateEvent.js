
/**
 * @param editor Editor
 * @constructor
 */
 class GenerateEvent {

	constructor( editor ) {

        var scope = this
		scope.signals = editor.signals;


        scope.signals.eventIdChanged.add( function(eventId){
        var jsonData = [];
        var total_guests = 100+Math.floor(Math.random() * 300);
        var  i = 0;
        console.log(total_guests);

        
        while (total_guests !=0) {
        
            var num_in_team = Math.floor(Math.random() * 20);

            if (total_guests - num_in_team<0) {
                num_in_team = total_guests;

            }
            total_guests = total_guests - num_in_team;

            for (let j = 0; j < num_in_team; j++) {
                var guest = {
                    "firstName": String(j),
                    "lastName": String(i),
                    "teamId":String(i),
                    "teamName":"Oli"+String(i),
                    "seatNumber": "NULL",
                    "tableNumber":"NULL",
                    "ticketNumber":String(j)+String(i)
            
                }
                jsonData.push(guest);
            }
            i += 1;

        }
        scope.signals.dataUpdated.dispatch(JSON.stringify(jsonData));
        }  )
	}

}

export { GenerateEvent };
