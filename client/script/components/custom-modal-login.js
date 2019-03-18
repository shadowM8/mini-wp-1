Vue.component('custom-modal-login', {
    data(){
        return {
            email: '',
            password: '',
            errorMsg: '',
        }
    },
    methods: {
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
                    localStorage.setItem('fullName', data.fullName)
                    this.email = ''
                    this.password = ''
                    this.$emit('state', 'login')
                    this.$emit('user-data', data)
                    $('#exampleModal2').modal('toggle')
                })
                .catch((err) => {
                    this.errorMsg = err.response.data.message
                })
        },
    },
    template: `
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel2">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="loginForm" @submit.prevent="login">
                            <div class="alert alert-danger" v-if="errorMsg" role="alert">
                                {{errorMsg}}
                            </div>
                            <div class="form-group">
                                <label for="email2" class="col-form-label">email</label>
                                <input type="text" class="form-control" id="email2" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="password2" class="col-form-label">password</label>
                                <input type="password" class="form-control" id="password2" v-model="password">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit button" class="btn btn-primary">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
})