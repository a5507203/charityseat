import { UITabbedPanel, UISpan } from './libs/ui.js';
// import { SidebarScene } from './Sidebar.Scene.js';
import { SidebarEditTable } from './Sidebar.Table.js';
// import { SidebarProperties } from './Sidebar.Properties.js';
import { SidebarScript } from './Sidebar.Script.js';
import { SidebarAnimation } from './Sidebar.Animation.js';
import { SidebarProject } from './Sidebar.Project.js';
import { SidebarSettings } from './Sidebar.Settings.js';
import { SidebarObject } from './Sidebar.Object.js';
function Sidebar( editor ) {

	var strings = editor.strings;

	var container = new UITabbedPanel();
	container.setId( 'sidebar' );

	// var scene = new UISpan().add(
	// 	// new SidebarScene( editor ),
	// 	new SidebarProperties( editor ),
	// 	new SidebarAnimation( editor ),
	// 	new SidebarScript( editor )
	// );
	var project = new SidebarProject( editor );
	// var add = new SidebarAdd( editor );
	var settings = new SidebarSettings( editor );
	container.addTab( 'add', strings.getKey( 'sidebar/add' ), new SidebarEditTable( editor ) );
	// container.addTab( 'scene', strings.getKey( 'sidebar/scene' ), scene );
	// container.addTab( 'project', strings.getKey( 'sidebar/project' ), project );
	container.addTab( 'settings', strings.getKey( 'sidebar/settings' ), settings );
	container.select( 'add' );

	return container;

}

export { Sidebar };
