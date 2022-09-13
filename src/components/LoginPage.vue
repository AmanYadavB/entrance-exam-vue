<template>
<div class="background-color flex al-cent jc-cent" style="height: 100vh;">
    <div class="flex-basis-50 m-5">
        <div class="">
            <div class="border border-info rounded bg-info text-white flex-basis-70 shadow">
                <div class="p-3 fs-4 text-center fw-bold">Login To Entrance Exam </div>
            </div>
        </div>
        <div class="">
            <div class="border border-info rounded flex-basis-70 bg-white shadow">
                <b-container fluid class="m-4">
                    <b-row class="my-3 mb-2">
                        <b-row sm="3" class="mb-2">
                        <label for="input-none" class="fs-6 fw-bold">Username:</label>
                        </b-row>
                        <b-col sm="9">
                        <b-form-input id="input-none" class="input-overflow" :state="isEmailValid" placeholder='Email' v-model="form.email" @input="onEmailInput"></b-form-input>
                        </b-col>
                        <div v-if="isEmailValid!=null && !isEmailValid">
                            <div id="" class="fs-7 ms-1 mt-2 text-danger" v-if="!$v.form.email.required">
                                Username required
                            </div>
                            <div id="" class="fs-7 ms-1 mt-2 text-danger" v-if="!$v.form.email.email">
                                Invalid username
                            </div>
                        </div>
                    </b-row>

                    <b-row class="my-3">
                        <b-row sm="3" class="mb-2">
                        <label for="input-none" class="fs-6 fw-bold ">Password:</label>
                        </b-row>
                        <b-col sm="9">
                        <b-form-input type="password" id="input-none" :state="isPasswordValid" placeholder="Password" class="input-overflow" v-model="form.password" @input="onPasswordInput"></b-form-input>
                        </b-col>
                        <div v-if="isPasswordValid!=null && !isPasswordValid">
                            <div id="" class="fs-7 ms-1 mt-2 text-danger" v-if="!$v.form.password.required">
                                Password required
                            </div>
                            <div id="" class="fs-7 ms-1 mt-2 text-danger" v-else-if="!$v.form.password.minLength">
                                Password must have at least 8 characters
                            </div>
                            <div id="" class="fs-7 ms-1 mt-2 text-danger" v-else-if="!$v.form.password.containsUppercase">
                                Password must have at least one uppercase letter
                            </div>
                            <div id="" class="fs-7 ms-1 mt-2 text-danger" v-else-if="!$v.form.password.containsLowercase">
                                Password must have at least one lowercase letter
                            </div>
                            <div id="" class="fs-7 ms-1 mt-2 text-danger" v-else-if="!$v.form.password.containsNumber">
                                Password must have at least one number
                            </div>
                            <div id="" class="fs-7 ms-1 mt-2 text-danger" v-else-if="!$v.form.password.containsSpecial">
                                Password must have at least one special character
                            </div>
                        </div>
                    </b-row>
                    <div class="flex jc-space-between">
                        <b-button class="bg-warning border-white text-dark ps-3 pe-3 fs-5" href="" @click="loginUser">
                            <b-spinner small v-if="status=='LOADING'" class="me-1"></b-spinner>
                            Login</b-button>
                        <a class=" pe-3 mt-3 me-5 fs-6" href="/register" >Register here</a>
                    </div>
                </b-container>
            </div>
        </div>    
    </div>
</div>
</template>
<script>
//import router from '@/router'
import Vue from 'vue';
//import {loginUser} from '../services/users'
import {required, minLength, email} from 'vuelidate/lib/validators'
    export default {
        name: 'LoginPage',
        data() {
            return {
                status: '',
                form: {
                    email: '',
                    password: ''
                },
                isEmailValid: null,
                isPasswordValid: null
            }
        },
        methods: {
            onEmailInput () {
                this.isEmailValid = !this.$v.form.email.$invalid;
            },
            onPasswordInput () {
                this.isPasswordValid = !this.$v.form.password.$invalid;
            },
            async loginUser(){
                const credentials = {
                    email: this.form.email,
                    password: this.form.password
                }
                if (!this.$v.form.$invalid)
                {
                    this.status = 'LOADING';
                    try{
                    await this.$store.dispatch('login', credentials);
                    //Vue.$toast.success('Welcome '+user.name);
                    this.status = 'LOADED';
                    if(this.$store.getters.isAuthenticated) {
                        if(this.$store.getters.isExaminer) {
                            this.$router.push( {path: `/allassesments`});
                        }
                        else
                        this.$router.push({ path :`/assesments`})
                    }
                    else
                    {
                        Vue.$toast.error('Invalid Username Or Password');
                    }
                } catch(error){
                    console.log(error.message);
                    this.status = 'ERROR';
                    if(error.message == '403') {
                        Vue.$toast.error('Invalid Username Or Password');
                    }
                    else
                    Vue.$toast.error('Some error ocurred');
                }
                }

                else {
                    Vue.$toast.error('Invalid Credentials');
                }
            }
        },
        validations: {
            form: {
                email: {
                    email,
                    required
                },
                password: {
                    required,
                    minLength: minLength( 8 ),
                    containsUppercase: function(value) {
                        return /[A-Z]/.test(value)
                    },
                    containsLowercase: function(value) {
                        return /[a-z]/.test(value)
                    },
                    containsNumber: function(value) {
                        return /[0-9]/.test(value)
                    },
                    containsSpecial: function(value) {
                        return /[#?!@$%^&*-]/.test(value)
                    }
                }
            }
        },
        created () {
            console.log(this.$router);
            console.log(this.$store);
        }
    }
</script>
<style scoped>
    .m-10{
        padding-top: 5em;
        padding-bottom: 12em;
    }
    .w-70{
        height: 70%;
    }
    .jc-cent{
        justify-content: center;
    }
    .flex-basis-70{
        flex-basis: 50%;
    }
    .fs-7{
        font-size: smaller;
    }
    @media only screen and (max-width: 1000px){
        .flex-basis-70{
            flex-basis: 70%;
        }
    }
    @media only screen and (max-width: 570px){
        .input-overflow{
            width: 80%;
        }
    }
</style>