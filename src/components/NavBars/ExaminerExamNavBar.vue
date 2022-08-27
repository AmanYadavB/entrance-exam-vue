<template>
    <div class="flex ms-4 rounded-top me-4 sticky-1 mobile-d-none">
            <b-nav card-header tabs class="flex bg-info border-infoborder rounded">
                <div active class="rounded flex al-cent" ><a class="link-plain p-2 text-info" href="/allassesments" :class="{'bg-white rounded' : activeTab() == 'all-exams-page', 'text-white' : activeTab() != 'all-exams-page'}">All assesments</a></div>
                <div class="flex al-cent rounded"><a class="link-plain p-2 text-info" :class="{'text-white ' : activeTab() != 'add-exam-page', 'bg-white rounded' : activeTab() == 'add-exam-page'}" href="/addexam/">Add an Assesment</a></div>
            </b-nav>
    </div>
</template>
<script>
//import router from '@/router';
//import Vue from 'vue';


export default {
    name: 'ExaminerExamNavBar',
    methods: {
         activeTab() {
            return this.$router.currentRoute.name;
        }
    }
}
</script>
<style>
</style>