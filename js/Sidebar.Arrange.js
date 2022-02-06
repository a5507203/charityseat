import { UISpan, UIPanel, UIText, UIRow, UINumber, UIButton, UIInput } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';
import { AddObjectCommand } from './commands/AddObjectCommand.js';
import { Tables } from './Tables.js';
import { SidebarEditTable } from './Sidebar.Table.js';
import {Guests} from "./Guests.js";
import {GenerateEvent} from "./GenerateEvent.js";
import { SidebarTableGroups } from './Sidebar.Table.Groups.js';
import { AutoArrange } from './AutoArrange.js';


function Arrange( editor ) {

	var guests = new Guests(editor);
	var tables = new Tables(editor, guests);

	var generateEvent = new GenerateEvent( editor );

	var arrange = new AutoArrange(editor,guests,tables);

	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UISpan();
	var newTableContainer = new UIPanel();
	container.add(newTableContainer)

	var headerRow = new UIRow();
	headerRow.add( new UIText( strings.getKey( 'sidebar/tables/addtitle' ).toUpperCase() ) );
	newTableContainer.add( headerRow );


	
	var totalSeatRow = new UIRow();
	var totalSeat = new UIText();
	totalSeatRow.add( new UIText( strings.getKey( 'sidebar/tables/total' ) ).setWidth( '130px' ) );
	totalSeatRow.add( totalSeat );
	newTableContainer.add( totalSeatRow );


	var tablesRow = new UIRow();
	var num_tables = new UINumber(2).setPrecision( 0 ).setRange(1,30).setWidth( '50px' );
	tablesRow.add( new UIText( strings.getKey( 'sidebar/tables/number' ) ).setWidth( '120px' ) );
	tablesRow.add( num_tables );
	newTableContainer.add( tablesRow );


	var chairsRow = new UIRow();
	var chairs = new UINumber(5).setPrecision( 0 ).setRange(2,30).setWidth( '50px' );
	chairsRow.add( new UIText( strings.getKey( 'sidebar/tables/size' ) ).setWidth( '90px' ) );
	chairsRow.add( chairs );
	newTableContainer.add( chairsRow );


	var buttonRow = new UIRow();
	var button = new UIButton( strings.getKey( 'sidebar/tables/add' ) ).onClick( 
		function(){ 
			tables.addTableSets(chairs.getValue(), num_tables.getValue());
			totalSeat.setInnerHTML(tables.totalSeat);
		}
		).setWidth( '90px' );
	buttonRow.add( button );
	newTableContainer.add( buttonRow );


	var eventRow = new UIRow();
	var eventId = new UIInput().setWidth( '150px' ).setFontSize( '12px' ).setValue("").onChange( function () {
		signals.eventIdChanged.dispatch();

	} );

	eventRow.add( new UIText( strings.getKey( 'sidebar/event/id' ) ).setWidth( '90px' ));
	eventRow.add( eventId );
	newTableContainer.add( eventRow );

	//group details
	container.add(new SidebarTableGroups(editor,guests));

	container.add( new SidebarEditTable( editor, tables, guests ) );


	var buttonRow = new UIRow();
	var button = new UIButton( strings.getKey( 'sidebar/arrange/autoarrange' ) ).onClick( 
		function(){
			arrange.autoArrange();
		 }
		).setWidth( '120px' );
	buttonRow.add( button );
	container.add( buttonRow );

	return container;



}

export { Arrange };


