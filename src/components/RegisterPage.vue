<template>
<div class="background-color flex al-cent jc-cent" style="height: 100vh;">
    <div class="flex-basis-50 m-5">
        <div class="">
            <div class="border border-info rounded bg-info text-white flex-basis-70 shadow">
                <div class="p-3 fs-4 text-center fw-bold">Register To Entrance Exam </div>
            </div>
        </div>
        <div class="">
            <div class="border border-info rounded flex-basis-70 bg-white shadow">
                
                    <b-container fluid class="m-4">
                        
                        <b-row class="my-3 mb-2">
                            <b-row sm="3" class="mb-2">
                            <label for="input-none" class="fs-6 fw-bold">Name:</label>
                            </b-row>
                            <b-col sm="9">
                            <b-form-input id="input-none" :state="isNameValid" class="input-overflow" placeholder='Name' v-model="form.name" @input="onNameInput"></b-form-input>
                            </b-col>
                            <div v-if="isNameValid!=null && !isNameValid">
                                <div id="" class="fs-7 ms-1 mt-2 text-danger" v-if="!$v.form.name.required">
                                    Name is required
                                </div>
                                <div id="" class="fs-7 ms-1 mt-2 text-danger" v-if="!$v.form.name.minLength">
                                    Name should have atleast 3 letters
                                </div>
                            </div>
                        </b-row>

                        <b-row class="my-3 mb-2">
                            <b-row sm="3" class="mb-2">
                            <label for="input-none" class="fs-6 fw-bold">Email:</label>
                            </b-row>
                            <b-col sm="9">
                            <b-form-input id="input-none" :state="isEmailValid" class="input-overflow" placeholder='Email' v-model="form.email" @input="onEmailInput"></b-form-input>
                            </b-col>
                            <div v-if="isEmailValid!=null && !isEmailValid">
                                <div id="" class="fs-7 ms-1 mt-2 text-danger" v-if="!$v.form.email.required">
                                    Email required
                                </div>
                                <div id="" class="fs-7 ms-1 mt-2 text-danger" v-if="!$v.form.email.email">
                                    Invalid email
                                </div>
                            </div>
                        </b-row>

                        <b-row class="my-3">
                            <b-row sm="3" class="mb-2">
                            <label for="input-none" class="fs-6 fw-bold">Password:</label>
                            </b-row>
                            <b-col sm="9">
                            <b-form-input type="password" id="input-none" :state="isPasswordValid" class="input-overflow" placeholder="Password" v-model="form.password" @input="onPasswordInput"></b-form-input>
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

                        <b-row class="my-3 mb-2">
                            <b-row sm="3" class="mb-2">
                            <label for="input-none" class="fs-6 fw-bold">Confirm Password:</label>
                            </b-row>
                            <b-col sm="9">
                            <b-form-input id="input-none" :state="isConfPassValid" class="input-overflow" placeholder='Confirm Password' v-model="form.confPass" @input="onConfPasswordInput"></b-form-input>
                            </b-col>
                            <div v-if="isConfPassValid!=null && !isConfPassValid">
                                <div id="" class="fs-7 ms-1 mt-2 text-danger" v-if="!$v.form.confPass.required">
                                    Confirm Password required
                                </div>
                                <div id="" class="fs-7 ms-1 mt-2 text-danger" v-if="!$v.form.confPass.isSame">
                                    Password do not match
                                </div>
                            </div>
                        </b-row>
                        <div class="flex jc-space-between">
                            <b-button class="bg-warning border-white text-dark mt-3 ps-3 pe-3 fs-5" type="submit" href="./login" @click.prevent="registerUser">
                                <b-spinner small v-if="status=='LOADING'" class="me-1"></b-spinner>
                                <span class="sr-only ms-1 p-1" v-if="status=='LOADING'">Loading...</span> 
                                <span class="sr-only" v-else>Register</span>
                            </b-button>
                            <a href="/login" class="mt-4 me-5">Already registered? Login here</a>
                        </div>   
                    </b-container>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import {registerUser} from '../services/users'
import {required, minLength, email} from 'vuelidate/lib/validators'
import router from '@/router'
    export default {
        name: 'LoginPage',
        data() {
            return {
                status: '',
                form: {
                    name: '',
                    email: '',
                    password: '',
                    confPass: ''
                },
                isEmailValid: null,
                isPasswordValid: null,
                isNameValid: null,
                isConfPassValid: null
            }
        },
        methods: {
            onEmailInput () {
                this.isEmailValid = !this.$v.form.email.$invalid;
            },
            onPasswordInput () {
                this.isPasswordValid = !this.$v.form.password.$invalid;
            },
            onNameInput () {
                this.isNameValid = !this.$v.form.name.$invalid;
            },
            onConfPasswordInput () {
                this.isConfPassValid = !this.$v.form.confPass.$invalid;
            },
            async registerUser(){
                const credentials = {
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password
                }
                if (!this.$v.form.$invalid)
                {
                    this.status = 'LOADING';
                    try{
                    const user = await registerUser(credentials);
                    this.status = 'LOADED';
                    console.log(user);
                    Vue.$toast.success(''+user.data.name +' Registered Successfully');
                    router.push('./login')
                } catch(error){
                    console.log(error.message);
                    Vue.$toast.error(error.message);
                    this.status = 'ERROR';
                }
                }

                else {
                    this.status = 'ERROR';
                    Vue.$toast.error('Invalid Credentials');
                }
                
            }
        },
        validations: {
            form: {
                name: {
                    required,
                    minLength: minLength( 3 )
                },
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
                },
                confPass: {
                    required,
                    isSame: function () {
                        return this.form.password == this.form.confPass;
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .m-10{
        padding-top: 5em;
        padding-bottom: 5em;
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