const { createElement, useState, useEffect, Fragment, render, useRef} = wp.element;
const { dispatch, select } = wp.data;

const Avatar = (props) => {

  const [avatar,setAvatar] = useState('');


  useEffect(()=>{
    let key ='';
    let type = '';
    switch(props.type){
      case 'friends':
        type = 'user';
        key = props.id.item_id;
      break;
      case 'group':
        type = 'group';
        key = props.id.item_id;
      break;
      case 'activity':
        type = 'user';
        key = props.id.secondary_item_id;
      break;
      case 'user':
        type = 'user';
        key = props.id.user_id;
      break;
      default:
        type = props.type;
        key = props.id.item_id;
      break;
    } 
    localforage.getItem(type+'_'+key).then((stored)=>{
      if(stored !== null){
        setAvatar(JSON.parse(stored)); 
      }else{
        fetch(`${window.vibebp.api.url}/avatar`,{
          method:'post',
          body:JSON.stringify({type:props.type,ids:props.id,token:select('vibebp').getToken()})
        }).then((res)=>res.json())
        .then((data)=>{
          if(data.status){
            localforage.setItem(data.key,JSON.stringify(data.value));
            setAvatar(data.value);
          }
        });
      }
    });
    
  },[]);


  return (
    <img src={avatar.avatar} className="vibebp_avatar" onClick={props.click} alt={avatar.name} title={avatar.name} />
  )
}

export default Avatar;

export const useThrottledEffect = (callback, delay, deps = []) => {
  
  const lastRan = useRef(Date.now());

  useEffect(
    () => {
      const handler = setTimeout(function() {
        if (Date.now() - lastRan.current >= delay) {
          callback();
          lastRan.current = Date.now();
        }
      }, delay - (Date.now() - lastRan.current));

      return () => {
        clearTimeout(handler);
      };
    },
    [delay, ...deps],
  );
};

export const validateUrl = (value) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

export const IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const compareThis = (vars,array) =>{
  let flag = false;
  
  if(!Array.isArray(array))
      return false;

  if(Array.isArray(vars)){
    array.map((item)=>{
      if(vars.indexOf(item) > -1){
        flag= true;
      }
    });
  }else{
    Object.keys(vars).map((item) => {
      if(array.indexOf(item) > -1){
        flag= true;
      }
    });
  }
  
  return flag;
}