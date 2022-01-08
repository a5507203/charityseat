var Guest = function (firstName, lastName, teamId, teamName, seatNumber, tableNumber, ticketNumber) {
    this.firstName = firstName
    this.lastName = lastName
    this.teamId = teamId
    this.teamName = teamName
    this.seatNumber = seatNumber
    this.tableNumber = tableNumber
    this.ticketNumber = ticketNumber
};


Guest.prototype = {

    setSeatNumber: function(seatNumber,tableNumber){
        this.seatNumber = seatNumber;
        this.tableNumber = tableNumber;
    },
    toString: function() {
        return this.teamId+" "+this.teamName+" "+this.firstName+" "+this.lastName +" " +this.ticketNumber;
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
            var guest = new Guest(g.firstName,g.lastName, g.teamId,g.teamName, g.seatNumber, g.tableNumber, g.ticketNumber)
            scope.guestdict[g.ticketNumber]=guest
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
        return l
    },

    toDict: function( ){
        var scope = this;
        var d = {};
        Object.entries(scope.guestdict).forEach(([k,guest]) =>{

            d[guest.ticketNumber]=guest.toString();
        })
        return d
    }

}



export { Guests };

