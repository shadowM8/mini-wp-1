Vue.component('edit-one-article', {
    props: ['editArticleForm','articleForEdit'],
    data() {
        return {
            title: articleForEdit.title,
            description: articleForEdit.description,
            content: articleForEdit.content
        }
    },
    methods: {
        submitEditArticle(id) {
            axios({
                url: `${serverUrl}/articles/${id}`,
                method: `put`,
                data: {
                    title: this.title,
                    description: this.description,
                    content: this.content
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    this.articles.push(data)
                    this.editArticleForm = false
                    this.nav = true
                    this.getAllArticle()
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    this.errorMessage = err.response.data.message
                })
        }
    },
    template: `
    <div v-if="editArticleForm === true"  class="row vh-100 vw-100">
            <div class="col-sm d-flex flex-column justify-content-center overflow-auto rounded px-auto main-content">
                <form class="container mt-3" @submit.prevent="submitEditArticle(articleId)">
                    <div class="form-group">
                        <label for="title">
                            <h3>Title</h3>
                        </label>
                        <input v-model="title" type="text" class="form-control" id="title"
                            placeholder="Enter a descriptive and unique title (max. 20 characters)">
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="title">
                            <h3>Description</h3>
                        </label>
                        <input v-model="description" type="text" class="form-control" id="description"
                            placeholder="this will appear in article's thumbnail (max. 20 characters)">
                    </div>
                    <br>
                    
                    <div class="form-group">
                        <label for="content">
                            <h3>Your Story</h3>
                        </label>   
                        <wysiwyg v-model="content" />
                    </div>
                    <button class="h5 btn btn-primary mt-2" type="submit">Post</button>
                    <button class="h5 btn btn-danger mt-2" @click="webstate('login')">Cancel Edit - Back to Article</button>
                </form>
            </div>
    </div>
    `
})