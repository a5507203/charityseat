
import * as Commands from './commands/Commands.js';
import { AddObjectCommand } from './commands/AddObjectCommand.js';
import { SetValueCommand } from './commands/SetValueCommand.js';



function Tables( editor, guests ) {

	var scope = this;
	this.signals = editor.signals;
	this.editor = editor;
	this.num_tables = 0;
	this.table3DDict = {};
	this.totalSeat = "";
	this.tableNoList = [];
	this.margin = 5;
	this.distToTable = 1.4;
	this.guests = guests;
	// TODO add event listener to intialize table numbers and list



}


Tables.prototype = {

	deleteTableSets: function ( tableId ) {
		// this.num_tables += 1;
		const index = this.tableNoList.indexOf(tableId);
		if (index > -1) {
			this.tableNoList.splice(index, 1);
		}

	},
	
	addTableSets: function ( chairs, num_tables ) {

		// TODO need to calculate coordinates 
		var y = this.calculateY(chairs);
		for (let i = 0; i < num_tables; i++) {
			// var x = -70 + i*15;
			var x = this.calculateX(chairs);
			var table = this.createTableSetObject( x, y, chairs );
			this.table3DDict[table.uuid] = table;
			this.editor.execute( new AddObjectCommand( editor, table ) );	
			var tableNo = this.generateTableNo();
			this.tableNoList.push(tableNo);
			table.userData.meta = {"size":chairs,"No":tableNo};
			
		}
		// this.num_tables += 1;

		this.tableNoList.sort(function(a, b){return a-b});
		

	},

	

	calculateX: function ( chairs ) {
		var scope = this;
		var x = -70;
		var i = 1;
		Object.entries(scope.table3DDict).forEach(([k,table]) =>{
			console.log(table);
			if (chairs == table.userData.meta.size) {
				// console.log("")
				var table_size = Math.max(3,parseInt(chairs/2));
				x = x+table_size*2+scope.distToTable+scope.margin;
			}
		}) 
			// var table_size = Math.max(3,parseInt(i/2));
			// y = y+table_size*2+this.distToTable+this.margin;
		
		return x;
		//var y = -130+chairs*15;
	},

	calculateY: function ( chairs ) {

		var y = -100;
		for (let i = 0; i < chairs; i++) {
			var table_size = Math.max(3,parseInt(i/2));
			y = y+table_size*2+this.distToTable+this.margin;
		}
		return y;
		//var y = -130+chairs*15;
	},

	getEmptyChairs: function( table3d = null ) {
		if (table3d == null ){
			return [];
		}
		var emptyChairList = [];
		for (let i = 0 ; i< table3d.children.length; i+=1) { 
			var child = table3d.children[i];
			if (child.name != "C") continue;
			if ( child.userData.ticketNumber!= undefined) continue;
			emptyChairList.push(child);
		}

		return emptyChairList;
	},

	assignSeat: function ( chair, guest, ticketNumber) {
		console.log("debug",chair);
		if (chair == undefined) {
			return false;
		}
		// chair.userData.ticketNumber = ticketNumber;
		guest.setSeat3d(chair);
		this.editor.execute( new SetValueCommand( editor, chair, 'userData', {"ticketNumber":ticketNumber} ) );

		return true;
	}, 

	seatDown: function ( teamId, ticketNumber ) {
		// console.log(this.editor.selected);
		var emptyChairList = this.getEmptyChairs(this.editor.selected );
		console.log("debug",emptyChairList);
		var i = 0;
		// add multiple guests to a table
		if (ticketNumber == 0) {
			var waitingGuestsList = this.guests.getWaitingGuests(teamId);
			console.log("debug",waitingGuestsList);
			for (let i = 0 ; i< waitingGuestsList.length; i+=1) { 
				var guest = waitingGuestsList[i];
				
				var isSuccessed = this.assignSeat(emptyChairList[i], guest, guest.ticketNumber);
				if (!isSuccessed) break;
		
			};
		}
		else {
			this.guests.getGuestByTicketNumber(ticketNumber);
			this.assignSeat(emptyChairList[i], guest, ticketNumber);
		}
	},


	generateTableNo: function( ) {
		var len = this.tableNoList.length;
		if (len == 0) return 1;
		if (len == this.tableNoList[len-1]) return len+1;
		for (let i = 0; i<len; i+=1) {
			if (i+1 != this.tableNoList[i]) return i+1;
		}
		return -1;

	},

	createTableSetObject: function ( posX, posY, chairs ) {

		var table_size = Math.max(3,parseInt(chairs/2));
		var table_geometry = new THREE.CircleGeometry(table_size, 32 );
		// var table_edges = new THREE.BufferGeometry().fromGeometry (new THREE.EdgesGeometry( table_geometry )) ;
		var table_edges = new THREE.EdgesGeometry( table_geometry ) ;
		var table_mesh = new THREE.Mesh( table_geometry, new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
		var line = new THREE.LineSegments( table_edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
		// console.log(table_edges)
		table_mesh.attach(line);
		table_mesh.name = "T";
		table_mesh.position.set( posX, posY, 0 );
		// group.add(mesh);
		for (let i = 0; i < chairs; i++) {

			const segment = 0 + i / chairs *  Math.PI * 2;
			const chair_x = (1.4+table_size) * Math.cos( segment );
			const chair_y = (1.4+table_size) * Math.sin( segment );

			var chair_geometry = new THREE.CircleGeometry(1, 32 );
			var chair_edges = new THREE.EdgesGeometry( chair_geometry );
			var chair_mesh = new THREE.Mesh( chair_geometry, new THREE.MeshBasicMaterial( { color: 0x83dcfc } ) );
			chair_mesh.name = "C";
			var chair_line = new THREE.LineSegments( chair_edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
			chair_mesh.attach(chair_line);
			table_mesh.attach(chair_mesh);
			chair_mesh.position.set( chair_x, chair_y, 0 );
		}
		
		return table_mesh;

	},



};

export { Tables };