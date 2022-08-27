<template>
    <div class="">
        <div class="text-center">
            <b-spinner variant="info" label="" v-if="status=='LOADING'"></b-spinner>
        </div>
        <div v-if="status='LOADED'">
            <ExaminerNavBar />
            <div v-for="answer in answers" :key="answer._id" class="p-3 m-3 background-color border border-info rounded">
                <div class="m-2"><strong>Question : </strong>&emsp14;{{answer.question.name}}</div>
                <div class="m-2">
                    <strong>Code: </strong>
                    <div class="bg-white m-2 p-3 border border-info rounded text-code output">
                        {{answer.answer}}
                    </div>
                </div>
                <div><strong>Test Cases Passed : </strong> {{answer.testCasesPassed}} Of {{answer.question.testCases.input.length}}</div>
            </div>
        </div>
        
    </div>
</template>
<script>
//import router from '@/router';
//import Vue from 'vue';
import ExaminerNavBar from './ExaminerNavBar.vue';
import {getAnswer} from '../services/answers'
export default {
    name: 'AnswerPage',
    data () {
        return {
            status: '',
            answers: []
        }
    },
    methods: {
        async getAnswer() {
            try {
                const examId = this.$router.currentRoute.params.examId;
                const userId = this.$router.currentRoute.params.userId;
                const response = await getAnswer(examId, userId);
                this.answers = response.data;
                
                console.log(response);
                this.status = "LOADED";
            }
            catch (error) {
                this.status = "ERROR";
                this.error = error.message;
            }
        }
    },
    created() {
        this.getAnswer();
    },
    components: {
        ExaminerNavBar
    }
}
</script>
<style>
        .text-code {
            font-family:'Courier New', Courier, monospace;
            font-size: small;
            font-weight: lighter;
        }
</style>