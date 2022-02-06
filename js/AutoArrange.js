


function AutoArrange( editor, guests, tables ) {

	var scope = this;
	this.signals = editor.signals;
	this.editor = editor;
	this.guests = guests;
    this.tables = tables;

	// TODO add event listener to intialize table numbers and list
	var scope = this;
	

}



AutoArrange.prototype = {

	
	getSmallestPossibleTable: function (curr_group_size, tablelist) {

		var max_table_size = tablelist.length-1;
		
		var curr_table_size = 1;
	

		for(var i = 1; i <= max_table_size; i += 1 ) {
			if (tablelist[i].length>0 ) {
				curr_table_size = i;
				if (curr_table_size >= curr_group_size) break;
			}
		}
		return curr_table_size;
	},

	arrangeSeat: function ( group, table ){

		// console.log(guest);
		// console.log(chair);
		console.log(group);
		console.log(table);
		var group_size = group.length;
		var table_size = table.length;

		for (var i=0 ;i< Math.min(group_size, table_size); i+=1) {
			var chair = table[i];
			var guest = group[i];
			this.tables.assignSeat(chair, guest);
		}
	
		return [group.slice(i), table.slice(i)];

	},

	autoArrange: function ( ) {
		var guestlist = this.guests.guestToList();
		var tablelist = this.tables.tableToList();
		// get the largest group size
		var curr_group_size = guestlist.length-1;

		// until the arrangement is complete
		while (curr_group_size>=1) {
			
			// if there are any guests left with the current size, arrange the seat,
			// or reduce the group size 
			while (guestlist[curr_group_size].length>0) {

				var curr_group = guestlist[curr_group_size].splice(0, 1)[0];

				var idx = this.getSmallestPossibleTable(curr_group_size, tablelist);
				var curr_table = tablelist[idx].splice(0, 1)[0];
				console.log(idx);
				var [remain_guests, remain_chairs] = this.arrangeSeat(curr_group, curr_table);

				if (remain_guests.length > 0) {
					guestlist[remain_guests.length].push(remain_guests);
				}
				if (remain_chairs.length > 0) {
					tablelist[remain_chairs.length].push( remain_chairs);
				}
				// console.log(curr_group);
				// console.log(curr_table);
				// console.log(guestlist);
				// console.log(tablelist);
				// break;
			}
			// break;
			// reduce the group size 
			curr_group_size -= 1;
			// console.log(curr_group_size);
			
		}
		// console.log(guestlist);
		// console.log(tablelist);

		return 0;
		

	}







};

export { AutoArrange };