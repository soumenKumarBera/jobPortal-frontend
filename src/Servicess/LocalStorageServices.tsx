
const setItem = (key:string, value:any) => {
   localStorage.setItem(key, JSON.stringify(value));

}

const setToken = (key:string, value:any) => {
   localStorage.setItem(key, value);

}

const getItem =(key:string) =>{
   const value = localStorage.getItem(key);

  if (value === null) {
    return null;
  }

  return JSON.parse(value);

}

const removeItem = (key:string) =>{
localStorage.removeItem(key);


}

export {setItem, getItem, removeItem,setToken};