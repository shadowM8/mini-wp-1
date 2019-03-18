
Vue.component('add-article',{
    data(){
        return {
            title: '',
            description: '',
            content: '',
            image: '',
            tags: [],
            temp: '',
            errorMsg: ''
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    methods : {
        fileUpload(e){
            this.image = e.target.files[0]
        },
        pushTag() {
            this.tags.push(this.temp)
            this.temp = ''
        },
        removeTag (name) {
            this.tags = this.tags.filter(el => el !== name )
        },
        submitArticle() {
            let dataArticle = new FormData()
            dataArticle.append('image', this.image)
            dataArticle.append('title', this.title)
            dataArticle.append('description', this.description)
            dataArticle.append('content', this.content)
            dataArticle.append('tags', this.tags)
            axios({
                url: `${serverUrl}/articles/`,
                method: `post`,
                data: dataArticle,
                headers: {
                    token: localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(({ data }) => {
                    this.$emit('new-articles', data)
                    this.$emit('state','login')
                })
                .catch(err => {
                    // console.log(err.response)
                    this.errorMsg = "Please Fill All Empty Field"
                })
        }
    },
    props: ['addArticleForm'],
    template: `
    <div v-if="addArticleForm === true" id="articleForm" class="row vh-100 vw-100">
            <div class="col-sm d-flex flex-column justify-content-center overflow-auto rounded px-auto main-content">
                <form class="container mt-3" @submit.prevent="submitArticle">
                    <div class="form-group">
                        <label for="title">
                            <h3>Title</h3>
                        </label>
                        <!-- <h6 class="text-danger">{{errors.title}}</h6> -->
                        <input v-model="title" type="text" class="form-control" id="title"
                            placeholder="Enter a descriptive and unique title (max. 20 characters)">
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="title">
                            <h3>Description</h3>
                        </label>
                        <!-- <h6 class="text-danger">{{errors.description}}</h6> -->
                        <input v-model="description" type="text" class="form-control" id="description"
                            placeholder="this will appear in article's thumbnail (max. 20 characters)">
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="file">
                            <h3>Thumbnail Image</h3>
                        </label>
                        
                        <input @change="fileUpload" type="file" class="form-control" id="file">
                    </div>
                    <br>
                    <div class="form-group">
                        <label >Tag</label>
                        <div class="row">
                            <input style="width: 350px" type="text" class="form-control ml-3 mr-2" v-model="temp" placeholder="tag">
                            <button @click.prevent="pushTag" style="background-color: #f4f4f4" type="button" class="btn-sm btn-secondary"> <h6 >Add tag</h6></button>
                        </div>
                    </div>
                    <br>
                    <div v-if="tags">
                        <h4> My Tag :</h4>
                        <span @click.prevent="removeTag(i)" class=" m-1 p-2 badge badge-pill badge-primary" v-for="i in tags" > {{ i }}</span>
                    </div>
                    <br>
                    <div class="alert alert-danger" v-if="errorMsg" role="alert">
                               <b> {{errorMsg}} </b>
                    </div>
                    <div class="form-group">
                        <label for="content">
                            <h3>Your Story</h3>
                        </label>
                        <!-- <h6 class="text-danger">{{errors.content}}</h6> -->
                        <wysiwyg v-model="content" />
                    </div>
                    <button class="h5 btn btn-primary mt-2" type="submit">Post</button>
                </form>
                
            </div>
        </div>
    `
})