<template>
    <div class="shadow sticky">
        <div class="pc-d-none">
            <div class=" bg-info">
                <div class="flex jc-space-between">
                     <div class="fs-5 text-white p-1 fw-bold">
                    Entrance Exam
                    </div>
                    <div>
                        <b-button class="p-1 ps-2 pe-2 fs-5 bg-info text-white border border-info" @click="toggleMenu">
                        <b-icon icon="list"></b-icon>
                        </b-button>
                    </div> 
                </div> 
                <div v-if="toggle" class="fs-5 ms-3 m-1 fw-bold flex">
                    <div class="flex-mobile text-white p-1">
                        Hello
                    <span class="fs-6 fw-bold text-white "> {{$store.state.auth.name}}</span>
                    </div>
                    <a href="" @click="onLogout" class="link-plain text-white flex-mobile p-1">Logout</a>
                </div>
            </div> 
        </div>
        <div class="flex jc-space-between ps-4 p-2 pe-4 bg-info text-white mobile-d-none">
            <div class="fs-4 fw-bold">
                Entrance Exam
            </div>
            <div class="fs-5 fw-bold flex">
                <div class="">
                     Hello
                <span class="fs-6 fw-bold text-white ms-2 me-4 "> {{$store.state.auth.name}}</span>
                </div>
                <a href="" @click="onLogout" class="link-plain text-white">Logout</a>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';


export default {
    name: 'ExamineeNavBar',
    data() {
        return {
            toggle: false
        }
    },
    methods: {
        onLogout() {
             try{
                    this.$store.dispatch('logout');
                    Vue.$toast.success('Logged Out Successfully')
                    this.$router.push({ name :'login-page'})
                } catch(error){
                    console.log(error.message);
                    Vue.$toast.error(error.message);
                }
        },
        toggleMenu() {
            this.toggle = !this.toggle;
        }
    }
}
</script>
<style>
    .background-danger{
        background-color: rgb(255, 212, 212);
    }
    .link-plain{
        text-decoration: none;
    }
</style>