<template>
<div>
    <div class="text-center" v-if="status=='LOADING'">
        <b-spinner variant="info" label="" class="mt-3" ></b-spinner>
    </div>
    
    <div :class="{'background-color': assesments.length != 0 && !assesments.reduce((acc, cur) => acc && isEnded(cur),true)}" v-if="status=='LOADED' " style="min-height: 100vh">
        <ExamineeNavBar />
        <div v-if="(assesments.length == 0 || assesments.reduce((acc, cur) => acc && isEnded(cur),true)) " class="flex jc-cent w-100 h-100 al-cent">
                <div class="m-5 p-5 flex jc-cent al-cent background-color w-70 h-100 border border-info rounded" style="min-height: 25em">
                    <div class="fw-bold fs-1 text-center flex-basis-100" >OOps !! <br>No Exam Today</div>
                    <div class="flex jc-cent p-4">
                        <div>
                            <b-button variant="info" class="p-2" :href="`/${sampleExam._id}/questions`">
                                Give a Sample Exam
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        <div v-else>
            <div v-for="assesment in assesments" :key="assesment._id">
                <div v-if="!isEnded(assesment)">
                <div class="m-4 border bg-info border-info rounded">
                    <div class=" p-1 ps-2 text-white rounded-top">
                        Assesment no. {{assesments.indexOf(assesment)+1}}
                    </div>
                    <div class="bg-white p-3 rounded-bottom">
                        <div class="flex jc-space-between">
                            <div class=" question-head">
                                <span class="fs-4 fw-bold me-2 ">{{assesment.name}}</span>   
                            </div>
                            <div>
                                <div v-if="!isStarted(assesment)" >
                                    <b-badge class="text-light mb-1 fs-6 bg-warning mt-3" > Little Early For the Assesment </b-badge> <br>
                                    <!--<b-badge class="text-light mb-1 fs-6 bg-warning mt-3" >Assesment Starts In  {{assesment.startTime.hours-currentTimeHour}} : {{assesment.startTime.minutes-currentTimeMinutes}} : {{60-currentTimeSeconds}}</b-badge>-->
                                </div>
                                <div v-else-if="isEnded(assesment)">
                                    <b-badge class="text-light mb-1 fs-6 bg-danger mt-3" > Assesment Ended</b-badge>
                                </div>
                                <div v-else-if="isStarted(assesment) && !isEnded(assesment)">
                                    <b-badge class="text-light mb-1 fs-6 bg-success mt-3" > Assesment Ends In  
                                        {{(getRemainingHours(assesment))<10?'0'+(getRemainingHours(assesment)):(getRemainingHours(assesment))}} : 
                                            {{(getRemainingMinutes(assesment)-1)<10?'0'+(getRemainingMinutes(assesment)-1):(getRemainingMinutes(assesment))-1}} : 
                                                {{(60-currentTimeSeconds)<10?'0'+(60-currentTimeSeconds):(60-currentTimeSeconds)}}</b-badge>
                                </div>
                                    </div>
                                </div>
                            <b-button class="mt-1" variant="warning" :href="`/${assesment._id}/questions`" :disabled="!isStarted(assesment) || isEnded(assesment)">Start Assesment</b-button>
                            
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
import {getSampleAssesment, getAssesments} from '../services/assesments'
import ExamineeNavBar from './ExamineeNavBar.vue';
export default {
    name: "AssesmentsPage",
    data() {
        return {
            primary: "aman",
            status: "LOADING",
            error: "",
            assesments: this.getTodayassesments(),
            currentDateAndTime: this.getTodayDate(),
            currentDate: null,
            currentTime: null,
            isLoaded: null,
            examCount : 0,
            sampleExam : {}
        };
    },
    methods: {
        async getTodayassesments() {
            this.status='LOADING';
            try {
                const response = await getAssesments(this.$store.state.auth.userId);
                //this.assesments = response.data;
                //console.log(this.assesments.reduce((acc, cur) => acc && this.isEnded(cur),true));
                //console.log(this.assesments);
                this.assesments = response.data.filter(assesment => assesment.name!='Sample Exam');
                const response1 = await getSampleAssesment();
                this.sampleExam = response1.data;
                this.status = 'LOADED';
            }
            catch (error) {
                this.status = 'ERROR';
                this.error = error.message;
            }
            
        },
        isStarted(assesment) {
            let assesmentStartTime = new Date(assesment.date.year,assesment.date.month-1,assesment.date.date,assesment.startTime.hours,assesment.startTime.minutes);
           return this.currentDateAndTime >= assesmentStartTime;
        },
        isEnded(assesment){
            let assesmentEndTime = new Date(assesment.date.year,assesment.date.month-1,assesment.date.date,assesment.endTime.hours,assesment.endTime.minutes);
            return this.currentDateAndTime > assesmentEndTime;
        },
        getTodayDate(){
            let date = new Date();
            return date;
        },
        getEndTime(assesment){
            let endDate = new Date(assesment.date.year,assesment.date.month-1,assesment.date.date,assesment.endTime.hours,assesment.endTime.minutes).toLocaleTimeString();
            console.log(endDate);
            return endDate;
        },
        getCurrentdateAndTime(){
            let date = new Date();
            this.currentDateAndTime = date;
            this.currentDate = date.toLocaleDateString();
            this.currentTime = date.toLocaleTimeString();
        },
        isExamToday(assesment) {
           if ( assesment.date.date == this.currentDateAndTime.getDate() 
                    && assesment.date.month == this.currentDateAndTime.getMonth() 
                        && assesment.date.year == this.currentDateAndTime.getFullYear())
            {
                this.examCount+=1;
                return true;
            }
            else 
            return false;
        },
        getRemainingMinutes(assesment) {
            let minutes = assesment.endTime.minutes-this.currentTimeMinutes;
            console.log(minutes);
            return minutes>0?minutes:60+minutes;
        },
        getRemainingHours(assesment) {
            let minutes = assesment.endTime.minutes-this.currentTimeMinutes;
            return minutes>0?assesment.endTime.hours-this.currentTimeHour:assesment.endTime.hours-this.currentTimeHour-1;
        }
    },
    computed: {
        currentTimeHour() {
             return this.currentDateAndTime.getHours();
        },
        currentTimeMinutes() {
             return this.currentDateAndTime.getMinutes();
        },
        currentTimeSeconds() {
            return this.currentDateAndTime.getSeconds();
        },
        
    },
    components: { ExamineeNavBar},
    mounted () {
         setInterval(() => {
            this.getCurrentdateAndTime();
        },1000)
    }
}
</script>
<style>
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