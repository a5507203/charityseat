
import * as Commands from './commands/Commands.js';

function Tables( editor ) {

	this.signals = editor.signals;
	this.editor = editor;
	this.groups = 1

};

Tables.prototype = {

	deleteTable: function ( cmd, optionalName ) {

	

	},

	addTableSets: function ( cmd, optionalName ) {

		var s = chairs.getValue();
		var y = -50+s*12;
		for (let i = 0; i < tables.getValue(); i++) {
			var x = -30 + i*12;
			var table = createTableSet( x, y, s );
			editor.execute( new AddObjectCommand( editor, table ) );
		}


	},

	createTableSetObject: function ( posX, posY, chairs ) {

		var table_size = Math.max(3,parseInt(chairs/3));
		var table_geometry = new THREE.CircleGeometry(table_size, 32 );
		// var table_edges = new THREE.BufferGeometry().fromGeometry (new THREE.EdgesGeometry( table_geometry )) ;
		var table_edges = new THREE.EdgesGeometry( table_geometry ) ;
		var table_mesh = new THREE.Mesh( table_geometry, new THREE.MeshBasicMaterial( { color: 0xffffff } ) );

		var line = new THREE.LineSegments( table_edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
		console.log(table_edges)
		table_mesh.attach(line);
		table_mesh.name = "T"
		table_mesh.position.set( posX, posY, 0 );
		// group.add(mesh);
		for (let i = 0; i < chairs; i++) {

			const segment = 0 + i / chairs *  Math.PI * 2;
			const chair_x = (1+table_size) * Math.cos( segment );
			const chair_y = (1+table_size) * Math.sin( segment );

			var chair_geometry = new THREE.CircleGeometry(1, 32 );
			var chair_edges = new THREE.EdgesGeometry( chair_geometry );
			var chair_mesh = new THREE.Mesh( chair_geometry, new THREE.MeshBasicMaterial( { color: 0x83dcfc } ) );
			var chair_line = new THREE.LineSegments( chair_edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
			chair_mesh.attach(chair_line)
			table_mesh.attach(chair_mesh)
			chair_mesh.position.set( chair_x, chair_y, 0 );
		}
		
		return table_mesh;

	}

};

export { Tables };
