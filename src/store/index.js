import { Toast, Dialog } from 'vant';
import Vue from 'vue';
import Vuex from 'vuex';
import { SAVE_CART_GOODS, SAVE_ORDER_LIST, SAVE_RECOMMENDS, SAVE_USER, SET_CART_GOODS_CHECKED, SET_CART_GOODS_COUNT, SAVE_CART_ORDER, SAVE_CLASSIFICATIONS } from './types';
import { encrypt } from '@/utils/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    orderList: [],
    recommends: [],
    cartGoods: [],
    cartOrder: {
      orderCommodities: [],
    },
    classifications: []
  },
  getters: {
    user(state) {
      return state.user;
    },
    orderList(state) {
      return state.orderList;
    },
    recommends(state) {
      return state.recommends;
    },
    cartGoods(state) {
      return state.cartGoods;
    },
    cartOrder(state) {
      return state.cartOrder;
    },
    classifications(state) {
      return state.classifications;
    }
  },
  mutations: {
    [SAVE_USER](state, { payload }) {
      state.user = payload;
    },
    [SAVE_ORDER_LIST](state, { payload }) {
      state.orderList = payload;
    },
    [SAVE_RECOMMENDS](state, { payload }) {
      state.recommends = payload;
    },
    [SAVE_CART_GOODS](state, { payload }) {
      state.cartGoods = payload;
    },
    setOrderList(state, { payload }) {
      state.orderList = payload;
    },
    [SET_CART_GOODS_CHECKED](state, { payload }) {
      state.cartGoods.splice([payload.index], 1, {
        ...state.cartGoods[payload.index],
        checked: payload.checked
      })
    },
    [SET_CART_GOODS_COUNT](state, { payload }) {
      state.cartGoods.splice([payload.index], 1, {
        ...state.cartGoods[payload.index],
        number: payload.number
      })
    },
    [SAVE_CART_ORDER](state, { payload }) {
      state.cartOrder = payload;
    },
    [SAVE_CLASSIFICATIONS](state, { payload }) {
      state.classifications = payload;
    }
  },
  actions: {
    async addGood({ dispatch, commit, state }, good = {}) {
      if (state.cartGoods.find(g => g.bookID === good.bookID)) {
        Dialog.alert({ message: '该商品已经在购物车里了' })
        return;
      }
      const { cart } = await dispatch('getApi');
      const res = await cart.addGood(good)
      const { data: { data } } = res;
      commit({
        type: SAVE_CART_GOODS,
        payload: [...state.cartGoods, data.commodity],
      })

      Toast('添加购物车成功')
    },
    setGoodChecked({ commit }, data = {}) {
      commit({
        type: SET_CART_GOODS_CHECKED,
        payload: data,
      })
    },
    async setGoodCount({ commit, state, dispatch }, goodCount = {}) {
      const { cart } = await dispatch('getApi');
      const body = {
        number: goodCount.number,
        bookID: state.cartGoods[goodCount.index].bookID
      }
      const res = await cart.updateGoodCount(body);
      const { data } = res;
      if (data.status === 200) {
        commit({
          type: SET_CART_GOODS_COUNT,
          payload: {
            number: data.data.commodity.number,
            index: goodCount.index
          },
        })
      } else {
        Toast(data.message)
      }

    },
    async deleteCartGood({ dispatch, commit, state }, book_id) {
      const { cart } = await dispatch('getApi');
      const res = await cart.deleteGood(book_id);
      commit({
        type: SAVE_CART_GOODS,
        payload: state.cartGoods.filter(({bookID}) => bookID !== book_id),
      });
    },
    async getCartGoods({ dispatch, commit }) {
      const { cart } = await dispatch('getApi');
      const res = await cart.getCartGoods();
      const { data: { data } } = res;
      commit({
        type: SAVE_CART_GOODS,
        payload: data.commodities,
      });
    },
    async submitCartOrder({ commit,dispatch }, bookIDs = []) {
      const { order } = await dispatch('getApi');
      const res = await order.addOrder(bookIDs)
      const { data: { data } } = res;
      commit({
        type: SAVE_CART_ORDER,
        payload: data.order,
      })
    },
    async login({ dispatch, commit }, userInfo) {
      const { user } = await dispatch('getApi');
      const res = await user.login(userInfo);
      const { data: { data: { user: _user } } } = res;
      window.$cookies.set("username", encrypt(userInfo.username), '2h')
        .set("password", encrypt(userInfo.password), '2h')
        .set("userID", _user.id, '2h');
      commit({
        type: SAVE_USER,
        payload: _user,
      });
      dispatch('getCartGoods')
    },
    async logout({ commit }, router) {
      commit({ type: SAVE_USER, payload: {} })
      commit({ type: SAVE_ORDER_LIST, payload: [] })
      window.$cookies.remove('username')
      window.$cookies.remove('password')
      Toast('注销成功');
      router.push('/login')
    },
    async updatePayPwd({ commit, dispatch }, password) {
      const { user } = await dispatch('getApi');
      const res = await user.updatePayPwd(password);
      const { data: { message } } = res;
      Toast(message);
    },
    async updateNickname({ commit, dispatch }, nickname) {
      const { user } = await dispatch('getApi');
      const res = await user.updateNickname(nickname);
      const { data: { message, data } } = res;
      commit({
        type: SAVE_USER,
        payload: data.user,
      })
      Toast(message);
    },
    async getOrderList({ dispatch, commit }, user_id) {
      const { order } = await dispatch('getApi');
      const res = await order.list(user_id);
      const { data: { data } } = res;
      commit({
        type: SAVE_ORDER_LIST,
        payload: data.orders.reverse(),
      })
    },
    async getRecommends({ dispatch, commit }) {
      const { book } = await dispatch('getApi');
      const res = await book.getRecommends();
      const { data: { data } } = res;
      commit({
        type: SAVE_RECOMMENDS,
        payload: data.books,
      })
    },
    clearRecommends({ commit }) {
      commit({
        type: SAVE_RECOMMENDS,
        payload: [],
      })
    },
    async getClassifications({ dispatch, commit }) {
      const { book } = await dispatch('getApi');
      const res = await book.getClassifications();
      const { data: { data } } = res;
      commit({
        type: SAVE_CLASSIFICATIONS,
        payload: data.classifications.sort((a, b) => b.id - a.id),
      })
    },
    async getOrder({ dispatch, commit }, order_id = "") {
      const { order } = await dispatch('getApi');
      const res = await order.getOrder(order_id);
      const { data: { data } } = res;
      commit({
        type: SAVE_CART_ORDER,
        payload: data.order,
      })
    },
    async updateDeposit({ dispatch, commit, state }) {
      const { user } = await dispatch('getApi');
      const res = await user.getDeposit();
      const { data: { data } } = res;
      commit({
        type: SAVE_USER,
        payload: {
          ...state.user,
          deposit: data.deposit
        }
      })
    },
    clearCartOrder({ commit }) {
      commit({
        type: SAVE_CART_ORDER,
        payload: {},
      })
    },
    getApi() {
      return this._vm.$api;
    },
  },
});
