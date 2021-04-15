import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";
// prettier-ignore
@Module({ namespaced: true })
class Posts extends VuexModule {
    _posts: Record<string, unknown>[] = []
    _post: Record<string, unknown> = {}
    _intel:Record<string, unknown> = {}

    get posts() {
        return this._posts
    }

    get post() {
        return this._post
    }

    get intel() {
        return this._intel
    }

    @Mutation
    setSinglePost(post: Record<string, unknown>) {
        this._post = post
    }

    @Mutation
    resetSinglePost() {
        this._post = {}
    }

    @Mutation
    loadData(data: Record<string, unknown>[]) {
        this._posts = data
    }
    @Mutation
    removeItem(id: number) {
        const newState = this._posts.filter(post => post.id !== id)
        this._posts = newState
    }
    @Mutation
    addItem(item: Record<string, unknown>) {
        this._posts.push(item)
    }
    @Mutation
    saveStyles(item: Record<string, unknown>) {
        const editedPost = this._posts.find(post => post.id === item.id)
        if (editedPost) {
            editedPost.savedStyle = item.style
        }
    }
    @Mutation
    addMarker(loca: Record<string, unknown>) {
        const editedMap = this._posts.find(post => post.id === loca.id)
        if (editedMap) {
            editedMap.coord = loca.coord
        }
    }
    @Mutation
    loadIntel(data: Record<string, unknown>) {
        this._intel = data
    }
    @Mutation
    loadIntelReset() {
        this._intel = {}
    }
    @Action
    async fetchData() {
        await axios
            .get("http://localhost:3000/posts")
            .then(response => {
                this.context.commit('loadData', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    @Action
    removePost(id: number) {
        axios.delete(`http://localhost:3000/posts/${id}`)
        this.context.commit('removeItem', id)
    }
    @Action
    addPost(post: string) {
        axios.post(`http://localhost:3000/posts/`, {
            id: Math.floor(Math.random() * 101),
            content: post
        })
        this.context.commit('addItem', {
            id: Math.floor(Math.random() * 101),
            content: post
        })
    }
    @Action
    updatePost(data: Record<string, unknown>) {
        const editedMap = this._posts.find(post => post.id === data.id)
        if (editedMap) {
            editedMap.content = data.post
        }
        axios.put(`http://localhost:3000/posts/${data.id}`, editedMap)
    }
    @Action
    setStyles(data: Record<string, unknown>) {
        if (data) {
            this.context.commit('saveStyles', {
                id: Number(data.id),
                style: data.value
            })
        }
    }
    @Action
    addLocation(loca: Record<string, unknown>, _posts) {
        const editedMap = this._posts.find(post => post.id === loca.id)
        if (editedMap) {
            editedMap.coord = loca.coord
        }
        axios.put(`http://localhost:3000/posts/${loca.id}`, editedMap)
        this.context.commit('addMarker', loca)
    }
    @Action
    getPost(id: number) {
        const post = this._posts.find(item => item.id === id)
        this.context.commit('setSinglePost', post)
    }
    @Action
    resetPost() {
        this.context.commit('resetSinglePost')
    }
    @Action
    async getIntel(code: string) {
        await axios
            .get(`https://restcountries.eu/rest/v2/name/${code}`)
            .then(response => {
                this.context.commit('loadIntel', response.data)

            })
            .catch(error => {
                console.log(error)
            })
    }
    @Action
    resetIntel() {
        this.context.commit('loadIntelReset')
    }
    @Action
    async getCurrency(code: string) {
        await axios
            .get(`http://api.nbp.pl/api/exchangerates/rates/a/${code}/`)
            .then(response => {
                console.log(response.data)
                this.context.commit('loadCrrency', response.data)

            })
            .catch(error => {
                console.log(error)
            })
    }
}
export default Posts;
