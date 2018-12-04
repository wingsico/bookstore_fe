import Vue from 'vue';
import Vuex from 'vuex';
import { SAVE_USER, SAVE_ORDER_LIST,SAVE_BOOK_LIST, ADD_BOOK_LIST } from './types';
import { Toast } from 'vant';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    orderList: [],
    // guessLikeBooks: [],
    bookList: {
      pageSize: 10,
      page: 1,
      totalPage: 10,
      books: [],
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    orderList(state) {
      return state.orderList;
    },
    bookList(state) {
      return state.bookList;
    }
  },
  mutations: {
    [SAVE_USER](state, {payload}) {
      state.user = payload;
    },
    [SAVE_ORDER_LIST](state, { payload }) {
      state.orderList = payload;
    },
    [SAVE_BOOK_LIST](state, { payload }) {
      state.bookList = payload;
    },
    [ADD_BOOK_LIST](state, { payload }) {
      state.bookList.page = payload.page;
      state.bookList.pageSize = payload.pageSize;
      state.bookList.books.push(payload.books);
    }
  },
  actions: {
    async login({ dispatch, commit }, userInfo) {
      const { user } = await dispatch('getApi');
      const res = await user.login(userInfo);
      const { data: { data } } = res;
      commit({
        type: SAVE_USER,
        payload: data,
      });
    },
    async logout({ commit }, router) {
      commit({ type: SAVE_USER, payload: {} })
      commit({ type: SAVE_ORDER_LIST, payload: [] })
      Toast('注销成功');
      router.push('/login')
    },
    async updateUserPwd({ commit, dispatch }, password) {
      const { user } = await dispatch('getApi');
      const res = await user.updateUserPwd(password);
      const { data: { message } } = res;
      Toast(message);
    },
    async updatePayPwd({ commit, dispatch }, password) {
      const { user } = await dispatch('getApi');
      const res = await user.updatePayPwd(password);
      const { data: { message } } = res;
      Toast(message);
    },
    async updateNickname({ commit, dispatch }, password) {
      const { user } = await dispatch('getApi');
      const res = await user.updateNickPwd(password);
      const { data: { message } } = res;
      Toast(message);
    },
    async getOrderList({ dispatch, commit }, user_id) {
      const { order } = await dispatch('getApi');
      const res = await order.list(user_id);
      const { data: { data } } = res;
      Toast('获取成功');
      commit({
        type: SAVE_ORDER_LIST,
        payload: data,
      })
    },
    async getBookList({ dispatch, commit }, config = {}) {
      const { user } = await dispatch('getApi');
      const res = await user.getBookList(config);
      const { data: { data } } = res;
      if (config.add) {
        commit({
          type: ADD_BOOK_LIST,
          payload: data,
        })
      } else {
        commit({
          type: SAVE_BOOK_LIST,
          payload: data,
        })
      }
    },
    getApi() {
      return this._vm.$api;
    },
  },
});
