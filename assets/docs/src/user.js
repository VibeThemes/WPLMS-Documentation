const { createElement, useState, useEffect, Fragment, render} = wp.element;
const { dispatch, select } = wp.data;

import UserMenu from './components/menu.js';
import ProfileGrid from './components/grid.js';

const UserProfile = (props) => {

	const [ref,setRef] = useState();
	const [style,setStyle] = useState({});

	// useEffect(()=>{
	// 	if(ref){
	// 		let dimension = ref.getBoundingClientRect();
	// 		setStyle({height:'calc(100vh - '+dimension.y+'px'});
	// 	}
	// },[ref]);
	//  ref={(r)=>{if(r && !ref){setRef(r);}}} style={style}

	return(
		<div className="vibebp_myprofile">
			<UserMenu />
			<ProfileGrid />
		</div>
	)
}

export default UserProfile;