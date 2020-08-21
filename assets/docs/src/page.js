const { createElement, useState, useEffect, Fragment, render} = wp.element;
const { dispatch, select } = wp.data;


const LoadPage = (props) => {

	const [content,setContent] = useState();
	useEffect(()=>{
		if(props.page){
			let grabPage = props.page.split('_');
			fetch(`${window.vibekb.api.url}/getPost/`,{
				method:'post',
				body:JSON.stringify({post_type:grabPage[0],id:grabPage[1],token:select('vibebp').getToken()})
			}).then((res)=>res.json())
			.then((data)=>{
				setContent(data.content);
			});
		}
	},[props.page]);

	return(
		<div dangerouslySetInnerHTML={{__html:content}} />
	)
}

export default LoadPage;