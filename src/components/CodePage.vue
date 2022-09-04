<template>
  <div class="body background-color">
    <div class="text-center" v-if="status=='LOADING'">
        <b-spinner variant="info" label="" class="mt-3" ></b-spinner>
    </div>
    <div class="shadow sticky" v-if="status=='LOADED'">
            <div class="flex jc-space-between pe-4 bg-info text-white">
                <div class="fs-5 fw-bold ps-4 p-2 " style="width: 25em;height:2em;overflow:hidden">
                        <a :href="`/${assesmentId}/questions`" class="text-white">
                            <b-icon icon="arrow-left" size="lg" class="ms-1 me-2"></b-icon>
                        </a>
                    {{assesment.name}}
                </div>
                <div class="fs-5 fw-bold ms-4 bg-white p-2 rounded" v-if="assesment.name!='Sample Exam'">
                    <span class="text-info mb-1 fs-6 mt-3" > Assesment Ends In  
                                        {{(getRemainingHours())<10?'0'+(getRemainingHours()):(getRemainingHours())}} : 
                                            {{(getRemainingMinutes()-1)<10?'0'+(getRemainingMinutes()-1):(getRemainingMinutes()-1)}} : 
                                                {{(60-currentTimeSeconds)<10?'0'+(60-currentTimeSeconds):(60-currentTimeSeconds)}}</span>
                </div>
                <b-button variant="info" @click="toggleShowQuestion" class="text-white mt-1 d-lg-none d-md-none">
                <b-icon icon="eye" class="me-1" v-if="showQuestion"></b-icon>
                <b-icon icon="eye-slash" v-else class="me-1"></b-icon>
                {{showQuestionText}}</b-button>
            </div>
        </div>
    <div class="flex container-div jc-space-between ms-3" v-if="status=='LOADED'">
            <div class="question-area jc-space-between border bg-warning-light border-primary mt-3 mb-3 rounded flex-basis-50 p-1 shadow" >
                <div class="bg-info p-2 rounded fs-5 fw-bold m-2 mb-3 border border-primary shadow"><span class="text-light">{{question.name}}</span></div>
                <div class="rounded m-2 mb-3 border border-primary bg-white shadow" id="question-code">
                    <h5 class="bg-info p-2 text-light rounded-top fw-bold">Statement</h5>
                    <ul class="">
                        <li>
                            {{question.statement}}
                        </li>
                    </ul>  
                </div>
                <div class="rounded m-2 mb-3 border border-primary bg-white shadow">
                    <h5 class=" p-2 bg-info text-light rounded-top fw-bold">Input Format</h5>
                    <ul>
                        <li v-for="input in inputFormat.description" :key="input.type">
                            {{input}}
                        </li>
                    </ul>  
                </div>
                <div class="rounded m-2 mb-3 border border-primary bg-white shadow">
                    <h5 class="bg-info text-light p-2 rounded-top fw-bold">Output Format</h5>
                    <ul>
                        <li>
                            {{outputFormat.description}}
                        </li>
                    </ul>  
                </div>
                <div class="rounded m-2 mb-3 border border-primary bg-white shadow">
                    <h5 class="bg-info text-light p-2 rounded-top fw-bold">Constraints</h5>
                    <ul>
                        <li v-for="constraint in question.constraints" :key="constraint">
                            {{constraint}}
                        </li>
                    </ul>  
                </div>
                <div class="rounded m-2 mb-3 border border-primary bg-white shadow">
                    <h5 class="bg-info text-light p-2 rounded-top fw-bold">Sample Test Cases</h5>
                    <ul>
                        <li>
                            <h6 class="fw-bold">
                             Input
                             </h6>
                             <ul>
                                <li v-for="input in sample.input" :key="input">
                                    {{input}}
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h6 class="fw-bold">
                             Output
                            </h6>
                             <ul>
                                <li v-for="output in sample.output" :key="output">
                                   {{output}}
                                </li>
                            </ul>
                        </li>
                        <li>
                           <h6 class="fw-bold">
                             Explanation
                             </h6>
                             <ul>
                                <li v-for="explanation in sample.explanation" :key="explanation">
                                    {{explanation}}
                                </li>
                            </ul>
                        </li>
                    </ul>  
                </div>
        </div>
        <div class="code-area jc-space-between flex-basis-50 me-3 mt-3 mb-3 shadow bg-white border border-info rounded">
            <div class="border rounded">
                <div class="flex">
                <div>
                    <button class="p-2 mt-3 rounded-circle" style="height: 1em" @click="changeThemeLight"> </button>
                    <button class="p-2 mt-3 rounded-circle bg-dark" style="height: 1em" @click="changeThemeDark"> </button>
                </div>
                <div class="p-2 bg-info text-light fs-5 fw-bold border text-center rounded-top flex-basis-45">Code Writer</div>
                
                <b-form-select v-model="language" @input="changeLanguage"  class="flex-basis-45 p-2 fs-6 fw-bold text-white bg-warning border border-warning rounded">
                    <b-form-select-option value="java" >Java</b-form-select-option>
                    <b-form-select-option value="c_cpp" >C++</b-form-select-option>
                    <b-form-select-option value="python">Python</b-form-select-option>
                </b-form-select>
                
                </div>
                
                <div name="" id="editor" rows="30" class=" border rounded-bottom" autofocus spellcheck="false" style="height: 33em;"></div>
            </div>
            <b-button class="bg-warning m-1 p-2 border border-light text-dark" v-b-toggle="'question-code'" @click="runTestCodes" > 
            <b-spinner small v-if="runStatus=='LOADING'" class="me-1"></b-spinner>
                <span class="sr-only ms-1 p-1" v-if="runStatus=='LOADING'">Loading...</span> 
                <span class="sr-only" v-else><a class="text-dark link-plain" >Run Test Cases</a></span>
            </b-button>
            <b-button class="bg-warning m-1 p-2 border border-light text-dark" @click="submitCode">
            <b-spinner small v-if="submitStatus=='LOADING'" class="me-1"></b-spinner>
                <span class="sr-only ms-1 p-1" v-if="submitStatus=='LOADING'">Loading...</span> 
                <span class="sr-only" v-else><a class="text-dark link-plain" >Submit Code</a></span>
            </b-button>
        </div>
    </div>
     <div class="m-3 shadow border border-warning bg-white rounded outputDiv" v-if="outputStatus" id="output">
                <h3  class="bg-warning text-light fs-5 fw-bold border p-2 rounded">Output</h3>
                <div v-if="status=='LOADED'" class="p-2 output">
                    <div v-if="outputStatus == 'Runtime Error'">Runtime Error</div>
                    <div v-if="outputStatus == 'Compilation Error'" class="fs-5 fw-bold">
                        <b-card
                                border-variant="danger"
                                header="Compile Time Error"
                                header-bg-variant="danger"
                                header-text-variant="white"
                                class="mb-3"
                            >
                                <div class="fs-6 fw-normal text-danger bg-white" v-if="language=='java'">{{output.substring(20,output.length-40)}}</div>
                                <div class="fs-6 fw-normal text-danger bg-white" v-if="language=='python'">{{output}}</div>
                                <div class="fs-6 fw-normal text-danger bg-white" v-if="language=='c_cpp'">{{output}}</div>
                        </b-card>
                    </div>
                    <div v-if="outputStatus=='success'">
                        <div class="bg-info p-3 m-1 mb-3 fs-4 fw-bold text-white border border-primary rounded">{{passedTestCases}} of {{question.testCases.input.length}} test cases passed</div>
                        <div v-for="(testCase, i) of testCaseOutput" :key="testCase">
                            <div
                                v-if="testCase.status == 'passed'"
                                class="border border-success mb-3 rounded"
                            >
                                <div class="p-2 text-white bg-success rounded-top">
                                    Test Case Passed
                                </div>
                                <div class="rounded-bottom p-2">
                                    <div class="fs-5 fw-bold">Input</div>
                                    <span class="">{{question.testCases.input[i].replace(/{|}/gi,"")}} </span>
                                    <div class="fs-5 fw-bold">Your Output</div>{{testCase.output}}
                                    <div class="fs-5 fw-bold">Expected Output</div>{{expectedOutputArr[i].replace(/{|}/gi,"")}}
                                </div> 
                            </div>
                            <div
                                v-if="testCase.status == 'failed'"
                                class="mb-3 border border-danger mb-3 rounded"
                            >
                                <div class="p-2 text-white bg-danger rounded-top">
                                    Test Case Failed
                                </div>
                                <div class="rounded-bottom p-2">
                                    <div class="fs-5 fw-bold">Input</div>
                                    <span class="">{{question.testCases.input[i].replace(/{|}/gi,"")}} </span>
                                    <div class="fs-5 fw-bold">Your Output</div>{{testCase.output}}
                                    <div class="fs-5 fw-bold">Expected Output</div>{{expectedOutputArr[i].replace(/{|}/gi,"")}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </div>
</template>

<script>
//import "https://cdnjs.cloudflare.com/ajax/libs/ace/1.9.5/ace.js"
import {codeRunner} from '../services/assesments'
import { getQuestion } from '@/services/questions'
import { getQuestions } from '@/services/questions'
import {submitAnswer} from '../services/answers'
import * as ace from 'brace'
import 'brace/mode/java'
import 'brace/mode/javascript'
import 'brace/mode/python'
import 'brace/mode/c_cpp'
import 'brace/theme/monokai'
import 'brace/theme/dreamweaver'
//import 'brace/test/error-annotations'
import 'brace/snippets/java'
import 'brace/snippets/javascript'
import 'brace/snippets/c_cpp'
import 'brace/snippets/python'
import 'brace/ext/language_tools'
import router from '@/router'
import Vue from 'vue'
//import { response } from 'express'
//import { getQuestions } from '@/services/questions'

let editor;
export default {
    name: 'CodePage',
    data(){
        return {
            status: '',
            runStatus: 'LOADED',
            submitStatus: 'LOADED',
            code: '',
            output: '',
            expectedOutputArr: [],
            testCaseOutput: [],
            passedTestCases: 0,
            outputStatus: '',
            questionId: '',
            assesmentId: '',
            assesment: this.getAssesment(),
            assesmentEndTime: {},
            question: this.getCurQuestion(),
            sample: {},
            inputFormat: [],
            outputFormat: {},
            language: 'java',
            currentTimeHour: new Date().getHours(),
            currentTimeMinutes: new Date().getMinutes(),
            currentTimeSeconds: new Date().getSeconds(), 
            showQuestion: false
        }
    },
    methods: {
        async runTestCodes(){
            if(this.language == 'java')
            this.code = `public class codeRunner {
        ${editor.getValue()}
}`;
            else
            this.code = editor.getValue();
            console.log(this.code);
            await this.codeRunner();
            window.scroll({
                top: 600,
                behavior: 'smooth'
            });
        },
        async getAssesment() {
            this.assesmentId = this.$router.currentRoute.params.examId;
            this.status = 'LOADING';
            try {
                const response = await getQuestions(this.assesmentId);
                this.assesment = response.data;
                this.assesmentEndTime = this.assesment.endTime;
                console.log(this.assesment);
                //this.status = "LOADED";
            }
            catch (error) {
                this.status = "ERROR";
                this.error = error.message;
            }
        },
        async getCurQuestion(){
            this.questionId = router.history.current.params.questionId;
            this.status = 'LOADING';
            try{
                const response = await getQuestion(this.questionId);
                this.question = response.data;
                this.sample = this.question.sampleTestCases;
                this.inputFormat = this.question.inputFormat;
                this.outputFormat = this.question.outputFormat;
                this.sample = this.question.sampleTestCases;
                    this.status = 'LOADED';
                    this.setEditor();
            }
            catch(error){
                console.log(error);
                this.status = 'LOADED';
            }
            
            
        },
        async codeRunner(){
            this.runStatus = 'LOADING';
            const data = {
                code : this.code,
                testCases: this.question.testCases,
                language: this.language
            };
            console.log(data);
            const response = await codeRunner(data);
            console.log(response);
            this.runStatus = 'LOADED';
            this.outputStatus = response.status;
            this.output = response.data;
            this.configureTestCases(response);
            //this.$router.push({path: `${this.$router.currentRoute.path}/#output`});
        },
        changeLanguage () {
            let inputType = [];
            editor.getSession().setMode(`ace/mode/${this.language}`);
             if (this.language == 'java'){
                    for(let i=0;i<this.inputFormat.type.length;i++){
                   inputType.push(this.inputFormat.type[i] + ` input${i+1} `);
                }
                    editor.getSession().setValue(`public ${this.outputFormat.type} solution (${inputType.toString()}) {
    //write your code here
    return aman;
}`); 
                }
               
                else if (this.language == 'python') {
                    for(let i=0;i<this.inputFormat.type.length;i++){
                   inputType.push(` input${i+1}`);
                }
                     editor.getSession().setValue(`def solution (${inputType.toString()}): 
    #write your code here    
    return aman
    `);
                
                }

                else if (this.language == 'c_cpp') {
                    for(let i=0;i<this.inputFormat.type.length;i++){
                   inputType.push(this.inputFormat.type[i] + ` input${i+1}`);
                }
                     editor.getSession().setValue(`int solution (${inputType.toString()}) {
    //write your code here    
    return aman;
}
    `);
                }
        },
        changeThemeDark() {
                editor.setTheme('ace/theme/monokai');
        },
        changeThemeLight() {
                editor.setTheme('ace/theme/dreamweaver');
        },
        configureTestCases(response) {
            if(response.status == 'success') {
                const rawOutput = response.data.split(",");
                this.expectedOutputArr = this.question.testCases.expectedOutput.split(",");
                console.log(this.expectedOutputArr);
                this.testCaseOutput = [];
                this.passedTestCases = 0;
                for(let i=0;i<rawOutput.length-1;i+=2) {
                    let testCase = {
                    };
                    testCase.output = rawOutput[i];
                    if(rawOutput[i+1]=='yes')
                        {
                            testCase.status = 'passed';
                            this.passedTestCases +=1;
                        }
                    else
                        testCase.status = 'failed';
                    this.testCaseOutput.push(testCase);
                }
                console.log(this.testCaseOutput);
            }
        },
        scrollUp () {
        },
        async submitCode() {
            await this.runTestCodes();
            this.submitStatus = 'LOADING';
            const data = {
                exam : router.currentRoute.params.examId,
                question: router.currentRoute.params.questionId,
                userId: this.$store.state.auth.userId,
                answer: editor.getValue(),
                testCasesPassed: this.passedTestCases
            }
            try  {
                    const response = await submitAnswer(data);
                    console.log(response);
                    Vue.$toast.success('Answer Submitted Successfully');
                    Vue.$toast.success('Test Cases Passed - '+ this.passedTestCases );
                } catch(error){
                    console.log(error.message);
                    Vue.$toast.error(error.message);
                }
            this.submitStatus = 'LOADED';
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
        setEditor() {
            editor = ace.edit("editor");
            editor.setTheme('ace/theme/dreamweaver')
            editor.getSession().setMode(`ace/mode/java`);
            //this.code = editor.getValue();
            editor.setOptions({
                fontSize: "14px",
                //fontFamily: "Monolisa"
                enableBasicAutocompletion : true,
                enableLiveAutocompletion: true,
                enableSnippets: true
            });
            let inputType = []
                    for(let i=0;i<this.inputFormat.type.length;i++){
                   inputType.push(this.inputFormat.type[i] + ` input${i+1}`);
                }
            editor.getSession().setValue(`public ${this.outputFormat.type} solution (${inputType.toString()}) {
    //write your code here    
    return a;
}`);  
        },
        getRemainingMinutes() {
            let minutes = this.assesmentEndTime.minutes-this.currentTimeMinutes;
            console.log(minutes);
            return minutes>0?minutes:60+minutes;
        },
        getRemainingHours() {
            let minutes = this.assesmentEndTime.minutes-this.currentTimeMinutes;
            return minutes>0?this.assesmentEndTime.hours-this.currentTimeHour:this.assesmentEndTime.hours-this.currentTimeHour-1;
        },
        toggleShowQuestion() {
            if(this.showQuestion) 
            window.scroll(0, -600);
            else
            window.scroll(0, 600);
            this.showQuestion = !this.showQuestion;
        }
    },
    computed: {
        showQuestionText() {
            return !this.showQuestion ? 'Hide Question' : 'Show Question';
        }
    },
    async created() {
        await this.getAssesment();
        await this.getCurQuestion();
        this.setEditor();
        setInterval(() => {
            this.currentTimeHour = new Date().getHours();
            this.currentTimeMinutes = new Date().getMinutes();
            this.currentTimeSeconds = new Date().getSeconds();
            if (this.$router.currentRoute.path != '/assesments')
            this.compareTime();
        },1000);
        
    },
    mounted:() => {
            
    }
}
</script>
<style>
 *{
        box-sizing: border-box;
        }
        
        body{
            background-size: 100%;
        }
        .question-area{
            height: 36em;
            overflow: auto;
        }
        .bg-warning-light{
            background-color: rgb(255, 255, 255);;
        }
        .background-color-none{
            background-color: white;
        }
        textarea{
            border-radius: 0.5em;
            padding: 1em;
            color: rgb(244, 49, 254);
        }
        textarea:focus{
            outline: none !important;
            border: 1px solid rgb(248, 106, 255);
            border-radius: 0.5em;
        }
        .jc-space-between{
            justify-content: space-between;
        }
        .flex-basis-45{
            flex-basis: 45.3%;
        }
       .d-none{
            display: none;
       }
       .flex{
            display: flex;
            flex-wrap: wrap;
       }
       .mt-1{
            margin-top: 0.5em;
       }
       .p-1{
            padding: 0.5em;
       }
       .flex-basis-100{
            flex-basis: 100%;
       }
       .flex-basis-50{
            flex-basis: 47.4%;
        }
       .border-primary{
            border: 1px solid rgb(248, 106, 255);
       }
       .border-none{
            border: 1px solid rgb(253, 235, 255);
       }
       .color-primary{
            color: rgb(85, 12, 108);
       }
       .button-primary{
            border: 0px solid white;
            border-radius: 0.2em;
            padding: 0.7em;
            background-color: rgb(248, 106, 255);
       }
       .opacity-80 {
            opacity: 80%;
       }
       .w-100{
            width: 100%;
       }
       .my-fonts{
           color: blueviolet;
       }
       .font-smaller{
            font-size: smaller;
       }
       .output{
            white-space: pre-wrap;
       }
       .outputDiv{
        margin-top: -100em;
       }
       @media only screen and (max-width: 766px){
            .flex-basis-50{
                flex-basis: 95%;
            }
       }
</style>