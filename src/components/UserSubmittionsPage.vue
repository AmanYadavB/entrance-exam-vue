<template>
    <div class="">
        <div class="text-center" v-if="status=='LOADING'">
            <b-spinner variant="info" label="" ></b-spinner>
        </div>
        <div v-if="status='LOADED'">
            <ExaminerNavBar />
            <div v-if="users.length==0" class="flex jc-cent w-100 al-cent border border-info" style="height: 35em">
                <div class="mb-5 p-5 background-color w-70 border border-info rounded">
                    <div class="fw-bold fs-1 text-center" >No Submissions Yet</div>
                </div>
            </div>
            <div v-else>
                <div v-for="user in users" :key="user._id" class="flex jc-space-between p-3 m-3 background-color border border-info rounded">
                    <div>{{user.userId.name}}</div>
                    <div> <a :href="`/usersubmittions/${$router.history.current.params.id}/${user.userId._id}`" class="link-plain text-warning"> View </a> </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
//import Vue from 'vue';
import router from '../router';
import ExaminerNavBar from './ExaminerNavBar.vue';
import { getAllUserSubmition } from '@/services/answers';
export default {
    name: 'UserSubmittionsPage',
    data () {
        return {
            status: 'LOADING',
            users: []
        }
    },
    methods: {
        async getAllUserSubmition() {
            this.status='LOADING';
            try {
                const examId = router.history.current.params.id;
                const response = await getAllUserSubmition(examId);
                //this.users = response.data;
                let flag =1;
                let users = response.data;
                //console.log(users.userId);
                for(let j in users) {
                    //console.log(users.userId[j])
                    flag = 1;
                    for (let i in this.users) {
                        if(this.users[i].userId._id == users[j].userId._id)
                            flag = 0;
                    }
                    if (flag==1) {
                        this.users.push(users[j]);
                    }
                }

                console.log(this.users);
                
                this.status = "LOADED";
            }
            catch (error) {
                this.status = "ERROR";
                this.error = error.message;
            }
        },
    },
    created() {
        this.getAllUserSubmition();
    },
    components: {ExaminerNavBar}
}
</script>
<style>
    
</style>