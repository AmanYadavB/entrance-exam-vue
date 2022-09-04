import axios from 'axios'
import store from '../store'
//import config from '../config'

const baseUrl = process.env.VUE_APP_API_URL;

export const codeRunner = async(code) => {
    const codeToSend = {
        data : code
    }
    let response = await fetch(`${baseUrl}/assesments/answer`,{
        method: 'POST',
        body: JSON.stringify(codeToSend),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': store.state.auth.token
        }
    });
    let data = response.json();
    
    return data;
}

export const getAssesments = async(examineeId) =>{
    console.log(store.state.auth.token);
    const response = await axios.get(`${baseUrl}/assesments?userId=${examineeId}`,{
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

export const getAllAssesments = async() =>{
    console.log(store.state.auth.token);
    const response = await axios.get(`${baseUrl}/assesments/allassesments`,{
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

export const getSampleAssesment = async() =>{
    console.log(store.state.auth.token);
    const response = await axios.get(`${baseUrl}/assesments/sample`,{
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

export const addExam = async(exam) =>{
    try{
        const response = await axios.post(`${baseUrl}/assesments/`,exam,
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

export const deleteAssesment = async(examId) =>{
    try{
        const response = await axios.delete(`${baseUrl}/assesments/${examId}`,
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