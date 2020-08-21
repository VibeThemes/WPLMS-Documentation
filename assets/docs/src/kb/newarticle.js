const { createElement, useState, useEffect, Fragment, render,useContext} = wp.element;
const { dispatch, select } = wp.data;

import KbContext from './context.js';
import {compareThis} from '../functions';

const NewArticle = (props) => {

	const kbContext = useContext(KbContext);

	const [isLoading,setisLoading] = useState(false);
	const [args,setArgs] = useState({post_title:'',post_content:'','raw':'',type:'','new':0});
	const [postContent,setPostContent] = useState({});
 	const [showPreview,setShowPreview] = useState(false);

 	const user = select('vibebp').getUser();

	useEffect(()=>{
		if(props.hasOwnProperty('article')){
			setArgs({...args,id:props.article.id,post_title:props.article.post_title,post_cotent:props.article.post_content,raw:props.article.raw,type:props.article.type});
		}
	},[]);

	useEffect(()=>{

		var event = new CustomEvent('load_vibe_editor',{detail:{
            'selector':'.vibe_article_editor',
            'content':props.hasOwnProperty('article')?props.article.post_content:'',
            'raw':props.hasOwnProperty('article')?props.article.raw:'',
            'components':'editor',
            'updater':'vibe_article'
        }});
       
    	document.dispatchEvent(event);

	},[]);

	useEffect(()=>{
		document.addEventListener('vibe_editor_content_update_vibe_article',(e)=>{
			setPostContent({post_content:e.detail.raw_html,raw:e.detail.editor_content});
		});
	},[]);

	const postArticle = () =>{
		setisLoading(true);
		fetch(`${window.vibekb.api.url}/user/articles/new`,{
			method:'post',
			body:JSON.stringify({...args,post_content:postContent.post_content,'raw':postContent.raw,token:select('vibebp').getToken()})
		}).then((res)=>res.json())
		.then((data)=>{
			setisLoading(false);
			if(data.status){
				props.created(data.article);
				let followers = select('vibebp').getData('followers');
				let onlineMembers = select('vibebp').getOnlineMembers();
				if(followers && followers.length){
					followers.map((follower)=>{
						if(onlineMembers.indexOf(follower) !== -1){
							dispatch('vibebp').sendRealTimeNotification(follower,data.followermessage);
						}
					});	
				}
			}
		});
	}

	return (
		<div className="new_article">
			{
				showPreview?
				<div className="vibebp_content_preview_wrapper">
					<div className="vibebp_content_preview">
						<div className="new_article_header">
							<span className="vicon vicon-arrow-left" onClick={()=>{setShowPreview(false)}}></span>
						</div>
						<h1 className="title">{args.post_title}</h1>
						<div className="post_content" dangerouslySetInnerHTML={{__html:postContent.post_content}} />
					</div>
				</div>
				:
				''	
			}
				
			<div className="new_article_header">
				<span className="vicon vicon-arrow-left" onClick={props.back}></span>
			</div>
			<div className="new_article_content vibebp_form">
				<div className="vibebp_form_field">
					<label>{window.vibekb.translations.article_title}</label>
					<input type="text" value={args.post_title} onChange={(e)=>{setArgs({...args,post_title:e.target.value})}} />
				</div>
				<div className="vibebp_form_field">
					<select value={args.type} onChange={(e)=>{setArgs({...args,type:e.target.value});}}>
						<option>{window.vibekb.translations.article_category}</option>
						{
							
				 			(	user.hasOwnProperty('caps')
				 				&& compareThis(user.caps,window.vibekb.settings.new_article_category_cap) !== false 
						 	) ?<option value="new_article_category">{window.vibekb.translations.new_article_cateogry}</option>
						 	:''
						}
						{
							kbContext.hasOwnProperty('types') && kbContext.types.length?
								kbContext.types.map((type)=>{
									return (
										<option value={type.term_id}>{type.name}</option>
									)
								})
							:''
						}
					</select>
					{
						args.type == 'new_article_category'?
						<input type="text" placeholder={window.vibekb.translations.new_article_category} value={args.new?args.new:''} onChange={(e)=>{setArgs({...args,new:e.target.value})}} />
						:''
					}
				</div>
				<div className="vibebp_form_field">
					<label>{window.vibekb.translations.article_content}</label>
					<div className="vibe_article_editor">
						<textarea onChange={(e)=>{setArgs({...args,post_content:e.target.value}); setPostContent({...postContent,'post_content':e.target.value});}} value={args.post_content}>
						</textarea>
					</div>
				</div>
				<div className="vibebp_form_field">
					<a className="button is-info" onClick={()=>{setShowPreview(!showPreview)}}>{window.vibekb.translations.preview}</a>
					<a className={isLoading?'button is-primary is-loading':'button is-primary'} onClick={postArticle}>{window.vibekb.translations.submit}</a>
				</div>
			</div>
		</div>
	)
}

export default NewArticle;