import axios from 'axios'
import store from '../store'
import config from '../config'
export const getQuestions = async(id) =>{
        const response = await axios.get(`${config.baseUrl}/assesments/${id}`,
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

export const getAllQuestions = async() =>{
    const response = await axios.get(`${config.baseUrl}/questions`,
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

export const getQuestion = async(id) =>{
    try{
        const response = await axios.get(`${config.baseUrl}/questions/${id}`,
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

export const addQuestion = async(question) =>{
    try{
        const response = await axios.post(`${config.baseUrl}/questions/`,question,
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

export const deleteQuestion = async(questionId) =>{
    try{
        const response = await axios.delete(`${config.baseUrl}/questions/${questionId}`,
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