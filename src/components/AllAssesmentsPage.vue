<template>
<div>
    <div class="text-center">
        <b-spinner variant="info" label="" class="mt-3" v-if="status=='LOADING'"></b-spinner>
    </div>
    <ExaminerNavBar />
    <div :class="{'background-color': assesments.length}" v-if="status=='LOADED' " style="min-height: 38em">
        <ExaminerExamNavBar/>
        <div v-if="assesments.length == 0" class="flex jc-cent w-100 h-100 al-cent">
                <div class="m-5 mt-5 p-5 background-color w-70 h-50 border border-info rounded">
                    <div class="fw-bold fs-1 text-center" >OOps !! <br>No Exam Here</div>
                </div>
            </div>
        <div v-else>
            <div v-for="assesment in assesments" :key="assesment._id">
                <div v-if="true" class="m-4 mt-0 border border-info rounded">
                    <div class="bg-info p-1 ps-2 text-white rounded-top">
                        Assesment no. {{assesments.indexOf(assesment)+1}}
                    </div>
                    <div class=" bg-white p-2 rounded-bottom">
                        <div >
                            <div class="flex jc-space-between">
                                <div class=" question-head">
                                    <span class="fs-4 fw-bold me-2 ">{{assesment.name}}</span> 
                                    <div class="fs-6 fw-bold me-2 p-1">Date : <span class="fw-normal">{{assesment.date.date}} {{getMonth(assesment.date.month)}} {{assesment.date.year}}</span></div>
                                    <div class="fs-6 fw-bold me-2 p-1">Start Time : <span class="fw-normal">{{assesment.startTime.hours>9?assesment.startTime.hours:'0'+assesment.startTime.hours}} : {{assesment.startTime.minutes>9?assesment.startTime.minutes:'0'+assesment.startTime.minutes}}</span></div>
                                    <div class="fs-6 fw-bold me-2 p-1">End Time : <span class="fw-normal">{{assesment.endTime.hours>9?assesment.endTime.hours:'0'+assesment.endTime.hours}} : {{assesment.endTime.minutes>9?assesment.endTime.minutes:'0'+assesment.endTime.minutes}}</span></div>
                                    <div class="fs-6 fw-bold me-2 p-1">Examinees : <span class="fw-normal" v-for="examinee in assesment.examinees" :key="examinee._id"> {{examinee.name}}, </span></div>
                                    <div class="fs-6 fw-bold me-2 p-1">Questions : <span class="fw-normal" v-for="question in assesment.questions" :key="question._id"> {{question.name}}, </span></div>     
                                </div>
                            </div>
                            <div class="flex">
                                <b-button class="mt-1 me-3" variant="warning" :href="`/usersubmittions/${assesment._id}`" >View Submissions</b-button>
                                <b-button class="mt-1 me-3" variant="warning" href="" @click="deleteAssesment(assesment._id)">Delete Exam</b-button>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
//import router from '@/router';
import {getAllAssesments, deleteAssesment} from '../services/assesments';
//import {getAllUserSubmition} from '../services/answers';
import Vue from 'vue';
import ExaminerExamNavBar from './NavBars/ExaminerExamNavBar.vue'
import ExaminerNavBar from './ExaminerNavBar.vue';
export default {
    name: "AllAssesmentsPage",
    data() {
        return {
            primary: "aman",
            status: "LOADING",
            error: "",
            assesments: this.getAllassesments(),
            isLoaded: null,
        };
    },
    methods: {
        async getAllassesments() {
            this.status='LOADING';
            try {
                const response = await getAllAssesments();
                this.assesments = response.data;
                for (let i in this.assesments)
                this.assesments[i] = {
                    ...this.assesments[i],
                    usersSubmition: []
                }
                
                console.log(this.assesments);
                this.status = "LOADED";
            }
            catch (error) {
                this.status = "ERROR";
                this.error = error.message;
            }
        },
        async deleteAssesment(examId) {
            try{
                    const response = await deleteAssesment(examId);
                    console.log(response);
                    Vue.$toast.success('Assesment - '+response.data.name +' Deleted Successfully');
                    
                } catch(error){
                    console.log(error.message);
                    Vue.$toast.error(error.message);
                }
            await this.getAllassesments();
        },
        getMonth (month) {
            let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return monthArray[month-1];
        },
    },
    components: { 
        ExaminerNavBar,
        ExaminerExamNavBar
        },
}
</script>
<style>
    .background-color{
            background-color: rgb(211, 253, 253);
        }
    .button-primary{
            border: 0px solid white;
            border-radius: 0.2em;
            padding: 0.7em;
            background-color: rgb(248, 106, 255);
       }
    .color-primary{
            color: rgb(85, 12, 108);
       }
    .statement{
        height: 3.1em;
        overflow: hidden;
    }
    .flex-end {
        display: flex;
        flex-direction: row-reverse;
    }
    .sticky-end{
        position: sticky;
        bottom: 10px;
    }
    
</style>