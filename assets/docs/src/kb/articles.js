const { createElement, useState, useEffect, Fragment, render,useContext} = wp.element;
const { dispatch, select } = wp.data;
import FullArticle from './fullarticle';
import KbContext from './context.js';
import {useThrottledEffect} from '../functions';
import Avatar from '../functions';




const Articles = (props) => {

	const kbContext = useContext(KbContext);

	const [args,setArgs] = useState({type:props.type,article_type:'',page:1,s:'',order:'recent'});
	const [isLoading,setisLoading] = useState(false);
	const [isPagination,setisPagination] = useState(false);
	const [more,setMore] = useState(false);
	const [articles,setArticles] = useState([]);
	const [types,setTypes] = useState([]);
	const [fullArticle,setFullArticle] = useState(false);
	
	const user = select('vibebp').getUser();

	useEffect(()=>{
		console.log('chaned');
		setArgs({...args,type:props.type});
	},[props.type]);

	useThrottledEffect(()=>{
		setisLoading(true);
		fetch(`${window.vibekb.api.url}/user/articles`,{
			method:'post',
			body:JSON.stringify({...args,token:select('vibebp').getToken()})
		}).then((res)=>res.json())
		.then((data)=>{
			setisLoading(false);
			if(data.status){
				if(isPagination){
					let narticles = [...articles,...data.articles];
					if(narticles.length < parseInt(data.total)){
						setMore(true);
					}else{
						setMore(false);
					}
					setisPagination(false);
					setArticles(narticles);
				}else{
					if(data.articles.length < parseInt(data.total)){
						setMore(true);
					}else{
						setMore(false);
					}
					setArticles(data.articles);	
				}
				
			}
		});
		
	},500,[args]);

	useEffect(()=>{
		fetch(`${window.vibekb.api.url}/user/articles/type`,{
			method:'post',
			body:JSON.stringify({token:select('vibebp').getToken()})
		}).then((res)=>res.json())
		.then((data)=>{
			if(data.status){
				setTypes(data.types);
				kbContext.update('types',data.types);
			}
		});
	},[]);

	const updateArticle = (type,data) =>{

		let narticles = [...articles];
		switch(type){
			case 'remove':
				narticles.splice(articles.findIndex((a)=>{return a.id === data}),1);
			break;
			case 'addshared':
				let ashared = [...narticles[articles.findIndex((a)=>{return a.id === data})].shared];
				ashared.push(data);
				narticles[articles.findIndex((a)=>{return a.id === data})].shared=ashared;
			break;
			case 'removeshared':
				let rshared = [...narticles[articles.findIndex((a)=>{return a.id === data})].shared];
				if(rshared.length){
					rshared.splice(shared.indexOf(data),1);
				}
				narticles[articles.findIndex((a)=>{return a.id === data})].shared=rshared;
			break;
			case 'update':
				narticles[articles.findIndex((a)=>{return a.id === data})]=data;
			break;
		}

		setArticles(narticles);
		setFullArticle(false);
	}

	return (
		<div className="vibebp_articles_wrapper">
			{
				fullArticle?
					<FullArticle article={fullArticle} back={()=>{setFullArticle(false)}} update={updateArticle}/>
				:
				<Fragment>
				<div className="vibebp_main_header vibebp_form">
					<div className="vibebp_form_field">
						<input type="text" value={args.s} onChange={(e)=>{setArgs({...args,s:e.target.value});}} placeholder={window.vibekb.translations.search_text} />
						{
							types.length?
								<select value={args.article_type} onChange={(e)=>{setArgs({...args,article_type:e.target.value});}}>
									<option>{window.vibekb.translations.article_category}</option>
									{
										types.length?
											types.map((type)=>{
												return (
													<option value={type.term_id}>{type.name}</option>
												)
											})
										:''
									}
								</select>
							:''
						}
					</div>
					<select value={args.order} onChange={(e)=>{setArgs({...args,order:e.target.value});}}>
						{
							Object.keys(window.vibekb.sorters).map((key)=>{
								return (
									<option value={key}>{window.vibekb.sorters[key]}</option>
								)
							})
						}
					</select>
				</div>
				{

					isLoading?
						<div class="loading-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
					:articles.length?
						<Fragment>
						<div className="vibebp_articles">
						{
							articles.map((article)=>{
								return (
									<div className="vibebp_article" onClick={()=>{setFullArticle(article);}}>
										<div>
										<h3>{article.post_title}</h3>
										<span className="article_meta">
										<span className="article_date">{article.post_date}</span>
										{
											(article.type.length && types.length)?
												article.type.map((type)=>{
													return (
														<span className="article_type">{types[types.findIndex((t)=>{return type == t.term_id})].name}</span>
														)
												})
											:''
										}
										</span>
										</div>
										<div className="vibebp_article_members">
											<Avatar type="user" id={{'user_id':article.post_author}} />
											{
												article.shared && article.shared.length?
													<Fragment>
													{
														article.shared.map((u,i)=>{
															if(i<5){
																return (
																	<Avatar type="user" id={{'user_id':u.user_id}} />
																)
															}
														})
													}
													{
														(article.shared.length >5)?
															<span>+{(article.shared.length-5)}</span>
														:''
													}
													</Fragment>
													
												:''
											}
										</div>
									</div>
								)
							})
						}
						</div>
						{
							more?
								<a className="link" onClick={()=>{setisPagination(true);setArgs({...args,page:args.page+1});}}>{window.vibekb.translations.load_more}</a>
							:''
						}
						</Fragment>
					:<div className="vbp_message">{window.vibekb.translations.no_articles}</div>
				}
				</Fragment>
			}
		</div>
	)
}

export default Articles;