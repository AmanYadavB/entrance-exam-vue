import Router from "vue-router";
import CodePage from "../components/CodePage";
import QuestionsPage from '../components/QuestionsPage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import AssesmentsPage from '../components/AssesmentsPage'
import AddQuestionPage from '../components/AddQuestionPage';
import AllQuestionsPage from '../components/AllQuestionsPage';
import PageNotFound from '../components/utils/PageNotFound';
import AddExamPage from '../components/AddExamPage'
import AllAssesmentsPage from '../components/AllAssesmentsPage';
import UserSubmittionsPage from '../components/UserSubmittionsPage';
import AnswerPage from '../components/AnswerPage';
import store from '@/store';
import Vue from "vue";

const meta = {
    authorize: [ 'examinee', 'examiner' ]
};

const router = new Router(
    {   mode: 'history',
        routes: [
            {
                name: 'code-page',
                path: '/:examId/questions/:questionId',
                component: CodePage,
                meta
            },
            {
                name: 'assesment-page',
                path: '/:id/questions',
                component: QuestionsPage,
                meta
            },
            {
                name: 'login-page',
                path: '/login',
                component: LoginPage,
            },
            {
                name: 'login-page',
                path: '/',
                component: LoginPage,
            },
            {
                name: 'register-page',
                path: '/register',
                component: RegisterPage,
            },
            {
                name: 'add-question-page',
                path: '/addquestion',
                component: AddQuestionPage,
                meta : {
                    authorize: ['examiner']
                }
            },
            {
                name: 'all-exams-page',
                path: '/allassesments',
                component: AllAssesmentsPage,
                meta : {
                    authorize: ['examiner']
                }
            },
            {
                name: 'user-submittion-page',
                path: '/usersubmittions/:id',
                component: UserSubmittionsPage,
                meta : {
                    authorize: ['examiner']
                }
            },
            {
                name: 'answer-page',
                path: '/usersubmittions/:examId/:userId',
                component: AnswerPage,
                meta : {
                    authorize: ['examiner']
                }
            },
            {
                name: 'all-questions-page',
                path: '/allquestions',
                component: AllQuestionsPage,
                meta : {
                    authorize: ['examiner']
                }
            },
            {
                name: 'add-exam-page',
                path: '/addexam',
                component: AddExamPage,
                meta : {
                    authorize: ['examiner']
                }
            },
            {
                name: 'assesments-page',
                path: '/assesments',
                component: AssesmentsPage,
                meta
            },
            {
                name: 'page-not-found',
                path: '/pagenotfound',
                component: PageNotFound
            }
        ]
    }
);

router.beforeEach(( to, from, next ) => {
    const authorize = to.meta.authorize;
    console.log(to.name);
    if(!to.name) {
        return next({
            name: 'page-not-found'
        })
    }
    if( authorize && !store.getters.isAuthenticated ) {
        Vue.$toast.error('Please Login Before Accessing the Page')
        return next({
            name: 'login-page'
        });
    } else {
        if( authorize && !authorize.includes( store.state.auth.role ) ) {
            Vue.$toast.error('You Are Not Authorized To Access The Page')
            return next({
                path: '/assesments'
            });
        }
    }

    next();
});

 export default router;