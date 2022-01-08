import * as THREE from '../build/three.module.js';

import { UISpan, UIPanel, UIRow, UIInput, UISelect, UIButton, UIColor, UICheckbox, UIInteger, UITextArea, UIText, UINumber } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';

import { SetUuidCommand } from './commands/SetUuidCommand.js';
import { SetValueCommand } from './commands/SetValueCommand.js';
import { SetPositionCommand } from './commands/SetPositionCommand.js';
import { SetColorCommand } from './commands/SetColorCommand.js';
import { SidebarTableAdd } from './Sidebar.Arrange.js';
import {Guests} from "./Guests.js";


function SidebarEditTable( editor ) {

	var guests = new Guests(editor);
	var strings = editor.strings;
	var signals = editor.signals;

	var container = new UISpan();
	container.add( new SidebarTableAdd( editor ) );
	

	var objectContainer = new UIPanel();
	objectContainer.setBorderTop( '0' );
	objectContainer.setPaddingTop( '20px' );
	objectContainer.setDisplay( 'none' );
	container.add( objectContainer );
	//

	var objectTypeRow = new UIRow();
	var objectType = new UIText();

	objectTypeRow.add( new UIText( strings.getKey( 'sidebar/object/type' ) ).setWidth( '90px' ) );
	objectTypeRow.add( objectType );

	objectContainer.add( objectTypeRow );


	// name

	var objectNameRow = new UIRow();
	var objectName = new UIInput().setWidth( '150px' ).setFontSize( '12px' ).onChange( function () {

		editor.execute( new SetValueCommand( editor, editor.selected, 'name', objectName.getValue() ) );

	} );

	objectNameRow.add( new UIText( strings.getKey( 'sidebar/object/name' ) ).setWidth( '90px' ) );
	objectNameRow.add( objectName );

	objectContainer.add( objectNameRow );


	
	// // position

	// var objectPositionRow = new UIRow();
	// var objectPositionX = new UINumber().setPrecision( 3 ).setWidth( '50px' ).onChange( update );
	// var objectPositionY = new UINumber().setPrecision( 3 ).setWidth( '50px' ).onChange( update );


	// objectPositionRow.add( new UIText( strings.getKey( 'sidebar/object/position' ) ).setWidth( '90px' ) );
	// objectPositionRow.add( objectPositionX, objectPositionY );

	// objectContainer.add( objectPositionRow );


	//

	var options = {0:"empty"}
	signals.eventIdChanged.add(function(){
		options = guests.toDict();
		console.log(options);
		options[0] = "empty";
		seat.setOptions( options );
		console.log(options)

	})

	var seatRow = new UIRow();
	var seat = new UISelect().setWidth( '150px' );
	seat.setOptions( options );
	seat.setValue( 0 );

	seat.onChange( function () {

		// var value = this.getValue();
		var object = editor.selected;
		var value = this.getValue();
		console.log(value);
		
		editor.execute( new SetValueCommand( editor, object, 'userData', guests.guestdict[value] ) );

	} );

	seatRow.add( new UIText( strings.getKey( 'sidebar/seat/guest' ) ).setWidth( '90px' ) );
	seatRow.add( seat );

	objectContainer.add( seatRow );


	// user data

	var objectUserDataRow = new UIRow();
	var objectUserData = new UITextArea().setWidth( '150px' ).setHeight( '500px' ).setFontSize( '12px' ).onChange( update );
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

	objectUserDataRow.add( new UIText( strings.getKey( 'sidebar/object/userdata' ) ).setWidth( '90px' ) );
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

			objectUserData.setValue( JSON.stringify( object.userData, null, '  ' ) );

		} catch ( error ) {

			console.log( error );

		}

		objectUserData.setBorderColor( 'transparent' );
		objectUserData.setBackgroundColor( '' );

		if (object.name == "T"){
			objectUserData.setHeight( '400px' )

		}
		else if (object.name == "C") {
			objectUserData.setHeight( '200px' )

		}

		// updateTransformRows( object );

	}

	return container;

}

export { SidebarEditTable };
