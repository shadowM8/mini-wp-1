Vue.component('auth', {
    data() {
        return {

        }
    },
    methods: {
        onSignIn (googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            axios({
                method: 'post',
                url: `${url}/users/authgoogle`,
                data: {
                    token: id_token
                }
            })
            .then(({data}) => {
                swal("Login berhasil, selamat datang", {
                    button: false,
                    timer: 1500,
                    icon: 'success'
                })
                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data.id)
                localStorage.setItem('fullName', data.fullName)
                this.$emit('state', 'login')
                this.$emit('user-data', data)
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
    mounted () {
        gapi.signin2.render('google-sign-in', {
            scope: 'email profile',
            width: 200,
            height: 50,
            longtitle: true,
            onsuccess: this.onSignIn,
        })
    },
    props : ['isLogin'],
    template : `
    <div id="auth" v-if="isLogin === false"
            class="container-fluid bg-primary d-flex justify-content-center align-items-center"
            style="min-height:100vh">
            <div class="d-flex flex-column" style="width:40%">
                <div class="d-flex flex-column  ">
                    <img src="/assets/img/picture/undraw_live_collaboration_2r4y.svg" alt="" style="width:40%;"
                        class="d-flex flex-column align-self-center  " />
                    <h1 style="color:white;" class="d-flex align-self-center"><i class="fas fa-feather-alt"></i>
                        Simple Word-Press</h1>
                    <h6 style="color:white;" class="d-flex align-self-center">Simple-WordPress web-app built with
                        mongoose, vue & express</h6>
                    <button type="button" class="btn btn-warning mt-2" data-toggle="modal"
                        data-target="#exampleModal" style="width: 100%;">Create an
                        account</button>
                    <button type="button" class="btn btn-info mt-2" data-toggle="modal"
                        data-target="#exampleModal2">Sign
                        In</button>
                    <h6 style="color:white;" class="d-flex align-self-center mt-3 mb-3">or</h6> 
                    <div class="g-signin2" id="google-sign-in"></div> 
                </div>
            </div>
        </div>
    `
})