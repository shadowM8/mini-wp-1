let serverUrl = 'http://localhost:3000'

let app = new Vue({
    el: '#app',
    data: {
        articles: [],
        isLogin: false,
        email: '',
        password: '',
        fullName: '',
        errorMsg: '',
        addArticleForm: false,
        header: false,
        nav: false,
        title: '',
        description: '',
        content: '',
        userId: '',
        articleId: '',
        readOneArticle: false,
        oneArticle: null,
        editArticleForm: false,
        oneEditedArticle: false
    },
    methods: {
        register: function () {
            axios
                .post(`http://localhost:3000/users/register`, {
                    email: this.email,
                    password: this.password,
                    fullName: this.fullName
                })
                .then(({ data }) => {
                    console.log(data)
                    this.email = ''
                    this.password = ''
                    this.fullName = ''
                    // this.$emit('success-register','success')
                    $('#exampleModal').modal('toggle')
                    swal("User berhasil dibuat, silahkan login", {
                        button: false,
                        timer: 1500,
                        icon: 'success'
                    })
                    // this.$emit('change-page', 'login')
                })
                .catch(({ message }) => {
                    // console.log(message)
                    this.errorMsg = message
                    swal(`${this.errorMsg}`, {
                        button: false,
                        timer: 2000,
                        icon: 'error'
                    })
                })
        },
        login() {
            axios({
                url: `${serverUrl}/users/login`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(({ data }) => {
                    swal("Login berhasil, selamat datang", {
                        button: false,
                        timer: 1500,
                        icon: 'success'
                    })
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('userId', data.id)
                    this.email = '',
                        this.password = ''
                    this.getAllArticle()
                    this.isLogin = true
                    this.nav = true
                    this.header = true
                    this.userId = data.id
                    $('#exampleModal2').modal('toggle')
                    // localStorage.setItem('id', data.id)
                    // this.$emit('login', 'login')
                    // this.$emit('login-status', true)
                })
                .catch(({ message }) => {
                    this.errorMsg = message
                })
        },
        logout() {
            // let auth2 = gapi.auth2.getAuthInstance();
            // auth2.signOut().then(function () {
            //     console.log('User signed out.');
            // });
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            this.isLogin = false
            this.nav = false
            this.header = false
        },
        writeArticle() {
            this.addArticleForm = true
            this.nav = false
            // this.header = false
        },
        submitArticle() {
            axios({
                url: `${serverUrl}/articles/`,
                method: `post`,
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
                    this.addArticleForm = false
                    this.nav = true
                    this.getAllArticle()
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    this.errorMessage = err.response.data.message
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
                    console.log(data)
                    this.readOneArticle = true
                    this.nav = false
                    this.header = false
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
            this.nav = false
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
                    this.title= data.title
                    this.description= data.description
                    this.content= data.content
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
                    this.getAllArticle()
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    this.errorMessage = err.response.data.message
                })
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            console.log('MASUK CEK TOKEN, DAN TOKEN ADA');
            this.isLogin = true
            this.nav = true
            this.header = true
            this.userId = localStorage.getItem('userId')
            this.getAllArticle()
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    }
})