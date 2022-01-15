var Guest = function (firstName, lastName, teamId, teamName, seatNumber, tableNumber, ticketNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.teamId = teamId;
    this.teamName = teamName;
    this.seatNumber = seatNumber;
    this.tableNumber = tableNumber;
    this.ticketNumber = ticketNumber;
    this.seat3d = null;
};


Guest.prototype = {

    setSeatNumber: function(seatNumber,tableNumber){
        this.seatNumber = seatNumber;
        this.tableNumber = tableNumber;
    },

    setSeat3d: function( object ){
        this.seat3d = object;
    },


    toString: function() {
        return this.teamId+" "+this.teamName+" "+this.firstName+" "+this.lastName;
    }
    
}


var Guests = function( editor ) {

    var scope = this
    this.editor = editor;
    this.guestdict = {};
    this.signals = editor.signals;

    this.signals.dataUpdated.add(function( jsonString ){
        JSON.parse(jsonString).forEach(function(g){
            // console.log(g)
            var guest = new Guest(g.firstName,g.lastName, g.teamId,g.teamName, g.seatNumber, g.tableNumber, g.ticketNumber);
            scope.guestdict[g.ticketNumber]=guest;
        })
        
    
    })


}


Guests.prototype = {

    toList: function( ){
        var scope = this;
        var l = [];
        Object.entries(scope.guestdict).forEach(([k,guest]) =>{
            l.push(guest.toString());
        })
        return l;
    },

    getGuestDictbyTeamId: function( teamId ){
        var scope = this;
        var d = {};
        Object.entries(scope.guestdict).forEach(([k,guest]) =>{
            if (teamId == 0) {
                d[guest.ticketNumber]=guest.toString();

            }
            else{
                if(guest.teamId == teamId ){
                    d[guest.ticketNumber]=guest.toString();
                }
                
            }
        })
        return d;
    },

    groupDict: function( ){
  
        var d = {};
        for (const [k,guest] of Object.entries(this.guestdict)) {
            d[guest.teamId]=guest.teamName;
        }
        return d;
    },
    
    summarizeGroupsStats: function( ){
        var d = {};
        for (const [k,guest] of Object.entries(this.guestdict)) {
            var teamId = guest.teamId;
            if ( d[guest.teamId] == undefined ) d[guest.teamId] = {"teamName":guest.teamName,"unseatedGuests": 0 , "totalGuests":0};
                if (guest.seat3d == null) d[teamId].unseatedGuests += 1;
                d[teamId].totalGuests += 1;
        }
        return d;
    },

    summarizeGroupStatsByTeamId: function( selectedId ){   

        var unseatedGuests = 0;
        var totalGuests = 0;
        for (const [k,guest] of Object.entries(this.guestdict)) {
            var teamId = guest.teamId;
            if ( teamId != selectedId ) continue;
            if (guest.seat3d == null) unseatedGuests += 1;
            totalGuests += 1;
        }
        return {"unseatedGuests": unseatedGuests, "totalGuests":totalGuests};

    },


	getWaitingGuests: function( teamId ) {

        var waitingGuestsList = [];
        for (const [k,guest] of Object.entries(this.guestdict)) {
            if (guest.seat3d != undefined || guest.teamId != teamId ) continue;
            waitingGuestsList.push(guest);
          }
		return waitingGuestsList;
	},

    getGuestByTicketNumber: function (ticketNumber) {
        var scope = this;
        for (const [k,guest] of Object.entries(this.guestdict)) {
			if (guest.ticketNumber == ticketNumber) return guest;
            
        }
		return null;
    }

}



export { Guests };

