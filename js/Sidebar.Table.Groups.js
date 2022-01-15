import * as THREE from '../build/three.module.js';

import { UIPanel, UIRow, UIText } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';

import { SetUuidCommand } from './commands/SetUuidCommand.js';
import { SetValueCommand } from './commands/SetValueCommand.js';
import { SetPositionCommand } from './commands/SetPositionCommand.js';
import { SetColorCommand } from './commands/SetColorCommand.js';
// import { Arrange } from './Sidebar.Arrange.js';



function SidebarTableGroups( editor, guests ) {

	var strings = editor.strings;
	var signals = editor.signals;
	var guests = guests;

	var groupContainer = new UIPanel();
	groupContainer.setBorderTop( '0' );
	groupContainer.setPaddingTop( '20px' );
	groupContainer.setDisplay( 'none' );

	var headerRow = new UIRow();
	headerRow.add( new UIText( strings.getKey( 'sidebar/groups/details' ).toUpperCase() ) );
	groupContainer.add( headerRow );

	var unseatedGuestsRow = new UIRow();
	var unseatedGuests = new UIText();
	unseatedGuestsRow.add( new UIText( strings.getKey( 'sidebar/groups/unseated' ) ).setWidth( '90px' ) );
	unseatedGuestsRow.add( unseatedGuests );
	groupContainer.add( unseatedGuestsRow );

	var seatedGuestsRow = new UIRow();
	var seatedGuests = new UIText();
	seatedGuestsRow.add( new UIText( strings.getKey( 'sidebar/groups/total' ) ).setWidth( '90px' ) );
	seatedGuestsRow.add( seatedGuests );
	groupContainer.add( seatedGuestsRow );

	signals.groupChanged.add(function(value){

		if ( value != 0 ) {

			groupContainer.setDisplay( 'block' );
			updateUI( value );

		} else {

			groupContainer.setDisplay( 'none' );

		}
		

	})


	function updateUI( value ) {

		var groupDetails = guests.summarizeGroupStatsByTeamId(value);
		console.log(groupDetails);
		unseatedGuests.setValue(groupDetails.unseatedGuests);
		seatedGuests.setValue(groupDetails.totalGuests);

	}

	return groupContainer;

}

export { SidebarTableGroups };
