import axios from "axios";
import ApiList from "../config/apiList.json";
import qs from "querystring";
var config = {
    headers: { 
        'Content-Type': 'application/application/json'

 },
    responseType: 'blob'
  };
  axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaW1hZ2VVcmwiOiJ7dHlwZTogU3RyaW5nLCBkZWZhdWx0OiB9IiwibW9iaWxlIjoiNzA1Nzg4NDQzNiIsInRva2VuIjpudWxsLCJzdGF0dXMiOjEsImxhc3RDaGVja2VkIjoiMjAyMC0wMS0yNlQxODowODozNS40NTVaIiwiX2lkIjoiNWUzMWM3YTVjNTk5ODE3MWE1MDA5MzVmIiwidXNlclR5cGUiOiJ1c2VyIiwiZW1haWwiOiJzaHViaGFtQGdtYWlsLmNvbSIsInBlcnNvbmFsRGV0YWlscyI6eyJuYW1lIjoiU2h1YmhhbSBBbmFuZCJ9LCJwYXNzd29yZCI6InF3ZXJ0eSIsImNvdXJzZXMiOltdLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTI5VDE3OjU3OjU3LjM1NFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTI5VDE3OjU3OjU3LjM1NFoiLCJfX3YiOjB9LCJpYXQiOjE1ODAzMjA2Nzd9.eP_NgwWH9Ss-43O9KyFRlQJ7Y6YwuCM_L9tdyGaL05U' // for all requests

export const getCourses = datastring => {
    console.log(datastring)
	return axios.get(`${ApiList.env}${ApiList.endpoint.courses}`, (datastring), {
		headers: {
            'Content-Type' : 'application/json'
        },
        mode: 'no-cors'
    });
};
