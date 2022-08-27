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
                                        <b-form-select v-model="question.outputFormat.type" :state="errors.outputFormat.type" class="m-2 p-2 me-4 text-warning border border-warning rounded">
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
                        <div v-if="errors.difficulty" @input="validateDifficulty" class="m-4 fs-7 text-danger">
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
                                        @input="validateSampleTestCases(testCase-1)"></b-form-input>
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
                                        <b-form-input id="sample-output" v-model="question.sampleTestCases.output[testCase-1]" :state="(question.sampleTestCases.output[testCase-1]==null)?null:(question.sampleTestCases.output[testCase-1]=='')?false:true"></b-form-input>
                                        <div class="invalid-feedback fw-normal">
                                            Output is Required
                                        </div>
                                    </li>
                                </ol>
                            </b-form-group>
                        </li>
                        <li>
                            <b-form-group label-cols="4" label-cols-lg="2 " class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded" label="Explanation" label-for="sample-explanation">
                                <ol>
                                    <li v-for="testCase in question.sampleTestCases.count" :key="testCase" class="m-2">
                                        <b-form-textarea id="sample-explanation" v-model="question.sampleTestCases.explanation[testCase-1]" :state="(question.sampleTestCases.explanation[testCase-1]==null)?null:(question.sampleTestCases.explanation[testCase-1]=='')?false:true"></b-form-textarea>
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
                                        <b-form-input id="sample-input" v-model="question.testCases.input[testCase-1]" :state="(question.testCases.input[testCase-1]==null)?null:(question.testCases.input[testCase-1]=='')?false:true"></b-form-input>
                                        <div class="invalid-feedback fw-normal">
                                            Input is Required
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
                                        :state="(expectedOutputArr[testCase-1]==null )?null:(expectedOutputArr[testCase-1]=='')?false:true"></b-form-input>
                                        <div class="invalid-feedback fw-normal">
                                            Expected Output is Required
                                        </div>
                                    </li>
                                </ol>
                            </b-form-group>
                        </li>
                    </ul>
                    </div>
                </div>
                <div class="border border-info border-top-0 bg-white rounded-bottom pt-3 shadow">
                    <b-button type="submit" variant="warning" class="ms-3 mb-3">Add Question</b-button>
                    <b-button type="reset" variant="warning" class="ms-3 mb-3">Reset</b-button>
                </div>
                </b-form>
            </div>
        </div>
    </div>
</template>
<script>
import {addQuestion} from '../services/questions';
import {required, numeric} from 'vuelidate/lib/validators';
import ExaminerNavBar from './ExaminerNavBar.vue';
import ExaminerQuestionNavBar from './NavBars/ExaminerQuestionNavBar.vue';
import Vue from 'vue';
export default {
    name: 'AddQuestionPage',
    data () {
        return {
            status: '',
            inputFormatArraySize: 1,
            outputFormatArraySize: 1,
            constraintsArraySize: 1,
            question: {
                name: '',
                statement: '',
                inputFormat: {
                    type: [],
                    description: []
                },
                outputFormat: {
                    type: '',
                    description: ''
                },
                constraints: [],
                sampleTestCases: {
                    count: 1,
                    input: [],
                    output: [],
                    explanation: []
                },
                testCases: {
                    input: [],
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
                    output: [],
                    explanation: []
                }
            },
            noOfTestCases: 1,
            expectedOutputArr: [],
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
            const data = this.question;
            console.log(data);
            if(!this.$v.question.$invalid )
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
                try{
                    const response = await addQuestion(data);
                    console.log(response);
                    Vue.$toast.success('Question - '+response.data.name +' Added Successfully');
                    this.onReset();
                } catch(error){
                    console.log(error.message);
                    Vue.$toast.error(error.message);
                    
                }
                }
            else {
                Vue.$toast.error('Please Enter A Valid Question');
                this.status = 'INVALID';
                this.setToEmptyString();
            }
        },
        validateName() {
            this.errors = {
                ...this.errors,
                name : (this.question.name == '') ? false : true
            }
            console.log(this.errors);
        },
        validateStatement() {
            this.errors = {
                ...this.errors,
                statement : (this.question.statement == '') ? false : true
            }
        },
        validateInputFormatDescription(index) {
            this.errors.inputFormat.description[index] = this.question.inputFormat.description[index] == '' ? false : true;
            console.log(this.question);
            console.log(this.errors);
        },
        validateInputTypeDescription(index) {
            this.errors.inputFormat.type[index] = this.question.inputFormat.type[index] == '' ? false : true;
            console.log(this.question);
            console.log(this.errors);
        },
        validateOutputFormatDescription() {
            this.errors.outputFormat.description = this.question.outputFormat.description == '' ? false : true;
            console.log(this.question);
            console.log(this.errors);
        },
        validateOutputTypeDescription() {
            this.errors.outputFormat.type = this.question.outputFormat.type == '' ? false : true;
            console.log(this.question);
            console.log(this.errors);
        },
        validateConstraints(index) {
            this.errors.constraints[index] = this.question.constraints[index] == '' ? false : true;
            console.log(this.question);
            console.log(this.errors);
        },
        validateDifficulty() {
            this.errors = {
                ...this.errors,
                difficulty : (this.question.difficulty == '') ? false : true
            }
            console.log(this.errors);
        },
        validateSampleTestCases(index) {
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
                    if (isNaN(parseInt(args[i])))
                        {
                            this.errors.sampleTestCases.input.valid[index] = false;
                            return;
                        }
                    console.log(parseInt(args[i]));
                    this.errors.sampleTestCases.input.valid[index] = true;
                }
                if ( this.question.inputFormat.type[i] == 'String') {
                    if (!isNaN(args[i]))
                        {
                            this.errors.sampleTestCases.input.valid[index] = false;
                            return;
                        }
                    console.log(parseInt(args[i]));
                    this.errors.sampleTestCases.input.valid[index] = true;
                }
            }
            this.errors.sampleTestCases.input.valid[index] = true;
            console.log(this.question);
            console.log(this.errors);
        },
        onReset() {
            this.question = {
                name: null,
                statement: null,
                inputFormat: {
                    type: [null],
                    description: [null]
                },
                outputFormat: {
                    type: null,
                    description: null
                },
                constraints: [null],
                sampleTestCases: {
                    count: 1,
                    input: [null],
                    output: [null],
                    explanation: [null]
                },
                testCases: {
                    input: [null],
                    expectedOutput: null,
                },
                difficulty: null,
            }
        },
        advanceValidation() {
            if (this.question.inputFormat.type[0] == null 
                    || this.question.inputFormat.type[0] == ''
                    || this.question.inputFormat.description[0] == null 
                    || this.question.inputFormat.description[0] == ''
                    || this.question.outputFormat.type == null 
                    || this.question.outputFormat.type == ''
                    || this.question.sampleTestCases.input[0] == null
                    || this.question.sampleTestCases.input[0] == ''
                    || this.question.sampleTestCases.output[0] == null
                    || this.question.sampleTestCases.output[0] == ''
                    || this.question.sampleTestCases.explanation[0] == null
                    || this.question.sampleTestCases.explanation[0] == ''
                    || this.question.constraints[0] == null
                    || this.question.constraints[0] == ''
                    || this.question.testCases.input[0] == null
                    || this.question.testCases.input[0] == ''
                    || this.question.testCases.expectedOutput[0] == null
                    || this.question.testCases.expectedOutput[0] == ''
                    || this.question.difficulty == null
                    || this.question.difficulty == '')
                return false;
                return true;
        },
        setToEmptyString() {
            
                this.question.name = this.question.name == null ? '' : this.question.name;
                this.question.statement = this.question.statement == null ? '' : this.question.statement;
                this.question.inputFormat.type[0] = this.question.inputFormat.type[0] == null ? '' : this.question.inputFormat.type[0];
                this.question.inputFormat.description[0] = this.question.inputFormat.description[0] == null ? '' : this.question.inputFormat.description[0];
                this.question.outputFormat.type = this.question.outputFormat.type == null ? '' : this.question.outputFormat.type;
                this.question.outputFormat.description = this.question.outputFormat.description == null ? '' : this.question.outputFormat.description;
                this.question.sampleTestCases.input[0] = this.question.sampleTestCases.input[0] == null ? '' : this.question.sampleTestCases.input[0];
                this.question.sampleTestCases.output[0] = this.question.sampleTestCases.output[0] == null ? '' : this.question.sampleTestCases.output[0];
                this.question.sampleTestCases.explanation[0] = this.question.sampleTestCases.explanation[0] == null ? '' : this.question.sampleTestCases.explanation[0];
                this.question.constraints[0] = this.question.constraints[0] == null ? '' : this.question.constraints[0];
                this.question.testCases.input[0] = this.question.testCases.input[0] == null ? '' : this.question.testCases.input[0];
                this.question.testCases.expectedOutput = this.question.testCases.expectedOutput == null ? '' : this.question.testCases.expectedOutput;
                this.question.difficulty = this.question.difficulty == null ? '' : this.question.difficulty
                
    }},
    validations: {
        question: {
            name: {
                required
            },
            statement: {
                required
            },
            inputFormat: {
                type: {
                    required
                },
                description: {
                    required: function(value) {
                        return value.length > 0;
                    }
                }
            },
            outputFormat: {
                type : {
                    required
                },
                description : {
                    required
                }
            },
            constraints: {
                required
            },
            sampleTestCases: {
                count: {
                    required,
                    numeric
                },
                input: {
                    required
                },
                output : {
                    required
                },
                explanation : {
                    required
                }
            },
            difficulty: {
                required
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