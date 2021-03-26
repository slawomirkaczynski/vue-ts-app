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
      const newState = state.posts.filter(post => post.id !== id)
      state.posts = newState
    },
    addItem: (state, item) => {
      state.posts.push(item)
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
      axios.delete(`http://localhost:3000/posts/${id}`)
      context.commit('removeItem', id)
    },
    addPost(context, post) {
      axios.post(`http://localhost:3000/posts/`, {
        id: Math.floor(Math.random() * 101),
        content: post
      })
      context.commit('addItem', {
        id: Math.floor(Math.random() * 101),
        content: post
      })
    },
    updatePost(context, data) {
      axios.put(`http://localhost:3000/posts/${data.id}`, { content: data.post })
    }
  },
  modules: {},
});
