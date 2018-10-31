import { AsyncStorage } from "react-native";

const FROGOS_AUTH_KEY = "FROGOS_AUTH";
const FROGOS_TOKEN_KEY = "FROGOS_TOKEN";
const SCHOOL_URL_KEY = "SCHOOL_URL";
const USER_ID_KEY = "USER_ID";
const OAUTH_SECRET_KEY = "OAUTH_SECRET";

retrieveFrogAuth = async() => {
    try{
        const value = await AsyncStorage.getItem(FROGOS_AUTH_KEY);
        // console.log('value: '+value);
        if(value && value.length > 0)
            value = JSON.parse('{"' + (value).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        return value;
    }
    catch(err){
        console.log(err);
        return "Error "+err;
    }
}

storeSchoolUrl = async(value) => {
    try{
        // console.log('storing '+value);
        await AsyncStorage.setItem(SCHOOL_URL_KEY, value);
    }
    catch(err){
      //  console.log("Cannot save school url")
        return "Error "+err;
    }
}
retrieveSchoolUrl = async() => {
    try{
        const value = await AsyncStorage.getItem(SCHOOL_URL_KEY);
        return value;
    }
    catch(err){
       // console.log(err);
        return "Error "+err;
    }
}

storeOAuthSecret = async(value) => {
    try{
        // console.log('storing '+value);
        await AsyncStorage.setItem(OAUTH_SECRET_KEY, value);
    }
    catch(err){
        //console.log("Cannot save auth secret")
        return "Error "+err;
    }
}
retrieveOAuthSecret = async() => {
    try{
        const value = await AsyncStorage.getItem(OAUTH_SECRET_KEY);
        return value;
    }
    catch(err){
      //  console.log(err);
        return "Error "+err;
    }
}


deleteEverything = async() => {
    await AsyncStorage.clear();
}

export { storeFrogAuth, retrieveFrogAuth, storeSchoolUrl, retrieveSchoolUrl, 
      storeOAuthSecret, retrieveOAuthSecret, deleteEverything};