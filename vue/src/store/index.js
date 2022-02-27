import {createStore} from 'vuex';
import axiosClient from '../axios'

const store = createStore({
    state: {
        user: {
            name: 'Charles Pitagan',
            token: null
        }
    },
    getters: {},
    actions: {
      login() {
        return axiosClient.get('/user')
      }
    },
    mutations: {},
    modules: {}
})

export default store;
