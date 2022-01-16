import * as THREE from '../build/three.module.js';

import { UIPanel, UIRow, UIInput, UISelect, UIButton, UIColor, UICheckbox, UIInteger, UITextArea, UIText, UINumber } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';

import { SetUuidCommand } from './commands/SetUuidCommand.js';
import { SetValueCommand } from './commands/SetValueCommand.js';
import { SetPositionCommand } from './commands/SetPositionCommand.js';
import { SetColorCommand } from './commands/SetColorCommand.js';
import { SidebarTableGroups } from './Sidebar.Table.Groups.js';



function SidebarEditTable( editor, tables, guests ) {

	var guests = guests;
	var tables = tables;
	var strings = editor.strings;
	var signals = editor.signals;

	// var container = new UISpan();
	// container.add( new Arrange( editor ) );
	

	var objectContainer = new UIPanel();
	objectContainer.setBorderTop( '0' );
	objectContainer.setPaddingTop( '20px' );
	objectContainer.setDisplay( 'none' );
	// container.add( objectContainer );
	//

	


	var objectTypeRow = new UIRow();
	var objectType = new UIText();

	objectTypeRow.add( new UIText( strings.getKey( 'sidebar/object/type' ) ).setWidth( '120px' ) );
	objectTypeRow.add( objectType );

	objectContainer.add( objectTypeRow );


	// name

	var objectNameRow = new UIRow();
	var objectName = new UIInput().setWidth( '140px' ).setFontSize( '12px' ).onChange( function () {

		editor.execute( new SetValueCommand( editor, editor.selected, 'name', objectName.getValue() ) );

	} );

	objectNameRow.add( new UIText( strings.getKey( 'sidebar/object/name' ) ).setWidth( '120px' ) );
	objectNameRow.add( objectName );

	objectContainer.add( objectNameRow );




	// group selection
	var groupRow = new UIRow();
	var groupOptions = {0:" "};
	var groupSelection = new UISelect().setWidth( '140px' );
	groupSelection.setOptions( groupOptions );
	groupSelection.setValue( 0 );
	groupRow.add( new UIText( strings.getKey( 'sidebar/seat/group' ) ).setWidth( '120px' ) );
	groupRow.add( groupSelection );
	objectContainer.add( groupRow );


	// guest selection
	var guestRow = new UIRow();	
	var guestOptions = {0:" "};
	var guestSelection = new UISelect().setWidth( '140px' );
	guestSelection.setOptions( guestOptions );
	guestSelection.setValue( 0 );
	guestRow.add( new UIText( strings.getKey( 'sidebar/seat/guest' ) ).setWidth( '120px' ) );
	guestRow.add( guestSelection );
	objectContainer.add( guestRow );

	var buttonRow = new UIRow();
	var button = new UIButton( strings.getKey( 'sidebar/tables/confirm' ) ).onClick( function(){ 
			// var value = this.getValue();\
		tables.arrangeSeat(groupSelection.getValue(), guestSelection.getValue());
		signals.groupChanged.dispatch(groupSelection.getValue());

	}).setWidth( '250px' );
	buttonRow.add( button );
	objectContainer.add( buttonRow );

	
	groupSelection.onChange( function () {

		var value = this.getValue();
		// var object = editor.selected;
		signals.groupChanged.dispatch(value);
		// tables.addGuests();
		guestOptions = guests.getGuestDictbyTeamId(value);
		// console.log(guestOptions);
		guestOptions[0] = "Empty";
		guestSelection.setOptions( guestOptions );


	} );
	
	// signals.object

	signals.eventIdChanged.add(function(){

		groupOptions = guests.groupDict();
		groupOptions[0] = " ";
		groupSelection.setOptions( groupOptions );


		guestOptions = guests.getGuestDictbyTeamId(0);
		// console.log(guestOptions);
		guestOptions[0] = "Empty";
		guestSelection.setOptions( guestOptions );

		

	})





	// user data

	var objectUserDataRow = new UIRow();
	var objectUserData = new UITextArea().setWidth( '140px' ).setHeight( '500px' ).setFontSize( '12px' ).onChange( update );
	objectUserData.onKeyUp( function () {

		try {

			JSON.parse( objectUserData.getValue() );

			objectUserData.dom.classList.add( 'success' );
			objectUserData.dom.classList.remove( 'fail' );

		} catch ( error ) {

			objectUserData.dom.classList.remove( 'success' );
			objectUserData.dom.classList.add( 'fail' );

		}

	} );

	objectUserDataRow.add( new UIText( strings.getKey( 'sidebar/object/userdata' ) ).setWidth( '120px' ) );
	objectUserDataRow.add( objectUserData );

	objectContainer.add( objectUserDataRow );
	




	function update() {

		var object = editor.selected;

		if ( object !== null ) {

			var newPosition = new THREE.Vector3( objectPositionX.getValue(), objectPositionY.getValue(), 0);
			if ( object.position.distanceTo( newPosition ) >= 0.01 ) {

				editor.execute( new SetPositionCommand( editor, object, newPosition ) );

			}

	
			try {

				var userData = JSON.parse( objectUserData.getValue() );
				if ( JSON.stringify( object.userData ) != JSON.stringify( userData ) ) {

					editor.execute( new SetValueCommand( editor, object, 'userData', userData ) );

				}

			} catch ( exception ) {

				console.warn( exception );

			}

		}

	}

	function updateRows( object ) {



		// var properties = {
		// 	'right': objectRightRow,
		// 	'top': objectTopRow,
		// 	'bottom': objectBottomRow,
		// 	'near': objectNearRow,
		// 	'far': objectFarRow,
		// 	'intensity': objectIntensityRow,
		// 	'color': objectColorRow,
		// 	'groundColor': objectGroundColorRow,
		// 	'distance': objectDistanceRow,
		// 	'angle': objectAngleRow,
		// 	'penumbra': objectPenumbraRow,
		// 	'decay': objectDecayRow,
		// 	'castShadow': objectShadowRow,
		// 	'receiveShadow': objectReceiveShadow,
		// 	'shadow': [ objectShadowBiasRow, objectShadowNormalBiasRow, objectShadowRadiusRow ]
		// };

		// for ( var property in properties ) {

		// 	var uiElement = properties[ property ];

		// 	if ( Array.isArray( uiElement ) === true ) {

		// 		for ( var i = 0; i < uiElement.length; i ++ ) {

		// 			uiElement[ i ].setDisplay( object[ property ] !== undefined ? '' : 'none' );

		// 		}

		// 	} else {

		// 		uiElement.setDisplay( object[ property ] !== undefined ? '' : 'none' );

		// 	}

		// }

		//

	

	}


	// events

	signals.objectSelected.add( function ( object ) {

		if ( object !== null ) {

			objectContainer.setDisplay( 'block' );

			updateRows( object );
			updateUI( object );

		} else {

			objectContainer.setDisplay( 'none' );

		}

	} );

	signals.objectChanged.add( function ( object ) {

		if ( object !== editor.selected ) return;

		updateUI( object );

	} );

	signals.refreshSidebarObject3D.add( function ( object ) {

		if ( object !== editor.selected ) return;

		updateUI( object );

	} );

	function updateUI( object ) {

		objectType.setValue( object.type );
		objectName.setValue( object.name );
		
	
		try {
			if (object.name == "T"){
				objectUserData.setValue( JSON.stringify( object.userData, null, '  ' ) );
	
			}
			else if (object.name == "C") {
				objectUserData.setValue( JSON.stringify( object.userData, null, '  ' ) );
			}

		} catch ( error ) {

			console.log( error );

		}

		objectUserData.setBorderColor( 'transparent' );
		objectUserData.setBackgroundColor( '' );

		if (object.name == "T"){
			objectUserData.setHeight( '300px' );
			guestRow.setDisplay( 'none' );
			button.setTextContent( strings.getKey("sidebar/tables/confirm"));

		}
		else if (object.name == "C") {
			objectUserData.setHeight( '200px' );
			guestRow.setDisplay( 'inline-block' );
			button.setTextContent(strings.getKey("sidebar/guest/confirm"));
		}

		// updateTransformRows( object );

	}

	return objectContainer;

}

export { SidebarEditTable };
