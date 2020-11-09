//import { Settings } from '@material-ui/icons';
import axios from 'axios';
import https from 'https';
//import { NavigationExpandLess } from 'material-ui/svg-icons';



const makeRequest = async (method, id = '',  resource = {}, api='unit') => {
  const agent = new https.Agent({rejectUnauthorized : false});
  //  console.log(JSON.stringify(resource))
  let baseURL = process.env.REACT_APP_BASE_URL;
//  let settings = new SettingsLoader();
  baseURL = baseURL + "api/" + api;

  console.log("using API :" + baseURL);

  return axios(`${baseURL}/${id}`, {
    method,
    httpsAgent : agent,
    headers : {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, PATCH',
    }, 
    
    data: JSON.stringify(resource),
    responseType :'json'
  })
}

export default makeRequest;
