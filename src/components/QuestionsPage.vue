<template>
<div class="background-color" style="min-height: 38em;">
    <div class="text-center">
        <b-spinner variant="info" label="" v-if="status=='LOADING'"></b-spinner>
    </div>
    <div class="" v-if="status=='LOADED'">
        <div class="shadow sticky">
            <div class="flex jc-space-between pe-4 bg-info text-white">
                <div class="fs-5 fw-bold ps-4 p-2" style="width: 25em;height:2em;overflow:hidden">
                        <a href="/assesments" class="text-white">
                            <b-icon icon="arrow-left" size="lg" class="ms-1 me-2"></b-icon>
                        </a>
                    {{assesment.name}}
                </div>
                <div class="">
                    <div class="fs-5 ms-4 fw-bold bg-white p-2 rounded">
                    <span class="text-info mb-1 fs-6 mt-3" > Assesment Ends In  
                                        {{(getRemainingHours())<10?'0'+(getRemainingHours()):(getRemainingHours())}} : 
                                            {{(getRemainingMinutes())<10?'0'+(getRemainingMinutes()-1):(getRemainingMinutes()-1)}} : 
                                                {{(60-currentTimeSeconds)<10?'0'+(60-currentTimeSeconds):(60-currentTimeSeconds)}}</span>
                    <a href="" class="link-plain text-white"></a>
                </div>
                </div>
            </div>
        </div>
        <div v-for="(question, index) in questions"
        :key="question._id"
        class="m-4 border border-info rounded">
        <div class="bg-info p-2 ps-3 text-white rounded-top">
            Question no. {{index+1}}
        </div>
        <div class="p-3 bg-white rounded-bottom ">
        <div class=" question-head"><span class="fs-4 fw-bold me-2 ">{{question.name}}</span>
        <b-badge class="text-light mb-1 bg-success" v-if="question.difficulty=='easy'">Easy</b-badge>
        <b-badge class="text-light mb-1 bg-warning" v-else-if="question.difficulty=='medium'">Medium</b-badge>
        <b-badge class="text-light mb-1 bg-danger" v-else>Hard</b-badge></div>
        <div class="mb-1 text-wrap statement" >{{question.statement}}
        </div>
        <b-button class="mt-1" variant="warning" @click.prevent="solveQuestion(question._id)" >Solve Question</b-button>
      </div></div>
    </div>
</div>
</template>
<script>
import router from '@/router';
import Vue from 'vue';
//import Vue from 'vue';
import {getQuestions} from '../services/questions'
//import PageNotFound from './utils/PageNotFound.vue';
export default {
    name: "QuestionsPage",
    data() {
        return {
            primary: "aman",
            status: "LOADING",
            error: "",
            assesment: {},
            currentTimeHour: new Date().getHours(),
            currentTimeMinutes: new Date().getMinutes(),
            currentTimeSeconds: new Date().getSeconds(),
            questions: this.getAllQuestions(),
            assesmentId: ''
        };
    },
    methods: {
        async getAllQuestions() {
            this.assesmentId = router.history.current.params.id;
            try {
                const response = await getQuestions(this.assesmentId);
                this.assesment = response.data;
                this.questions = response.data.questions;
                this.status = "LOADED";
            }
            catch (error) {
                this.status = "ERROR";
                this.error = error.message;
            }
        },
        solveQuestion(questionId) {
            this.$router.push({
                path : `/${router.history.current.params.id}/questions/${questionId}`
            })
        },
        compareTime() {
            if(this.currentTimeHour > this.assesment.endTime.hours )
                this.$router.push({path : '/assesments'});
            else if(this.currentTimeHour == this.assesment.endTime.hours) {
                if(this.currentTimeMinutes >= this.assesment.endTime.minutes)
                    {
                        
                        this.$router.push({path : '/assesments'});
                        Vue.$toast.error('Time Expired');
                    }
                        
            }
        },
        getRemainingMinutes() {
            let minutes = this.assesment.endTime.minutes-this.currentTimeMinutes;
            console.log(minutes);
            return minutes>0?minutes:60+minutes;
        },
        getRemainingHours() {
            let minutes = this.assesment.endTime.minutes-this.currentTimeMinutes;
            return minutes>0?this.assesment.endTime.hours-this.currentTimeHour:this.assesment.endTime.hours-this.currentTimeHour-1;
        }
    },
     created () {
         setInterval(() => {
            this.currentTimeHour = new Date().getHours();
            this.currentTimeMinutes = new Date().getMinutes();
            this.currentTimeSeconds = new Date().getSeconds();
            if (this.$router.currentRoute.path != '/assesments')
            this.compareTime();
        },1000)
    }
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
</style>