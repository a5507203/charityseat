import { UIPanel, UIText, UIRow, UINumber, UIButton } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';
import { AddObjectCommand } from './commands/AddObjectCommand.js';
import { Tables } from './Tables.js';

function SidebarTableAdd( editor ) {

	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();

	var headerRow = new UIRow();
	headerRow.add( new UIText( strings.getKey( 'sidebar/tables/add' ).toUpperCase() ) );
	container.add( headerRow );


	var tablesRow = new UIRow();
	var tables = new UINumber(2).setPrecision( 0 ).setRange(2,30).setWidth( '50px' );
	tablesRow.add( new UIText( strings.getKey( 'sidebar/tables/number' ) ).setWidth( '120px' ) );
	tablesRow.add( tables );
	container.add( tablesRow );


	var chairsRow = new UIRow();
	var chairs = new UINumber(5).setPrecision( 0 ).setRange(2,30).setWidth( '50px' );
	chairsRow.add( new UIText( strings.getKey( 'sidebar/tables/size' ) ).setWidth( '90px' ) );
	chairsRow.add( chairs );
	container.add( chairsRow );




	var button = new UIButton( strings.getKey( 'sidebar/tables/confirm' ) ).onClick( addTableSets ).setWidth( '90px' );
	container.add( button );





	

	function addTableSets() {

		var s = chairs.getValue();
		var y = -50+s*12;
		for (let i = 0; i < tables.getValue(); i++) {
			var x = -30 + i*12;
			var table = createTableSet( x, y, s );
			editor.execute( new AddObjectCommand( editor, table ) );
		}

	}


	function createTableSet( posX, posY, chairs ) {

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

	// function createTable( posX, posY, tableSize ) {

	// 	var size = Math.max(1,parseInt(tableSize/3))

	// 	var geometry = new THREE.CircleGeometry(size, 32 );
	// 	const edges = new THREE.EdgesGeometry( geometry );
	// 	var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xffffff }) );
	// 	// group.add(mesh);
	// 	var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
	// 	mesh.attach(line);
	// 	mesh.name = "T"
	// 	mesh.position.set( posX, posY, 0 );
	// 	return mesh;
	// }

	return container;



}

export { SidebarTableAdd };


