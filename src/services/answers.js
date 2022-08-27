import axios from 'axios'
import store from '../store'
import config from '../config'

export const getAllUserSubmition = async(examId) =>{
    console.log(store.state.auth.token);
    const response = await axios.get(`${config.baseUrl}/answers/users/${examId}`,{
        headers: {
            'Content-Type': 'application/json',
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

export const getAnswer = async(examId, userId) =>{
    console.log(store.state.auth.token);
    const response = await axios.get(`${config.baseUrl}/answers/answerbyuser/${examId}?userId=${userId}`,{
        headers: {
            'Content-Type': 'application/json',
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

export const submitAnswer = async(answer) =>{
    try{
        const response = await axios.post(`${config.baseUrl}/answers/`,answer,
        {
            headers: {
                'Authorization': store.state.auth.token
            }
        });
        const data = response.data;
        console.log(data);
        return data;
    }
    catch(error){
        throw new Error(error.message ||  "Some Error Ocurred");
    }
}