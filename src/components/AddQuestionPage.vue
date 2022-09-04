<template>
    <div>
        <ExaminerNavBar />
        <div class="background-color pt-4">
        <ExaminerQuestionNavBar />
        <div class="ms-4 me-4 bg-info text-white fs-4 fw-bold p-2 border rounded shadow-lg">
            Add A Question
        </div>
        <div class="ms-4 me-4 border rounded shadow-lg">
            <b-form @submit.prevent="addQuestionForm" @reset="onReset" autocomplete="off">
                <div class=" border border-info border-bottom-0 bg-white rounded-top shadow">
                
                    <div class="add-question-area p-5">
                    <b-form-group label-cols="4" label-cols-lg="2 " class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded" label="Question Name" label-for="input-name">
                        <b-form-input id="input-name" type="text" v-model="question.name" class="form-control-input " :state="errors.name" @input="validateName"></b-form-input>
                        <div class="invalid-feedback fw-normal">
                            Name is Required
                        </div>
                    </b-form-group>

                    <b-form-group label-cols="4" label-cols-lg="2" class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded"  label="Statement" label-for="input-statement" >
                        <b-form-textarea id="input-statement" v-model="question.statement" :state="errors.statement" @input="validateStatement"></b-form-textarea>
                        <div class="invalid-feedback fw-normal">
                            Statement is Required
                        </div>
                    </b-form-group>
                    <b-form-group label-cols="4" label-cols-lg="2" class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded"  label="Input Format" label-for="input-format">
                        <ol>
                            <li v-for="i in inputFormatArraySize" :key="i">
                                <div class="flex">
                                    <div>
                                        <b-form-select v-model="question.inputFormat.type[i-1]" :state="errors.inputFormat.type[i-1]" @input="validateInputTypeDescription(i-1)" class="m-2 p-2 me-4 text-warning border border-warning rounded">
                                            <template #first>
                                                <b-form-select-option :value="null" disabled>-- Select Type --</b-form-select-option>
                                            </template>
                                            <b-form-select-option value="int" >Integer</b-form-select-option>
                                            <b-form-select-option value="String">String</b-form-select-option>
                                        </b-form-select>
                                        <div class="invalid-feedback fw-normal ms-2 mt-0">
                                            Type is Required
                                        </div>
                                    </div>
                                    <div class="flex-basis-70">
                                        <b-form-input id="input-format" class="m-2 flex-basis-70" v-model="question.inputFormat.description[i-1]" 
                                        :state="errors.inputFormat.description[i-1]" @input="validateInputFormatDescription(i-1)"></b-form-input>
                                        <div class="invalid-feedback fw-normal ms-2">
                                            Input Format Description is Required
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ol>
                        <div class="row"></div>
                        <b-button variant="outline-warning" class="fs-6 col m-2 bg-white" @click="increaseInputArraySize">
                            <b-icon icon="plus" size="lg" ></b-icon> Add More
                        </b-button>
                        <b-button variant="outline-warning" class="fs-6 col m-2 bg-white" @click="decreaseInputArraySize" v-if="(inputFormatArraySize-1)">
                            <b-icon icon="dash" size="lg" ></b-icon> Delete
                        </b-button>
                    </b-form-group>
                    <b-form-group label-cols="4" label-cols-lg="2" class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded"  label="Output Format" label-for="output-format">
                        <ol>
                            <li v-for="i in outputFormatArraySize" :key="i">
                                 <div class="flex">
                                    <div>
                                        <b-form-select v-model="question.outputFormat.type" :state="errors.outputFormat.type" 
                                        @input="validateOutputTypeDescription(i-1)" 
                                        class="m-2 p-2 me-4 text-warning border border-warning rounded">
                                            <template #first>
                                                <b-form-select-option :value="null" disabled>-- Select Type --</b-form-select-option>
                                            </template>
                                            <b-form-select-option value="int" >Integer</b-form-select-option>
                                            <b-form-select-option value="String">String</b-form-select-option>
                                        </b-form-select>
                                        <div class="invalid-feedback fw-normal ms-2 mt-0">
                                            Type is Required
                                        </div>
                                    </div>
                                <div class="flex-basis-70">
                                    <b-form-input id="output-format" class="m-2 flex-basis-70" v-model="question.outputFormat.description" 
                                    :state="errors.outputFormat.description" @input="validateOutputFormatDescription"></b-form-input>
                                        <div class="invalid-feedback fw-normal mt-0 ms-2" >
                                            Output Format is Required
                                        </div>
                                    </div>
                                </div>   
                                
                            </li>
                        </ol>
                        <div class="row"></div>
                    </b-form-group>
                    <b-form-group label-cols="2" label-cols-lg="1" class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded"  label="Constraints" label-for="constraints">
                        <ol class="flex">
                            <li v-for="i in constraintsArraySize" :key="i" class="me-5">
                                <b-form-input id="constraints" class="m-2" 
                                v-model="question.constraints[i-1]" 
                                :state="errors.constraints[i-1]"
                                @input = "validateConstraints(i-1)"></b-form-input>
                                <div class="invalid-feedback fw-normal">
                                    Constraints is Required
                                </div>
                            </li>
                        </ol>
                        <div class="row"></div>
                        <b-button variant="outline-warning" class="fs-6 col m-2 bg-white" @click="increaseConstraintsArraySize">
                            <b-icon icon="plus" size="lg" ></b-icon> Add More
                        </b-button>
                        <b-button variant="outline-warning" class="fs-6 col m-2 bg-white" @click="decreaseConstraintsArraySize" v-if="(constraintsArraySize-1)">
                            <b-icon icon="dash" size="lg" ></b-icon> Delete
                        </b-button>
                    </b-form-group>
                     <b-form-radio-group
                    class="flex border border-info background-color p-3 mb-3 rounded"
                    v-model="question.difficulty"
                    :state="errors.difficulty"
                    id="difficulty"
                    >   <label for="difficulty" class="fs-6 fw-bold flex-basis-100">Difficulty</label>
                        <b-form-radio class="m-3" value="easy" name="check-button" >
                            <div  class="fs-6 m-2 bg-white p-1 ps-2 pe-2 border border-success rounded text-success"  >
                                <b-icon icon="plus" size="lg" ></b-icon> Easy
                            </div> 
                        </b-form-radio>
                        <b-form-radio class="m-3" value="medium" name="check-button" >
                            <div  class="fs-6 m-2 bg-white p-1 ps-2 pe-2 border border-warning rounded text-warning"  >
                                <b-icon icon="plus" size="lg" ></b-icon> Medium
                            </div> 
                        </b-form-radio>
                        <b-form-radio class="m-3" value="hard" name="check-button" >
                            <div  class="fs-6 m-2 bg-white p-1 ps-2 pe-2 border border-danger rounded text-danger"  >
                                <b-icon icon="plus" size="lg" ></b-icon> Hard
                            </div> 
                        </b-form-radio>
                        <div v-if="!errors.difficulty" class="m-4 invalid-feedback">
                            Difficulty is required
                        </div>
                    </b-form-radio-group>
                   
                    <b-form-group label-cols="4" label-cols-lg="2 " class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded" label-for="sample-test-cases" >
                        <div>
                        <label for="sb-inline">Sample Test Cases</label>
                        <b-form-spinbutton id="sb-inline" class="m-2 p-1 border-warning" v-model="question.sampleTestCases.count" inline></b-form-spinbutton>
                    </div>
                    </b-form-group >
                    <ul>
                        <li>
                            <b-form-group label-cols="4" label-cols-lg="2 " class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded" label="Input" label-for="sample-input">
                                <ol>
                                    <li v-for="testCase in question.sampleTestCases.count" :key="testCase" class="m-2">
                                        <b-form-input id="sample-input" v-model="question.sampleTestCases.input[testCase-1]" 
                                        :state="errors.sampleTestCases.input.required[testCase-1] && errors.sampleTestCases.input.valid[testCase-1]"
                                        @input="validateSampleTestCasesInput(testCase-1)"></b-form-input>
                                        <div class="invalid-feedback fw-normal" v-if="!errors.sampleTestCases.input.required[testCase-1]">
                                            Input is Required
                                        </div>
                                        <div class="invalid-feedback fw-normal" v-else>
                                            Input does not match provided input format
                                        </div>
                                        <div class="input-live-feedback fs-7 ms-0 m-1 fw-normal">
                                            Please seperate arguments with whitespace &emsp14; e.g. 1 2 3
                                        </div>
                                    </li>
                                </ol>
                            </b-form-group>
                        </li>
                        <li>
                            <b-form-group label-cols="4" label-cols-lg="2 " class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded" label="Output" label-for="sample-output">
                                <ol>
                                    <li v-for="testCase in question.sampleTestCases.count" :key="testCase" class="m-2">
                                        <b-form-input id="sample-output" v-model="question.sampleTestCases.output[testCase-1]" 
                                        :state="errors.sampleTestCases.output.required[testCase-1] && errors.sampleTestCases.output.valid[testCase-1]"
                                        @input="validateSampleTestCasesOutput(testCase-1)"></b-form-input>
                                        <div class="invalid-feedback fw-normal" v-if="!errors.sampleTestCases.output.required[testCase-1]">
                                            Output is Required
                                        </div>
                                        <div class="invalid-feedback fw-normal" v-else-if="!errors.sampleTestCases.output.valid[testCase-1]">
                                            Output does not match provided output format
                                        </div>
                                    </li>
                                </ol>
                            </b-form-group>
                        </li>
                        <li>
                            <b-form-group label-cols="4" label-cols-lg="2 " class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded" label="Explanation" label-for="sample-explanation">
                                <ol>
                                    <li v-for="testCase in question.sampleTestCases.count" :key="testCase" class="m-2">
                                        <b-form-textarea id="sample-explanation" v-model="question.sampleTestCases.explanation[testCase-1]" 
                                        :state="errors.sampleTestCases.explanation[testCase-1]"
                                        @input="validateSampleTestCasesExplanation(testCase-1)"></b-form-textarea>
                                        <div class="invalid-feedback fw-normal">
                                            Explanation is Required
                                        </div>
                                    </li>
                                </ol>
                                
                            </b-form-group>
                        </li>
                    </ul>
                    <b-form-group label-cols="4" label-cols-lg="2 " class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded" label-for="sample-test-cases" >
                        <div>
                        <label for="sb-inline">Test Cases</label>
                        <b-form-spinbutton id="sb-inline" class="m-2 p-1 border-warning" v-model="noOfTestCases" inline></b-form-spinbutton>
                    </div>
                    </b-form-group >
                    <ul>
                        <li>
                            <b-form-group label-cols="4" label-cols-lg="2 " class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded" label="Input" label-for="sample-input">
                                <ol>
                                    <li v-for="testCase in noOfTestCases" :key="testCase" class="m-2">
                                        <b-form-input id="sample-input" v-model="question.testCases.input[testCase-1]" 
                                        :state="errors.testCases.input.required[testCase-1] && errors.testCases.input.valid[testCase-1]"
                                        @input="validateTestCasesInput(testCase-1)"></b-form-input>
                                        <div class="invalid-feedback fw-normal" v-if="!errors.testCases.input.required[testCase-1]">
                                            Input is Required
                                        </div>
                                        <div class="invalid-feedback fw-normal" v-else-if="!errors.testCases.input.valid[testCase-1]">
                                            Input does not match provided input format
                                        </div>
                                        <div class="input-live-help fs-7 m-2 fw-normal">
                                            Seperate function arguments by comma ( , )&emsp13; e.g. 1, 2, 3
                                        </div>
                                    </li>
                                </ol>
                            </b-form-group>
                        </li>
                        <li>
                            <b-form-group label-cols="4" label-cols-lg="2 " class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded" label="Expected Output" label-for="sample-output">
                                <ol>
                                    <li v-for="testCase in noOfTestCases" :key="testCase" class="m-2">
                                        <b-form-input id="sample-output" v-model="expectedOutputArr[testCase-1]" 
                                        :state="errors.testCases.expectedOutput.required[testCase-1] && errors.testCases.expectedOutput.valid[testCase-1]"
                                        @input="validateTestCasesExpectedOutput(testCase-1)"></b-form-input>
                                        <div class="invalid-feedback fw-normal" v-if="!errors.testCases.expectedOutput.required[testCase-1]">
                                            Output is Required
                                        </div>
                                        <div class="invalid-feedback fw-normal" v-else-if="!errors.testCases.expectedOutput.valid[testCase-1]">
                                            Output does not match provided output format
                                        </div>
                                    </li>
                                </ol>
                            </b-form-group>
                        </li>
                    </ul>
                    </div>
                </div>
                <div class="border border-info border-top-0 bg-white rounded-bottom pt-3 shadow">
                    <b-button type="submit" variant="warning" class="ms-3 mb-3">
                        <b-spinner small v-if="addStatus=='LOADING'" class="me-1 p-1"></b-spinner>
                        Add Question</b-button>
                    <b-button type="reset" variant="warning" class="ms-3 mb-3">Reset</b-button>
                </div>
                </b-form>
            </div>
        </div>
    </div>
</template>
<script>
import {addQuestion} from '../services/questions';
import ExaminerNavBar from './ExaminerNavBar.vue';
import ExaminerQuestionNavBar from './NavBars/ExaminerQuestionNavBar.vue';
import Vue from 'vue';
export default {
    name: 'AddQuestionPage',
    data () {
        return {
            status: '',
            addStatus: '',
            inputFormatArraySize: 1,
            outputFormatArraySize: 1,
            constraintsArraySize: 1,
            question: {
                name: '',
                statement: '',
                inputFormat: {
                    type: [''],
                    description: ['']
                },
                outputFormat: {
                    type: '',
                    description: ''
                },
                constraints: [''],
                sampleTestCases: {
                    count: 1,
                    input: [''],
                    output: [''],
                    explanation: ['']
                },
                testCases: {
                    input: [''],
                    expectedOutput: '',
                },
                difficulty: '',
            },
            errors: {
                inputFormat: {
                    type: [],
                    description: []
                },
                outputFormat : {
                    
                },
                constraints: [],
                sampleTestCases: {
                    input: {
                        required: [],
                        valid: []
                    },
                    output: {
                        required: [],
                        valid: []
                    },
                    explanation: []
                },
                testCases: {
                    input: {
                        required: [],
                        valid: []
                    },
                    expectedOutput: {
                        required: [],
                        valid: []
                    }
                }
            },
            noOfTestCases: 1,
            expectedOutputArr: [''],
            selected: null  
        }
    },
    methods: {
        increaseInputArraySize(){
            this.inputFormatArraySize +=1;
        },
        decreaseInputArraySize(){
            this.inputFormatArraySize = this.inputFormatArraySize > 1 ? this.inputFormatArraySize-1 :this.inputFormatArraySize;
        },
        increaseConstraintsArraySize(){
            this.constraintsArraySize +=1;
        },
        decreaseConstraintsArraySize(){
            this.constraintsArraySize = this.constraintsArraySize > 1 ? this.constraintsArraySize-1 :this.constraintsArraySize;
        },
        async addQuestionForm(){
            let data = this.question;
            console.log(data);
            if(this.questionIsValid() )
                {
                    
                    console.log(data);
                    data.testCases.expectedOutput = `{`;
                    for(let i=0;i<this.expectedOutputArr.length-1;i++){
                        data.testCases.expectedOutput += `${this.expectedOutputArr[i]},`
                    }
                    data.testCases.expectedOutput += `${this.expectedOutputArr[this.expectedOutputArr.length-1]}}`;
                    
                    for (let i=0;i<data.testCases.input.length;i++) {
                        data.testCases.input[i] = `{${data.testCases.input[i]}}`;
                        data.testCases.expectedOutput += ``
                    }
                    console.log(data);
                try{
                    this.addStatus = 'LOADING';
                    const response = await addQuestion(data);
                    console.log(response);
                    Vue.$toast.success('Question - '+response.data.name +' Added Successfully');
                    this.onReset();
                } catch(error){
                    console.log(error.message);
                    Vue.$toast.error(error.message);
                    
                }
                this.addStatus = 'LOADED';
                }
            else {
                Vue.$toast.error('Please Enter A Valid Question');
                this.status = 'INVALID';
                //this.setToEmptyString();
            }
        },
        questionIsValid() {
            this.validateName();
            this.validateStatement(); 
            this.validateDifficulty(); 
            for (let i=0; i< (this.question.inputFormat.type.length ) ;i++) {
                this.validateInputTypeDescription(i);
                this.validateInputFormatDescription(i);
            }
            this.validateOutputTypeDescription();
            this.validateOutputFormatDescription();
            for (let i=0;i< this.question.constraints.length ; i++) {
                this.validateConstraints(i);
            }
            for (let i=0;i< this.question.sampleTestCases.input.length;i++) {
                this.validateSampleTestCasesInput(i);
                this.validateSampleTestCasesOutput(i);
                this.validateSampleTestCasesExplanation(i);
            }
            for (let i=0;i< this.question.testCases.input.length;i++) {
                this.validateTestCasesExpectedOutput(i);
                this.validateTestCasesInput(i);
            }

            return (this.errors.name && 
                    this.errors.statement && 
                        this.errors.inputFormat.type.reduce((acc, cur) => acc&&cur )&& 
                            this.errors.inputFormat.description.reduce((acc, cur) => acc&&cur) &&
                this.errors.constraints.reduce((acc, cur) => acc&&cur) && 
                    this.errors.difficulty && 
                        this.errors.sampleTestCases.input.required.reduce((acc, cur) => acc&&cur) && 
                        this.errors.sampleTestCases.input.valid.reduce((acc, cur) => acc&&cur) &&
                            this.errors.sampleTestCases.output.required.reduce((acc, cur) => acc&&cur) && 
                            this.errors.sampleTestCases.output.valid.reduce((acc, cur) => acc&&cur) &&
                                this.errors.sampleTestCases.explanation.reduce((acc, cur) => acc&&cur) &&
                this.errors.testCases.input.required.reduce((acc, cur) => acc&&cur) && 
                this.errors.testCases.input.valid.reduce((acc, cur) => acc&&cur) && 
                    this.errors.testCases.expectedOutput.required.reduce((acc, cur) => acc&&cur) &&
                    this.errors.testCases.expectedOutput.valid.reduce((acc, cur) => acc&&cur))
        },
        validateName() {
            this.errors = {
                ...this.errors,
                name : (this.question.name == '') ? false : true
            }
        },
        validateStatement() {
            this.errors = {
                ...this.errors,
                statement : (this.question.statement == '') ? false : true
            }
        },
        validateInputFormatDescription(index) {
            this.errors.inputFormat.description[index] = this.question.inputFormat.description[index] == '' ? false : true;
        },
        validateInputTypeDescription(index) {
            this.errors.inputFormat.type[index] = this.question.inputFormat.type[index] == '' ? false : true;
        },
        validateOutputFormatDescription() {
            this.errors.outputFormat.description = this.question.outputFormat.description == '' ? false : true;
        },
        validateOutputTypeDescription() {
            this.errors.outputFormat.type = this.question.outputFormat.type == '' ? false : true;
        },
        validateConstraints(index) {
            this.errors.constraints[index] = this.question.constraints[index] == '' ? false : true;
        },
        validateDifficulty() {
            this.errors = {
                ...this.errors,
                difficulty : (this.question.difficulty == '') ? false : true
            }
        },
        validateSampleTestCasesInput(index) {
            this.errors.sampleTestCases.input.required[index] = this.question.sampleTestCases.input[index] == '' ? false : true;
            if (this.question.inputFormat.type.length == 0 || this.question.inputFormat.description.length == 0)
                {
                    this.errors.sampleTestCases.input.valid[index] = false;
                    return; 
                }
            
            let args = this.question.sampleTestCases.input[index].split(" ");
            if (args.length != this.question.inputFormat.type.length || args[args.length-1] == '') 
                {
                    this.errors.sampleTestCases.input.valid[index] = false;
                    return; 
                }
             for (let i=0; i<args.length; i++) {
                console.log(args[i]+this.question.inputFormat.type[i]);
                if ( this.question.inputFormat.type[i] == 'int') {
                    if (!/^[0-9]+$/.test(args[i]))
                        {
                            this.errors.sampleTestCases.input.valid[index] = false;
                            return;
                        }
                    console.log(parseInt(args[i]));
                    this.errors.sampleTestCases.input.valid[index] = true;
                }
                if ( this.question.inputFormat.type[i] == 'String') {
                    if (/[0-9]/.test(args[i]))
                        {
                            this.errors.sampleTestCases.input.valid[index] = false;
                            return;
                        }
                    console.log(parseInt(args[i]));
                    this.errors.sampleTestCases.input.valid[index] = true;
                }
            }
            this.errors.sampleTestCases.input.valid[index] = true;
        },
        validateSampleTestCasesOutput(index) {
            this.errors.sampleTestCases.output.required[index] = this.question.sampleTestCases.output[index] == '' ? false : true;
            
            if (this.question.outputFormat.type == '' || this.question.outputFormat.description == '')
                {
                    this.errors.sampleTestCases.output.valid[index] = false;
                    return; 
                }
                if ( this.question.outputFormat.type == 'int') {
                    if (!/^[0-9]+$/.test(this.question.sampleTestCases.output[index]))
                        {
                            this.errors.sampleTestCases.output.valid[index] = false;
                            return;
                        }
                    console.log(parseInt(this.question.sampleTestCases.output[index]));
                    this.errors.sampleTestCases.output.valid[index] = true;
                }
                if ( this.question.outputFormat.type == 'String') {
                    if (/[0-9]/.test(this.question.sampleTestCases.output[index]))
                        {
                            this.errors.sampleTestCases.output.valid[index] = false;
                            return;
                        }
                    //console.log(parseInt());
                    this.errors.sampleTestCases.output.valid[index] = true;
                }
            this.errors.sampleTestCases.output.valid[index] = true;
        },
        validateSampleTestCasesExplanation(index) {
            this.errors.sampleTestCases.explanation[index] = 
                this.question.sampleTestCases.explanation[index] == '' ? false : true;
        },
        validateTestCasesInput(index) {
            this.errors.testCases.input.required[index] = this.question.testCases.input[index] == '' ? false : true;
            if (this.question.inputFormat.type.length == 0 || this.question.inputFormat.description.length == 0)
                {
                    this.errors.testCases.input.valid[index] = false;
                    return; 
                }
            
            let args = this.question.testCases.input[index].split(", ");
            console.log(args);
            if (args.length != this.question.inputFormat.type.length || args[args.length-1] == '') 
                {
                    this.errors.testCases.input.valid[index] = false;
                    return; 
                }
             for (let i=0; i<args.length; i++) {
                console.log(args[i]+this.question.inputFormat.type[i]);
                if ( this.question.inputFormat.type[i] == 'int') {
                    if (!/^[0-9]+$/.test(args[i]))
                        {
                            this.errors.testCases.input.valid[index] = false;
                            return;
                        }
                    this.errors.testCases.input.valid[index] = true;
                }
                if ( this.question.inputFormat.type[i] == 'String') {
                    if (/[0-9]/.test(args[i]))
                        {
                            this.errors.testCases.input.valid[index] = false;
                            return;
                        }
                    this.errors.testCases.input.valid[index] = true;
                }
            }
            this.errors.testCases.input.valid[index] = true;
        },
        validateTestCasesExpectedOutput(index) {
            this.errors.testCases.expectedOutput.required[index] = this.expectedOutputArr[index] == '' ? false : true;
            if (this.question.outputFormat.type == '' || this.question.outputFormat.description == '')
                {
                    this.errors.testCases.expectedOutput.valid[index] = false;
                    return; 
                }
                if ( this.question.outputFormat.type == 'int') {
                    if (!/^[0-9]+$/.test(this.expectedOutputArr[index]))
                        {
                            this.errors.testCases.expectedOutput.valid[index] = false;
                            return;
                        }
                    this.errors.testCases.expectedOutput.valid[index] = true;
                }
                if ( this.question.outputFormat.type == 'String') {
                    if (/[0-9]/.test(this.expectedOutputArr[index]))
                        {
                            this.errors.testCases.expectedOutput.valid[index] = false;
                            return;
                        }
                    this.errors.testCases.expectedOutput.valid[index] = true;
                }
            this.errors.testCases.expectedOutput.valid[index] = true;
        },
        onReset() {
            this.question = {
                name: '',
                statement: '',
                inputFormat: {
                    type: [''],
                    description: ['']
                },
                outputFormat: {
                    type: '',
                    description: ''
                },
                constraints: [''],
                sampleTestCases: {
                    count: 1,
                    input: [''],
                    output: [''],
                    explanation: ['']
                },
                testCases: {
                    input: [''],
                    expectedOutput: '',
                },
                difficulty: '',
            }
        }
    },
    components: {
        ExaminerNavBar,
        ExaminerQuestionNavBar}
}
</script>
<style>
    .add-question-area{
        overflow: auto;
        width: auto,
    }
    .flex-basis-70{
        flex-basis: 80%;
    }
    .fs-7{
        font-size: smaller;
    }
</style>