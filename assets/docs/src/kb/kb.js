const { createElement, useState, useEffect, Fragment, render,useContext} = wp.element;
const { dispatch, select } = wp.data;

	
import KbContext from './context';
import NewArticle from './newarticle';
import FullArticle from './fullarticle';
import Articles from './articles';

const Kb = (props) => {

	const [kbContext,setKbContext] = useState({});
	const user = select('vibebp').getUser();
	
	const updateContext = (type,value) =>{
		let nkbContext = {...kbContext};
		if(type === 'remove'){
			delete nkbContext[value];
		}else{
			nkbContext[type] = value;
		}		
		setKbContext(nkbContext);
	}

	const [kbFilters,setKbFilters] = useState([]);
	const [args,setArgs] = useState([]);
	const [activeTab,setActiveTab] = useState(false);
	const [newArticle,setNewArticle] = useState(false);
	const [fullArticle,setFullArticle] = useState(false);

	useEffect(()=>{
		let kb_filters = select('vibebp').getMenu().filter((item)=>{return item.parent === 'kb'});
		kb_filters.map((filter,index)=>{
			if(kb_filters.findIndex((item)=>{return item.class.indexOf('current-menu-item') > -1}) === -1){
				kb_filters[index].class.push('current-menu-item');
			}
		});
		setKbFilters(kb_filters);
	},[]);

	return (
		<div className="vibebp_sidebars">
			<div className="vibebp_left_sidebar_wrapper">
			<div className="vibebp_left_sidebar">
				<h3>{window.vibekb.label}</h3>
				{
					(	user.hasOwnProperty('caps') &&
		 				user.caps.hasOwnProperty(window.vibekb.settings.new_article_cap)
				 	) ?<a className="button is-primary new_mail" onClick={()=>{setNewArticle(true)}}>{window.vibekb.translations.create_article}</a>
					:''
				}
				
				{
					kbFilters.map((filter,i)=>{
						let classs = filter.class.join(' ')+' '+filter.css_id;
					
						return (
							<a className={classs} onClick={(e)=>{
								let nargs = {...args}; 

								nargs.filter=filter.css_id; 
								nargs.page = 1;

								if(args.css_id !== nargs.filter){
									setArgs(nargs);
								}

								setActiveTab(filter.css_id);
								let ffilters = [...kbFilters];

								let index = ffilters.findIndex((item)=>{return item.class.indexOf('current-menu-item') > -1});
								ffilters[index].class.splice(ffilters[index].class.indexOf('current-menu-item'),1);
								ffilters[i].class.push('current-menu-item');
								setKbFilters(ffilters);
							}}
							>{filter.name}</a>
						)
					})
				}
			</div>
			</div>
			<div className="vibebp_main">
				<KbContext.Provider value={{...kbContext,update:updateContext}}>
				{
					fullArticle?
					<FullArticle article={fullArticle} back={()=>{setNewArticle(false);setFullArticle(false);}} />
					:newArticle?
					<NewArticle back={()=>{setNewArticle(false)}} created={(article)=>{setFullArticle(article)}} />
					:activeTab === 'shared_articles'?<Articles type="shared" />
					:activeTab === 'my_articles'?<Articles type="mine" />
					:<Articles type="all" />
				}
				</KbContext.Provider>
			</div>
		</div>
	)
}

export default Kb;