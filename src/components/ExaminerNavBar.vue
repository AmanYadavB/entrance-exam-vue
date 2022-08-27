<template>
    <div class="shadow sticky">
        <div class="pc-d-none" >
            
            <div class="bg-info flex jc-space-between w-100">
                <span class="p-1 ps-3 fs-5 fw-bold text-white" :class="{'d-none': activeTab()=='add-question-page' || activeTab() == 'all-questions-page'}">Exams</span>
                <span class="p-1 ps-3 fs-5 fw-bold text-white" :class="{'d-none': activeTab()=='add-exam-page' || activeTab() == 'all-exams-page'}">Questions</span>
                <b-button class="p-1 ps-2 pe-2 fs-5 bg-info text-white border border-info" @click="toggleMenu" >
                    <b-icon icon="list"></b-icon>
                </b-button>
            </div>
        </div>
        <div class="flex jc-space-between ps-4 pe-4 bg-info text-white border border-info" :class="{'mobile-d-none background-color' : toggle, 'mobile-d-init' : !toggle}">
            <div class="fs-5 fw-bold flex" >
                   <div class="list-none p-2 ps-4 pe-4 rounded flex-mobile" :class="{'bg-info' : activeTab() != ('add-exam-page' ) && activeTab() != ('all-exams-page' ), 'bg-white' : activeTab() == ('add-exam-page' ) || activeTab() == ('all-exams-page' )}" >
                        <a href="/allassesments" class="link-plain text-white" >
                        <span :class="{'text-white' : activeTab() != ('add-exam-page') && activeTab() != ('all-exams-page'), 'text-info' : activeTab() == ('add-exam-page') || activeTab() == ('all-exams-page')}">Exams</span></a>
                    </div>
                    <div class="flex fs-6 ms-3 m-1 fw-normal w-100 pc-d-none">
                    <div active class="rounded flex al-cent flex-mobile" :class="{'bg-white rounded' : activeTab() == 'all-exams-page'}"><a class="link-plain p-2 text-info" href="/allassesments" :class="{ 'text-white' : activeTab() != 'all-exams-page'}">All assesments</a></div>
                    <div class="flex al-cent rounded flex-mobile" :class="{'bg-white rounded' : activeTab() == 'add-exam-page'}"><a class="link-plain p-2 text-info" :class="{'text-white ' : activeTab() != 'add-exam-page', 'bg-white rounded' : activeTab() == 'add-exam-page'}" href="/addexam/">Add an Assesment</a></div>
                    </div>
                    <div class="list-none p-2 ps-4 pe-4 rounded flex-mobile" :class="{'bg-info' : activeTab() != ('add-question-page' ) && activeTab() != ('all-questions-page' ), 'bg-white' : activeTab() == ('add-question-page' ) || activeTab() == ('all-questions-page' )}">
                        <a href="/allquestions" class="link-plain text-white">
                        <span :class="{'text-white' : activeTab() != ('add-question-page' ) && activeTab() != ('all-questions-page' ), 'text-info' : activeTab() == ('add-question-page' ) || activeTab() == ('all-questions-page' )}">Questions</span></a>
                    </div>
                    <div class="flex fs-6 ms-3 m-1 fw-normal w-100 pc-d-none ">
                    <div active class="rounded flex al-cent flex-mobile" :class="{'bg-white rounded' : activeTab() == 'all-questions-page'}"><a class="link-plain p-2 text-info" href="/allquestions" :class="{'text-white' : activeTab() != 'all-questions-page'}">All Questions</a></div>
                    <div class="flex al-cent rounded flex-mobile" :class="{'bg-white rounded' : activeTab() == 'add-question-page'}" ><a class="link-plain p-2 text-info" :class="{'text-white ' : activeTab() != 'add-question-page'}" href="/addquestion/">Add a Question</a></div>
                    </div>
                    <div class="pc-d-none flex-mobile list-none p-2 ps-4 pe-4 rounded">
                        <a href="" @click="onLogout" class="link-plain text-white">Logout</a>
                    </div>
            </div>
            <div class="fs-5 fw-bold p-2 mobile-d-none">
                 Hello
                <span class="fs-6 fw-bold text-white ms-2 me-4"> {{$store.state.auth.name}}</span>
                <a href="" @click="onLogout" class="link-plain text-white">Logout</a>
            </div>
        </div>
    </div>
</template>
<script>
import router from '@/router';
import Vue from 'vue';
//import ExaminerExamNavBar from './NavBars/ExaminerExamNavBar.vue';

export default {
    name: 'ExamineeNavBar',
    data() {
        return {
            toggle: true
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
        activeTab() {
            if (    router.currentRoute.name == 'all-exams-page' 
                        || router.currentRoute.name == 'answer-page'
                            || router.currentRoute.name == 'user-submittion-page')
            return 'all-exams-page';
            else return router.currentRoute.name;
        },
        toggleMenu() {
            this.toggle = !this.toggle;
        }
        
    },
    //components: {
       // ExaminerExamNavBar
    //}
}
</script>
<style>
    .link-plain{
        text-decoration: none;
    }
    .sticky{
        position: sticky;
        top: 0px;
    }
    .list-none{
        list-style-type: none;
    }
    .m-none{
        margin: 0;
    }
    .current {
       color: black;
    }
    .a:link {
        color: white;
    }
    .pc-d-none {
        display: none;
    }
    .sticky-1 {
        position: sticky;
        top: 3.025em;
    }
    @media only screen and (max-width: 1000px){
        .flex-mobile {
            flex-basis: 100%;
        }
        .mobile-d-none {
            display: none;
        }
        .sticky-1 {
            position: sticky;
            top: 5.7em;
        }
    
        .pc-d-none {
            display: inherit;
            width: 100%;
        }
        .mobile-d-init {
            display: inherit;
        }
    }
</style>