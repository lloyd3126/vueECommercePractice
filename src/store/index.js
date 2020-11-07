import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
  state: {
    count: 0,
    cartData: {},
		isLoading: false
  },
  mutations: {
		setIsLoading (state, payload){
			state.isLoading = payload
		},
		setCartData (state, payload){
			state.cartData = payload
		},
	},
	actions: {
		getCart({ commit, state }) {
			commit('setIsLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(api).then((response) => {
        const { success, data } = response.data;
        if (success) {
					commit('setCartData', data)
					commit('setIsLoading', false)
        }
      });
    },
  }
})

export default store
