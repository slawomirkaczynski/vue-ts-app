import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    loadData: (state, data) => {
      state.posts = data
    },
    removeItem: (state, id) => {
      state.posts.filter(post => post.id !== id)
    },
    addItem: (state, item) => {
      state.posts.push(item)
      console.log(state)
    },
  },
  actions: {
    async fetchData(context) {
      await axios
        .get("http://localhost:3000/posts")
        .then(response => {
          context.commit('loadData', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    removePost(context, id) {
      console.log(id)
      axios.delete(`http://localhost:3000/posts/${id}`)
      context.commit('removeItem', id)
    },
    addPost(context, post) {
      axios.post(`http://localhost:3000/posts/`, { content: post })
      context.commit('addItem', { content: post })
    },
  },
  modules: {},
});
