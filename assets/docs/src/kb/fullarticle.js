const { createElement, useState, useEffect, Fragment, render,useContext} = wp.element;
const { dispatch, select } = wp.data;

import KbContext from './context';

import NewArticle from './newarticle';
import {useThrottledEffect} from '../functions';
import Avatar from '../functions';


const FullArticle = (props) => {

	const kbContext = useContext(KbContext);
	const user = select('vibebp').getUser();

	const [editArticle,setEditArticle] = useState(false);
	const [fullArticle,setFullArticle] = useState(props.article);
	const [addParticipants,setAddParticipants] = useState(false);
	
	const [participantSearch,setParticipantSearch] = useState('');
	const [isSearching,setIsSearching] = useState(false);
	const [searchResults,setSearchResults] = useState([]);

	const deletePost = () =>{
		fetch(`${window.vibekb.api.url}/user/articles/trash`,{
			method:'post',
			body:JSON.stringify({token:select('vibebp').getToken(),article_id:fullArticle.id})
		}).then((res)=>res.json())
		.then((data)=>{
			if(data.hasOwnProperty('message')){
				dispatch('vibebp').addNotification({
					text:data.message
				});
			}
			if(data.status){
				props.update('remove',fullArticle.id);
			}

		});
	}

	useThrottledEffect(()=>{
		if(participantSearch.length > 4){
			setIsSearching(true);
			fetch(`${window.vibebp.api.url}/search`,{
				method:'post',
				body:JSON.stringify({search:participantSearch,type:'user',token:select('vibebp').getToken()})
			}).then((res)=>res.json())
			.then((data)=>{
				setIsSearching(false);
				if(data.status) {
					if(Array.isArray(data.results)){
						setSearchResults(data.results);
					}
				}
			});
		}
	},500,[participantSearch]);

	const addShared = (usr,i) =>{
		setParticipantSearch('');
		let nsearchResults = [...searchResults];
		let nfullArticle = {...fullArticle}; 
		if(!nfullArticle.shared){nfullArticle.shared=[];}
		if(nfullArticle.shared.indexOf(usr.id) === -1){
			nfullArticle.shared.push(usr.id);
			setFullArticle(nfullArticle);
			nsearchResults.splice(i,1);
			setSearchResults(nsearchResults);
		}

		fetch(`${window.vibekb.api.url}/user/articles/addShared`,{
			method:'post',
			body:JSON.stringify({article_id:fullArticle.id,user_id:usr.id,token:select('vibebp').getToken()})
		}).then((res)=>res.json())
		.then((data)=>{
			if(data.status) {
				if(data.hasOwnProperty('message')){
					dispatch('vibebp').addNotification({
						text:data.message
					});
					let olusers = select('vibebp').getOnlineMembers();
					if(olusers && olusers.indexOf(usr.id) !== -1){
						dispatch('vibebp').sendRealTimeNotification(usr.id,data.recievingmessage);	
					} 
				}
				props.update('addshared',usr.id);
			}
		});
	}

	const removeShared = (usr,i) => {
		let nfullArticle = {...fullArticle}; 
		nfullArticle.shared.splice(nfullArticle.shared.indexOf(usr),1);
		setFullArticle(nfullArticle);
		fetch(`${window.vibekb.api.url}/user/articles/removeShared`,{
			method:'post',
			body:JSON.stringify({article_id:fullArticle.id,user_id:usr.id,token:select('vibebp').getToken()})
		}).then((res)=>res.json())
		.then((data)=>{
			if(data.status) {
				if(data.hasOwnProperty('message')){
					dispatch('vibebp').addNotification({
						text:data.message
					});
				}
				props.update('removeshared',usr.id);
			}
		});
	}

	console.log(fullArticle);
	return (
		<Fragment>
			{
			editArticle?
				<NewArticle article={fullArticle} created={(article)=>{setFullArticle(article);props.update('update',article);}} back={()=>{setEditArticle(false)}} />
			:
			<div className="vibebp_full_article_wrapper">
				<div className="vibebp_articles_header">
					<span className="vicon vicon-arrow-left" onClick={props.back}></span>						
					<span>
						{
							(fullArticle.post_author === user.id)?
								<span>
									<span className="vicon vicon-pencil" onClick={()=>{setEditArticle(true)}}></span>
									<span className="vicon vicon-trash" onClick={deletePost}></span>
								</span>
							:(fullArticle.shared.indexOf(user.id) > -1 )?
								<span>
									<span className="vicon vicon-pencil" onClick={()=>{setEditArticle(true)}}></span>
									<Avatar type="user" id={{user_id:parseInt(fullArticle.post_author)}} />
								</span>
							:<Avatar type="user" id={{user_id:parseInt(fullArticle.post_author)}} />
						}
					</span>
				</div>
				<h1>{fullArticle.post_title}</h1>
				<span className="article_meta">
					<span className="article_date">{fullArticle.post_date}</span>
					{
							fullArticle.type && fullArticle.type.length?
								<span className="article_type">
								{
									fullArticle.type.map((type)=>{
										return (
											<span>{kbContext.types[kbContext.types.findIndex((t)=>{return type == t.term_id})].name}</span>
										)
									})
								}
								</span>
							:''
						}
				</span>
				<div className="vibebp_article_content" dangerouslySetInnerHTML={{__html:fullArticle.post_content}}></div>
				<div className="article_participants">
					<Avatar type="user" id={{user_id:fullArticle.post_author}} />
					{
						fullArticle.shared && fullArticle.shared.length?
						<Fragment>
						{
							fullArticle.shared.map((share)=>{
								return (
										<Avatar type="user" id={{user_id:share}} click={()=>{removeShared(share)}} />
								)
							})
						}
						</Fragment>
							
						:''
					}
					{
						fullArticle.post_author === user.id?
						<span onClick={()=>{setAddParticipants(!addParticipants)}}><span className={addParticipants?'vicon vicon-close':'vicon vicon-plus'}></span></span>
						:''
					}					
				</div>
				{
					addParticipants?
					<Fragment>
					<div className={isSearching?'vibebp_form control is-loading':'vibebp_form control'}>
					  	<input className="vibebp_form_field" type="text" value={participantSearch} placeholder={window.vibekb.translations.search_member} onChange={(e)=>{setParticipantSearch(e.target.value)}} />
					</div>
					{
						searchResults.length?
							<div className="search_results">
								{
									searchResults.map((usr,i)=>{
										return (
											<div className="search_result user" onClick={()=>{addShared(usr,i)}}>
												<img src={usr.avatar} />
												<span>{usr.name}</span>
											</div>
										)
									})
								}
							</div>
						:''
					}
					</Fragment>
					:''
				}
				</div>
			}
		</Fragment>
	)
}

export default FullArticle;