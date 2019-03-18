let serverUrl = 'http://localhost:3000'

let app = new Vue({
    el: '#app',
    data: {
        articles: [],
        isLogin: false,
        fullName: '',
        errorMsg: '',
        addArticleForm: false,
        header: false,
        nav: false,
        title: '',
        description: '',
        content: '',
        image:'',
        userId: '',
        articleId: '',
        readOneArticle: false,
        oneArticle: null,
        editArticleForm: false,
        oneEditedArticle: false,
        tags: [],
        temp: '',
        searchword: ''
    },
    
    methods: {
        deDate (date) {
            return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        },
        setUserData(emittedData){
            console.log(emittedData)
            this.userId = emittedData.id
            this.fullName = emittedData.fullName
        },
        webstate(state) {
            if(state === 'login') {
                this.isLogin = true
                this.nav = true
                this.header = true
                this.addArticleForm = false
                this.readOneArticle = false
                this.editArticleForm = false
                this.oneEditedArticle = false
                this.getAllArticle()
            } else if (state === 'logout') {
                this.isLogin = false
                this.nav = false
                this.header = false
            } else if (state === 'write-article') {
                this.isLogin = true
                this.nav = false
                this.header = true
                this.addArticleForm = true
                this.readOneArticle = false
                this.editArticleForm = false
                this.oneEditedArticle = false
            }
        },
        pushNewArticles(data) {
            this.articles.push(data)
        },
        logout() {
            // let auth2 = gapi.auth2.getAuthInstance();
            // auth2.signOut().then(function () {
            //     console.log('User signed out.');
            // });
            
            localStorage.clear()
            this.webstate('logout')
        },
        getAllArticleSearch(keyword){
            axios({
                url: `${serverUrl}/articles?title=${keyword}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    this.articles = data
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    this.errorMessage = err.response.data.message
                })
        },
        getArticleFromTag(keyword) {
            this.articles = this.articles.filter(art => {
                return art.tags.join(' ').toLowerCase().match(keyword)
            })
        },
        getAllArticle() {
            axios({
                url: `${serverUrl}/articles`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    this.articles = data
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    this.errorMessage = err.response.data.message
                })
        },
        readThisArticle(id) {
            axios({
                url: `${serverUrl}/articles/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    this.readOneArticle = true
                    this.nav = false
                    this.header = true
                    this.oneArticle = data
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    this.errorMessage = err.response.data.message
                })
        },
        backToHome() {
            this.readOneArticle = false
            this.nav = true
            this.header = true
        },
        deleteArticle(id) {
            swal({
                title: "Warning",
                text: "Are you sure you want to delete your article?",
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
                .then(willDelete => {
                    if (willDelete) {
                        swal("Poof! your article is gone!", {
                            icon: "success"
                        });
                        axios({
                            url: `${serverUrl}/articles/${id}`,
                            method: `delete`,
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        })
                            .then(({ data }) => {
                                let index = this.articles.indexOf(data._id)
                                this.articles.splice(1, index)
                                this.getAllArticle()
                            })
                            .catch(err => {
                                console.log(err.response.data.message)
                                this.errorMessage = err.response.data.message
                            })
                    } else {
                        swal("Phew, that was close one");
                    }
                })
                .catch(err => {
                    console.log(err);
                });

        },
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
                    this.articleId = data._id
                    this.title = data.title
                    this.description = data.description
                    this.content = data.content,
                    this.tags = data.tags
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    this.errorMessage = err.response.data.message
                })
        },
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
                    this.readThisArticle(data._id)
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    this.errorMessage = err.response.data.message
                })
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            
            this.webstate('login')
            this.userId = localStorage.getItem('userId')
            this.fullName = localStorage.getItem('fullName')
            this.getAllArticle()
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    mounted() {
        gapi.load('auth2', function(){
            auth2 = gapi.auth2.init({
              client_id: '671055566664-1ivqkltn9i3krrjjbj4vutdajefh7um1.apps.googleusercontent.com',
              cookiepolicy: 'single_host_origin',
            });
        });
    },
})