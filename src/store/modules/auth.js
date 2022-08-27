import { loginUser } from '@/services/users';

const KEY_TOKEN = 'token';
const KEY_NAME = 'name';
const KEY_ROLE = 'role';
const KEY_USER_ID = 'userId'

const auth = {
    state: {
        token: localStorage.getItem( KEY_TOKEN ) || '',
        name: localStorage.getItem( KEY_NAME ) || '',
        role: localStorage.getItem( KEY_ROLE ) || '',
        userId: localStorage.getItem( KEY_USER_ID) || ''
    },
    getters: {
        isAuthenticated( state ) {
            return !!state.token;
        },
        isExaminer( state ) {
            return state.role === 'examiner';
        }
    },
    mutations: {
        setToken( state, token ) {
            state.token = token;
        },
        setName( state, name ) {
            state.name = name;
        },
        setRole( state, role ) {
            state.role = role;
        },
        setUserId( state, userId) {
            state.userId = userId;
        }
    },
    actions: {
        // credentials = { email: string, password: string }
        // login( context, credentials ) {
        login( { commit }, credentials ) {
             console.log( commit); // { commit: fn, getters: fn, }

            return loginUser( credentials )
                        .then( data => {
                            const { token, name, role, _id } = data.data
                            console.log(data.data);
                            localStorage.setItem( KEY_TOKEN, token );
                            localStorage.setItem( KEY_NAME, name );
                            localStorage.setItem( KEY_ROLE, role );
                            localStorage.setItem( KEY_USER_ID, _id);
                            commit( 'setToken', token );
                            commit( 'setName', name );
                            commit( 'setRole', role );
                            commit( 'setUserId', _id)
                            return _id;
                        });
        },
        logout( { commit } ) {
            localStorage.removeItem( KEY_TOKEN );
            localStorage.removeItem( KEY_NAME );
            localStorage.removeItem( KEY_ROLE );
            localStorage.removeItem( KEY_USER_ID);
            commit( 'setToken', '' );
            commit( 'setName', '' );
            commit( 'setRole', '' );
            commit( 'setUserId', '')
            return Promise.resolve();
        }
    }
};

export default auth;