import axios from 'axios'
import store from '../store'
import config from '@/config';
export const registerUser = async(credentials) =>{
    try{
        const response = await axios.post(`${config.baseUrl}/api/auth/register`,credentials);
        const data = response.data;
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        if (error.response.status == 409)
            throw new Error("User Already Registered");
        else
            throw new Error(error.message ||  "Some Error Ocurred");
    }
}

export const getAllExaminees = async() =>{
    const response = await axios.get(`${config.baseUrl}/api/auth/examinees`,
    {
        headers: {
            'Authorization': store.state.auth.token
        }
    });
    const data = response.data;
    console.log(data);
    if(response.status=='404')
        {
            throw new Error('Page Not Found')
        }
    return data;
}

export const loginUser = async(credentials) =>{
    try{
        const response = await axios.post(`${config.baseUrl}/api/auth/login`,credentials);
        const data = response.data;
        //console.log(data);
        return data;
    }
    catch(error){
        throw new Error(error.message ||  "Some Error Ocurred");
    }
}