Vue.component('custom-modal-register', {
    data(){
        return {
            email: '',
            password: '',
            errorMsg: '',
            fullName: '',
        }
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
                .catch((err) => {
                    // console.log(message)
                    this.errorMsg = err.response.data.message
                    swal(`${this.errorMsg}`, {
                        button: false,
                        timer: 2000,
                        icon: 'error'
                    })
                })
        },
    },
    template: `
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="registrationForm" @submit.prevent="register">
                            <h6 id="registrationError"></h6>
                            <div class="form-group">
                                <label for="email1" class="col-form-label">email</label>
                                <input type="text" class="form-control" id="email1" v-model="email"
                                    placeholder="e.g. johnDoe1@gmail.com">
                            </div>
                            <div class="form-group">
                                <label for="password1" class="col-form-label">password</label>
                                <input type="password" class="form-control" id="password1" v-model="password"
                                    placeholder="enter your password here">
                            </div>
                            <div class="form-group">
                                <label for="fullname" class="col-form-label">full name</label>
                                <input type="text" class="form-control" id="fullName" v-model="fullName"
                                    placeholder="enter your fullname here">
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit button" class="btn btn-primary">Create Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
})