import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
  state: {
    products: {},
    count: 0,
    cartDataFromAjax: {
      carts: [],
      total: 0,
      final_total: 0
    },
    cartsInVuex: {},
    isLoading: false,
		isLogin: false
  },
  mutations: {
    updateQty (state, payload) {
      const {id, val} = payload;
      let temp = {}
      temp[id] = parseInt(val)
      delete state.cartsInVuex[id]
      state.cartsInVuex = {...state.cartsInVuex, ...temp}
    },
    setProducts (state, payload){
			state.products = payload
    },
		setisLogin (state, payload){
			state.isLogin = payload
    },
    setIsLoading (state, payload){
			state.isLoading = payload
		},
		setCartDataFromAjaxData (state, payload){
			state.cartDataFromAjax = payload
    },
    setCartsInVuexData (state, { productId, qty }){
      let temp = {};
      if(Object.keys(state.cartsInVuex).indexOf(productId) === -1){
        temp[productId] = parseInt(qty);
        state.cartsInVuex = {
          ...state.cartsInVuex,
          ...temp
        };
      }else{
        temp[productId] = state.cartsInVuex[productId] + parseInt(qty);
        state.cartsInVuex = {
          ...state.cartsInVuex,
          ...temp
        };
      }
    },
    clearCartsInVuexData (state){
      state.cartsInVuex = {};
    },
    deleteProductInVuexCarts(state, payload){
      let temp = state.cartsInVuex;
      state.cartDataFromAjax.carts.forEach(cart=>{
        if(cart.id === payload.id){
          delete temp[cart.product_id];
        }
      })
      state.cartsInVuex = {
        ...temp
      };
    },
  },
  getters: {
		cartsInVuexLength (state){
      let temp = 0;
      Object.values(state.cartsInVuex).forEach(val=>{
        temp += val
      })
      return temp
    },
  },
	actions: {
		getCart({ commit, state }, {loadingEffect}) {
      return new Promise((resolve, reject) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        loadingEffect && commit('setIsLoading', true)
        axios.get(api).then((response) => {
          const { success, data } = response.data;
          if (success) {
            commit('setCartDataFromAjaxData', data)
            loadingEffect && commit('setIsLoading', false)
            resolve();
          }
        });
      })
    },
    addCart({ commit }, { productId, qty, loadingEffect }) {
      return new Promise((resolve, reject) => {
        if (qty < 1) {
          return;
        }
        const data = {
          data: { product_id: productId, qty } ,
        };
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        loadingEffect && commit('setIsLoading', true)
        axios.post(api, data).then((response) => {
          const { success } = response.data;
          if (success) {
            loadingEffect && commit('setIsLoading', false)
            resolve();
          }
        });
      })
    },
    delCart({ commit }, { cartId, loadingEffect }) {
      return new Promise((resolve, reject) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartId}`;
        loadingEffect && commit('setIsLoading', true)
        axios.delete(api).then((response) => {
          const { success } = response.data;
          if (success) {
            loadingEffect && commit('setIsLoading', false)
            resolve();
          }
        });
      })
    },
    async setCart({ dispatch, commit, state }) {
      commit('setIsLoading', true)
      await dispatch('getCart', {'loadingEffect': false})
      for(let idx in state.cartDataFromAjax.carts){
        let {id} = state.cartDataFromAjax.carts[idx]
        await dispatch('delCart', {'cartId': id,'loadingEffect': false})
      }
      for(const [key, value] of Object.entries(state.cartsInVuex)){
        await dispatch('addCart', { 'productId': key, 'qty': value ,'loadingEffect': false})
      }
      await dispatch('getCart', {'loadingEffect': false})
      commit('setIsLoading', false)
    },
    logout({ commit, state }){
      commit('setIsLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      axios.post(api).then((response) => {
        const { success, data } = response.data;
        if (success) {
					commit('setisLogin', false)
          commit('setIsLoading', false)
        }
      });
    },
    getProducts({ commit, state }, {loadingEffect}) {
      return new Promise((resolve, reject) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
        loadingEffect && commit('setIsLoading', true)
        axios.get(api).then((response) => {
          const { success, products } = response.data;
          if (success) {
            let newProducts = {}
            let temp = {}
            products.forEach(product=>{
              temp[product.id] = product
              newProducts = {...temp}
            })
            commit('setProducts', newProducts)
            loadingEffect && commit('setIsLoading', false)
            resolve();
          }
        });
      })
    },
  }
})

export default store
