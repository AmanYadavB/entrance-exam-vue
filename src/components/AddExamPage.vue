<template>
    <div>
        <ExaminerNavBar />
        <div class="background-color pt-4">
            <ExaminerExamNavBar />
            <div class="ms-4 me-4 bg-info text-white fs-4 fw-bold p-2 border rounded shadow-lg">
                Add An Assesment
            </div>
            <div class="ms-4 me-4 border rounded shadow-lg">
                <b-form @submit.prevent="addExamForm" @reset="onReset">
                    <div class=" border border-info border-bottom-0 bg-white rounded-top shadow">
                        <div class="add-question-area p-5">
                            <b-form-group label-cols="4" label-cols-lg="2 " class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded" label="Exam Name" label-for="input-name">
                                <b-form-input id="input-name" type="text" v-model="exam.name" class="form-control-input " :state="errors.name" @input="validateName()"></b-form-input>
                                <div class="invalid-feedback fw-normal">
                                    Name is Required
                                </div>
                            </b-form-group>
                            <b-form-group label-cols="4" label-cols-lg="3" class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded"  label="Date" label-for="date">
                                <b-form-input type="date" id="date" class="form-control-input" v-model="exam.date" :state="errors.date" @input="validateDate()"></b-form-input>
                                <div class="invalid-feedback fw-normal">
                                    Date is Required
                                </div>  
                            </b-form-group>
                            <div class="flex jc-space-between">
                                <b-form-group label-cols="4" label-cols-lg="3" class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded flex-basis-50 "  label="Start Time" label-for="start-time">
                                    <b-form-input type="time" id="start-time" class="form-control-input" v-model="exam.startTime" :state="errors.startTime" @input="validateStartTime()"></b-form-input>
                                    <div class="invalid-feedback fw-normal">
                                        Start Time is Required
                                    </div>  
                                </b-form-group>
                                <b-form-group label-cols="4" label-cols-lg="3" class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded flex-basis-50"  label="End Time" label-for="end-time">
                                    <b-form-input type="time" id="end-time" class="form-control-input" v-model="exam.endTime" :state="errors.endTime.required && errors.endTime.lessStartTime" @input="validateEndTime()"></b-form-input>
                                    <div class="fs-7 text-danger mt-1 fw-normal" v-if="errors.endTime.required == false">
                                        End Time is Required
                                    </div> 
                                    <div class="fs-7 text-danger mt-1 fw-normal" v-if="errors.endTime.lessStartTime == false">
                                        End Time Must be greater than start time
                                    </div> 
                                </b-form-group>
                            </div>
                            <b-form-group label-cols="4" label-cols-lg="3" class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded flex-basis-50"  label="Examinees" label-for="examinees">
                                <b-form-select id="examinees" class="form-control-input w-100 p-2 border rounded" v-model="exam.examinees[exam.examinees.length]" :state="errors.examinees" @input="validateExaminees()">
                                    <b-form-select-option :value="null" class="p-2 border rounded">Select Examinees</b-form-select-option>
                                    <b-form-select-option :value="examinee._id" v-for="examinee in examinees" :key="examinee._id" class="" :disabled="isExamineeAlreadyAdded(examinee._id)">{{examinee.name}}</b-form-select-option>
                                </b-form-select>   
                                <div class="invalid-feedback fw-normal">
                                    At least one examinee is required
                                </div>
                                <div class="fw-normal mt-2 p-2 border rounded border-info bg-white" >
                                    <strong>Examinees:</strong> &emsp14; {{getNames}}
                                </div>  
                            </b-form-group>
                            <b-form-group label-cols="4" label-cols-lg="3" class="fs-6 fw-bold border border-info background-color p-3 mb-3 rounded flex-basis-50"  label="Questions" label-for="questions">
                                <b-form-select id="questions" class="form-control-input w-100 p-2 border rounded"  v-model="exam.questions[exam.questions.length]" :state="errors.questions" @input="validateQuestions()">
                                    <template #first>
                                        <b-form-select-option :value="null" class="p-2 border rounded">Select Questions</b-form-select-option>
                                    </template>
                                    <b-form-select-option :value="question._id" class="p-2 border rounded options" v-for="question in questions" :key="question._id" :disabled="isQuestionAlreadyAdded(question._id)">{{question.name}}</b-form-select-option>
                                </b-form-select>
                                <div class="invalid-feedback fw-normal">
                                    At least one question is required
                                </div>
                                <div class="fw-normal mt-2 p-2 border rounded border-info bg-white">
                                    <strong>Questions:</strong> &emsp14; {{getQuestionNames}}
                                </div> 
                            </b-form-group>
                        </div>
                    </div>
                    <div class="border border-info border-top-0 bg-white rounded-bottom pt-3 shadow">
                        <b-button type="submit" variant="warning" class="ms-3 mb-3">Add Exam</b-button>
                        <b-button type="reset" variant="warning" class="ms-3 mb-3">Reset</b-button>
                    </div>
                </b-form>
            </div>
        </div>
    </div>
</template>
<script>
import {addExam} from '../services/assesments';
import {required} from 'vuelidate/lib/validators';
import ExaminerNavBar from './ExaminerNavBar.vue';
import ExaminerExamNavBar from './NavBars/ExaminerExamNavBar.vue';
import {getAllExaminees} from '../services/users';
import {getAllQuestions} from '../services/questions';
import Vue from 'vue';
export default {
    name: 'AddExamPage',
    data () {
        return {
            status: '',
            exam: {
                name: '',
                date: '',
                startTime: '',
                endTime: '',
                examinees: [],
                questions: [],
            },
            errors: {
                endTime: {

                }
            },
            examinees: [],
            questions: [],
            toDisplayExaminee: []
        }
    },
    computed: {
        getNames() {
            let names = ``;
            for(let i=0;i<this.exam.examinees.length;i++) {
                for(let j=0;j<this.examinees.length;j++) {
                    if(this.exam.examinees[i]==this.examinees[j]._id) {
                        names += ` ${this.examinees[j].name}, `
                    }
                }
            }
            return names;
        },
        getQuestionNames() {
            let names = ``;
            for(let i=0;i<this.exam.questions.length;i++) {
                for(let j=0;j<this.questions.length;j++) {
                    if(this.exam.questions[i]==this.questions[j]._id) {
                        names += ` ${this.questions[j].name}, `
                    }
                }
            }
            return names;
        }
    },
    methods: {
        async getAllExaminees() {
            this.status='LOADING';
            try {
                const response = await getAllExaminees();
                this.examinees = response.data;
                console.log(this.examinees);
                this.status = "LOADED";
            }
            catch (error) {
                this.status = "ERROR";
                this.error = error.message;
            }
        },
        async getAllQuestions() {
            this.status='LOADING';
            try {
                const response = await getAllQuestions();
                this.questions = response.data;
                console.log(this.questions);
                this.status = "LOADED";
            }
            catch (error) {
                this.status = "ERROR";
                this.error = error.message;
            }
        },
        async addExamForm(){
            this.$v.$touch();
            this.exam.examinees.shift();
            this.exam.questions.shift();
            console.log(this.exam);
            if(this.validateExam()) {
                const dateArray = this.exam.date.split("-");
                const startTimeArray = this.exam.startTime.split(":");
                const endTimeArray = this.exam.endTime.split(":")
            //console.log(data);
            
                const data = {
                    name: this.exam.name,
                    date: {
                        date: parseInt(dateArray[2]),
                        month: parseInt(dateArray[1]),
                        year: parseInt(dateArray[0])
                    },
                    startTime: {
                        hours: parseInt(startTimeArray[0]),
                        minutes: parseInt(startTimeArray[1])
                    },
                    endTime: {
                        hours: parseInt(endTimeArray[0]),
                        minutes: parseInt(endTimeArray[1])
                    },
                    examinees: this.exam.examinees,
                    questions: this.exam.questions
                }
                console.log(data);
                try{
                    const response = await addExam(data);
                    console.log(response);
                    Vue.$toast.success('Exam - '+response.data.name +' Added Successfully');
                    this.onReset();
                    
                } catch(error){
                    console.log(error.message);
                    Vue.$toast.error(error.message);
                    //this.setExamToEmptyString();
                }
            }
            else {
                Vue.$toast.error('Please Enter Valid Exam Credentials');
                this.status = 'INVALID'
                //this.setExamToEmptyString();
            }
        }, 
        validateExam() {
            
            this.validateName(); 
            this.validateDate();
            this.validateStartTime();
            this.validateEndTime(); 
            this.validateExaminees();
            this.validateQuestions();
            //console.log(this.exam);
            console.log(this.errors);
            if (this.errors.name && 
                    this.errors.date && 
                        this.errors.startTime && 
                            this.errors.endTime.required && this.errors.endTime.lessStartTime && 
                                this.errors.examinees &&
                                    this.errors.questions)
            return true;
            return false;
        },
        validateName() {
            let nameError = null;
            if (this.exam.name == '')
                nameError = false;
            else
                nameError = true;
            this.errors = {
                ...this.errors,
                name : nameError
            }
            console.log(this.errors);
        },
        validateDate() {
            let dateError = null;
            if (this.exam.date == '')
                dateError = false;
            else
                dateError = true;
            this.errors = {
                ...this.errors,
                date : dateError
            }
            console.log(this.errors);
        },
        validateStartTime() {
            let startTime = null;
            if (this.exam.startTime == '')
                startTime = false;
            else
                startTime = true;
            this.errors = {
                ...this.errors,
                startTime
            }
            let lessStartTime = null;
            if (this.validEndTime()) {
                lessStartTime = true;
            }
            else 
            lessStartTime = false;
            this.errors = {
                ...this.errors,
                endTime : {
                    ...this.errors.endTime,
                    lessStartTime
                }
            }
            console.log(this.errors);
            console.log(this.errors);
        },
         validateEndTime() {
            let required = null;
            if (this.exam.endTime == '')
                required = false;
            else
                required = true;
            this.errors = {
                ...this.errors,
                endTime : {
                    ...this.errors.endTime,
                    required
                }
            }
            let lessStartTime = null;
            if (this.validEndTime()) {
                lessStartTime = true;
            }
            else 
            lessStartTime = false;
            this.errors = {
                ...this.errors,
                endTime : {
                    ...this.errors.endTime,
                    lessStartTime
                }
            }
            console.log(this.errors);
        },
        validEndTime() {
            if (this.exam.startTime == '')
            return false;
            const startTimeArray = this.exam.startTime.split(":");
            const endTimeArray = this.exam.endTime.split(":")
            let startTime = {
                        hours: parseInt(startTimeArray[0]),
                        minutes: parseInt(startTimeArray[1])
                    };
            let endTime = {
                        hours: parseInt(endTimeArray[0]),
                        minutes: parseInt(endTimeArray[1])
                    };
            if (startTime.hours > endTime.hours)
                return false;
            if (startTime.hours == endTime.hours && startTime.minutes >= endTime.minutes)
                return false;
            return true;
        },
        validateExaminees() {
            let examinees = null;
            if (this.exam.examinees.length == 0)
                examinees = false;
            else
                examinees = true;
            this.errors = {
                ...this.errors,
                examinees
            }
            console.log(this.errors);
        },
        validateQuestions() {
            let questions = null;
            if (this.exam.questions.length == 0)
                questions = false;
            else
                questions = true;
            this.errors = {
                ...this.errors,
                questions
            }
            console.log(this.errors);
        },
        setErrorsToNull() {
            this.errors = {
                name: null,
                date: null,
                startTime: null,
                endTime: {
                    required: null,
                    lessStartTime: null },
                examinees: null,
                questions: null,
            }
        },
        onReset() {
            this.setErrorsToNull();
        },
        isQuestionAlreadyAdded(questionId) {
            if (this.exam.questions.indexOf(questionId)==-1)
                return false;
            else
                return true;
        },
        isExamineeAlreadyAdded(examineeId) {
            if (this.exam.examinees.indexOf(examineeId)==-1)
                return false;
            else
                return true;
        }
    },
    validations: {
        exam: {
            name: {
                required
            },
            date: {
                required
            },
            startTime: {
                required
            },
            endTime: {
                required,
                /*validDuration: function() {
                        try {
                        const startTimeArray = this.exam.startTime.split(":");
                        const endTimeArray = this.exam.endTime.split(":");
                        const startTime = {
                            hours: parseInt(startTimeArray[0]),
                            minutes: parseInt(startTimeArray[1])
                        };
                        const endTime = {
                            hours: parseInt(endTimeArray[0]),
                            minutes: parseInt(endTimeArray[1])
                        };
                        if (endTime.hours > startTime.hours)
                            return true;
                        else if (endTime.hours == startTime.minutes && endTime.minutes > startTime.minutes+10)
                            return true;
                        return false;
                        }
                        catch (error) {
                            return false;
                        }
                    }*/
            },
            examinees: {
                required: function(value) {
                        return value.length > 0;
                    },
            },
            questions: {
                required: function(value) {
                        return value.length > 0;
                    }
            }
        }
    },
    components: {
        ExaminerNavBar,
        ExaminerExamNavBar
        },
    created () {
        this.getAllExaminees();
        this.getAllQuestions();
    },
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
</style>