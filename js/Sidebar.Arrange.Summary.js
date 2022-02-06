import * as THREE from '../build/three.module.js';

import { UIPanel, UIRow, UIText, UIDiv } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';

import { SetUuidCommand } from './commands/SetUuidCommand.js';
import { SetValueCommand } from './commands/SetValueCommand.js';
import { SetPositionCommand } from './commands/SetPositionCommand.js';
import { SetColorCommand } from './commands/SetColorCommand.js';
// import { Arrange } from './Sidebar.Arrange.js';



function SidebarArrangeSummary( editor, guests ) {

	var strings = editor.strings;
	var signals = editor.signals;
	var guests = guests;
	this.selectedId = 0;
	var scope = this;
	var groupContainer = new UIPanel();
	groupContainer.setBorderTop( '0' );
	groupContainer.setPaddingTop( '20px' );
	// groupContainer.setDisplay( 'none' );

	var headerRow = new UIRow();
	var headtxt = new UIText( strings.getKey( 'sidebar/arrange/summary' ).toUpperCase() );
	headerRow.add( headtxt );
	groupContainer.add( headerRow );

	var unseatedGuestsRow = new UIRow();
	var unseatedGuests = new UIText();
	unseatedGuestsRow.add( new UIText( strings.getKey( 'sidebar/arrange/summary/unseated' ) ).setWidth( '130px' ) );
	unseatedGuestsRow.add( unseatedGuests );
	groupContainer.add( unseatedGuestsRow );

	var seatedGuestsRow = new UIRow();
	var seatedGuests = new UIText();
	seatedGuestsRow.add( new UIText( strings.getKey( 'sidebar/arrange/summary/total' ) ).setWidth( '130px' ) );
	seatedGuestsRow.add( seatedGuests );
	groupContainer.add( seatedGuestsRow );




	function updateUI( value ) {
		// if ( value != 0 ) {
		// 	headtxt.setTextContent(strings.getKey('sidebar/groups/details'));
		// 	// groupContainer.setDisplay( 'block' );
	

		// } else {

		// 	headtxt.setTextContent(strings.getKey('sidebar/event/details'));

		// }
		var groupDetails = guests.summarizeGroupStatsByTeamId(value);
		console.log(groupDetails);
		unseatedGuests.setValue(groupDetails.unseatedGuests);
		seatedGuests.setValue(groupDetails.totalGuests);
		scope.selectedId = value;
	}
	signals.groupChanged.add(updateUI);

	signals.eventIdChanged.add(function(v){updateUI(0)});

	signals.objectRemoved.add(function(v){updateUI(scope.selectedId)});
	
	return groupContainer;



}

export { SidebarArrangeSummary };
