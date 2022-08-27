<template>
<div>
    <div class="text-center">
        <b-spinner variant="info" label="" v-if="status=='LOADING'"></b-spinner>
    </div>
    <ExaminerNavBar />
    <div class="background-color pt-4" v-if="status=='LOADED'">
        <ExaminerQuestionNavBar />
        <div v-for="(question, index) in questions" :key="question._id">
            <div v-if="true" class="m-4 mt-0 border border-info rounded">
                <div class="bg-info p-1 ps-2 text-white rounded-top">
                    Question no. {{index+1}}
                </div>
                <div class="bg-white p-2 rounded-bottom">
                    <div class=" question-head"><span class="fs-4 fw-bold me-3 ">{{question.name}}</span>
                        <b-badge class="text-light mb-1 bg-success" v-if="question.difficulty=='easy'">Easy</b-badge>
                        <b-badge class="text-light mb-1 bg-warning" v-else-if="question.difficulty=='medium'">Medium</b-badge>
                        <b-badge class="text-light mb-1 bg-danger" v-else>Hard</b-badge>
                    </div>
                    <div class="mb-3 text-wrap statement" >{{question.statement}}</div>
                    <b-collapse :id="question._id">
                        <div class="fs-5 fw-bold me-2 mb-3 p-3 background-color rounded border border-info">Input Format : <br /><span class="fw-normal fs-6" v-for="(inputType, index) in question.inputFormat.type" :key="inputType"> <strong>{{index+1}}. Type:</strong> {{question.inputFormat.type[index]}} &emsp14; <strong>Description:</strong>  {{question.inputFormat.description[index]}}<br /></span></div>
                        <div class="fs-5 fw-bold me-2 mb-3 p-3 background-color rounded border border-info">Output Format : <br /><span class="fw-normal fs-6" > <strong>Type:</strong> {{question.outputFormat.type}} &emsp14; <strong>Description:</strong> {{question.outputFormat.description}}<br /></span></div>
                        <div class="fs-5 fw-bold me-2 mb-3 p-3 background-color rounded border border-info">Constraints : <br /><span class="fw-normal fs-6" v-for="(constraint, index) in question.constraints" :key="index"><strong>{{index+1}}.</strong> {{constraint}}<br /></span></div>
                        <div class="fs-5 fw-bold me-2 mb-3 p-3 background-color rounded border border-info">Sample Test Cases : <br /><span class="fw-normal fs-6" v-for="(input, index) in question.sampleTestCases.input" :key="input"><strong>{{index+1}}. Input:</strong> {{question.sampleTestCases.input[index]}} <strong>Output:</strong> {{question.sampleTestCases.output[index]}} <br /> <strong>Explanation:</strong> {{question.sampleTestCases.explanation[index]}}<br /></span></div>
                        <div class="fs-5 fw-bold me-2 mb-3 p-3 background-color rounded border border-info">Test Cases : <br /><span class="fw-normal fs-6" v-for="(input, index) in question.testCases.input" :key="input"><strong>{{index+1}}. Input:</strong> {{question.testCases.input[index].replace(/[{}]/gi,"")}} <strong>ExpectedOutput:</strong> {{question.testCases.expectedOutput.replace(/[{}]/gi,"").split(",")[index]}} <br /></span></div>
                    </b-collapse>
                    <b-button v-b-toggle="question._id"  class="mt-1 me-3" variant="warning" @click.prevent >View More / Less</b-button>
                    <b-button class="mt-1 me-3" variant="warning" href="" @click="deleteQuestion(question._id)">Delete Question</b-button>
                </div>
            </div>
      </div>
    </div>
</div>
</template>
<script>
//import router from '@/router';
import {getAllQuestions, deleteQuestion} from '../services/questions'
import ExaminerNavBar from './ExaminerNavBar.vue';
import ExaminerQuestionNavBar from './NavBars/ExaminerQuestionNavBar.vue';
import Vue from 'vue';

//import PageNotFound from './utils/PageNotFound.vue';
export default {
    name: "AllQuestionsPage",
    data() {
        return {
            primary: "aman",
            status: "LOADING",
            error: "",
            questions: [],
            assesmentId: "",
            toggleQuestionsView: []
        };
    },
    methods: {
        async getAllQuestions() {
            try {
                const response = await getAllQuestions();
                this.questions = response.data;
                for (let question in this.questions) {
                    console.log(question);
                    this.questions[question] = {
                    ...this.questions[question],
                    view : false
                }
                }
                
                console.log(this.questions);
                this.status = "LOADED";
            }
            catch (error) {
                this.status = "ERROR";
                this.error = error.message;
            }
        },
        async deleteQuestion(questionId) {
            try{
                    const response = await deleteQuestion(questionId);
                    console.log(response);
                    Vue.$toast.success('Question - '+response.data.name +' Deleted Successfully');
                    
                } catch(error){
                    console.log(error.message);
                    Vue.$toast.error(error.message);
                }
            await this.getAllQuestions();
        },
        viewQuestion(index) {
            this.questions[index].view = !this.questions[index].view;
            return;
        },
        toggle(index) {
            console.log(index);
            console.log(this.toggleQuestionsView[index])
            let carnage = !!this.toggleQuestionsView[index];
            return carnage;
        }
    },
    async created() {
        await this.getAllQuestions();
        for (let i = 0; i < this.questions.length; i++)
            this.toggleQuestionsView[i] = false;
    },
    components: { 
    ExaminerNavBar,
    ExaminerQuestionNavBar }
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