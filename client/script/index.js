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
        title : '',
        description : '',
        content: ''
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
                    this.isLogin = true
                    this.nav = true
                    this.header = true
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
            this.isLogin = false
        },
        writeArticle() {
            this.addArticleForm = true
            this.nav = false
            // this.header = false
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.isLogin = true
            this.nav = true
            this.header = true
        }
    },
    components : {
        wysiwyg: vueWysiwyg.default.component,
    }
})