<template>
    <div class="flex ms-4 rounded-top me-4 sticky-1 mobile-d-none">
            <b-nav card-header tabs class="bg-info border-infoborder rounded">
                <div active class="rounded flex al-cent" ><a class="link-plain p-2 text-info" href="/allquestions" :class="{'bg-white rounded' : activeTab() == 'all-questions-page', 'text-white' : activeTab() != 'all-questions-page'}">All Questions</a></div>
                <div class="flex al-cent rounded"><a class="link-plain p-2 text-info" :class="{'text-white ' : activeTab() != 'add-question-page', 'bg-white rounded' : activeTab() == 'add-question-page'}" href="/addquestion/">Add a Question</a></div>
            </b-nav>
    </div>
</template>
<script>
//import router from '@/router';
//import Vue from 'vue';


export default {
    name: 'ExaminerQuestionNavBar',
    methods: {
         activeTab() {
            return this.$router.currentRoute.name;
        }
    }
}
</script>
<style>
</style>