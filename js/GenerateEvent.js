function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

var GenerateEvent = function(editor){

	

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
            var teamId = generateUUID();
            for (let j = 0; j < num_in_team; j++) {
                var guest = {
                    "firstName": String(j),
                    "lastName": String(i),
                    "teamId":teamId,
                    "teamName":"Oli"+String(i),
                    "seatNumber": "NULL",
                    "tableNumber":"NULL",
                    "ticketNumber":generateUUID(),
            
                }
                jsonData.push(guest);
            }
            i += 1;

        }
        scope.signals.dataUpdated.dispatch(JSON.stringify(jsonData));
        }  )
	

}

export { GenerateEvent };
