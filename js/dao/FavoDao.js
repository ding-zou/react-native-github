import {
    AsyncStorage,
} from 'react-native';

export var FLAG_LANGUAGE = {flag_language: 'language_dao_language', flag_key: 'language_dao_key'}

export default class FavoDao{
    constructor(){
    }
    saveFavoItem(type, item, isAdd) {
        if (!item || !type) return;
        AsyncStorage.getItem(type,(error,result)=>{
            if (!error) {
              var favoriteKeys=[];
              if (result) {
                favoriteKeys=JSON.parse(result);
              }
              var index=favoriteKeys.indexOf(item.item);
              if(isAdd){
                if (index===-1)favoriteKeys.push(item.item);
              }else {
                if (index!==-1)favoriteKeys.splice(index, 1);
              }
              AsyncStorage.setItem(type,JSON.stringify(favoriteKeys));
            }
          });
    }
    
    fetchFavo(type){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(type, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }
}

