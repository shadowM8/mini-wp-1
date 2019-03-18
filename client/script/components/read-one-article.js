Vue.component('read-one-article', {
    props: ['readOneArticle', 'oneArticle', 'userId'],
    data() {
        return {
            articleForEdit : {},
            editArticleForm : false
        }
    },
    methods: {
        startEditArticle(id) {    
            this.readOneArticle = false
            axios({
                url: `${serverUrl}/articles/${id}`,
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    this.editArticleForm = true
                    // this.articleId = data._id
                    // this.title = data.title
                    // this.description = data.description
                    // this.content = data.content,
                    // this.tags = data.tags
                    this.articleForEdit = {
                        articleId : data._id,
                        title : data.title,
                        description : data.description,
                        content : data.content
                    }
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    this.errorMessage = err.response.data.message
                })
        }
    },
    template: `
    <div v-if="readOneArticle === true" class="row vh-100 vw-100 container-fluid" >
        <edit-one-article :edit-article-form="editArticleForm" :article-for-edit="articleForEdit" ></edit-one-article>
            <div class="card border rounded mb-3" style="min-width:100%" >
                        <div class="card-header">
                            <div class="d-flex flex-row-reverse">
                                    <div class="mx-2">
                                            <img :src='oneArticle.author.profilePhoto' style="width:100px"
                                                class="img-fluid border border-primary rounded-circle" alt="article-picz">
                                    </div>
                                    <div class="d-flex flex-column">
                                        <div class="d-flex align-items-center">
                                            Author : {{oneArticle.author.fullName}}
                                        </div>
                                        <div class="card-text">
                                            Posted :
                                            {{deDate(oneArticle.createdAt)}}
                                        </div>
                                    </div>
                            </div>
                                <button type="button" class=" btn btn-outline-danger btn-sm align-self-end"
                                    v-if='oneArticle.author._id.toString() == userId' @click='startEditArticle(oneArticle._id)'>Edit this Article</button>
                                <button type="button" class=" btn btn-outline-warning btn-sm align-self-end"
                                    @click="webstate('login')">Back</button>
                        </div>
                <div class="card-body text-primary">
                        <h3 class="card-title text-center"><b>{{oneArticle.title}}</b></h3>
                        <div class="d-flex flex-column">
                                <div id="article-picture" class="my-1 text-center">
                                    <img :src='oneArticle.featured_image' style="width:50%"
                                        class="img-fluid border rounded border-primary" alt="article-picz">
                                </div>
                                <div id="article-content" class="">
                                    <p class="card-text text-justify" v-html='oneArticle.content'></p>
                                </div>
                                <hr style="margin-top: 0">
                                <div class="row mx-auto">
                                    <button v-if="tag" v-for="tag in oneArticle.tags" type="button" class="btn-sm text-white article-caps m-2" style="background-color: lightgrey; font-size: 15px">{{ tag }}</button>
                                </div>
                        </div>
                </div>  
            </div>
        </div>
    `
})