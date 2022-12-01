import { createApp } from 'vue'
const api_base = "http://localhost:3000"

createApp({
    data() {
        return {
            cars: [],
            carInModal: {},
            loginModal:{},
            loginName:"",
            loginPass:"",
            loginError:"",
            token:"",
            isAdmin:false,
        }
    },
    
    async created() {
        this.cars = await (await fetch(`${api_base}/`)).json()
        this.token = sessionStorage.getItem("token")===null?"":sessionStorage.getItem("token")
        console.log("Created",this.token);
    },
    methods: {
        getCar: async function (id) {
            this.carInModal = await (await fetch(`${api_base}/cars/${id}`)).json()
            const carInfoModal = new bootstrap.Modal(document.getElementById("carInfoModal"), {})
            carInfoModal.show()
        },
        showLogin: function(event) {
            console.log(event);
            event.preventDefault()
            this.loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {})
            this.loginModal.show()
        },
        doLogIn: async function(){
            console.log("doLogIn");
            const response = await fetch(`${api_base}/login`,
                {
                    method:"post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "email":this.loginName, "password":this.loginPass })
                }
            )
            console.log(response)
            const result = await response.json()
            if(response.ok){                
                if(result.success){
                    this.token = result.data.token
                    sessionStorage.setItem("token", this.token);
                    this.loginModal.hide()
                    
                    this.$router.push(response.loaction)
                    
                }
            } else {
                this.loginError = result.error
            }
        },
        doLogOff: function() {
            // delete user cookies
            this.token = ""
            sessionStorage.removeItem("token")
            this.$router.push("/")

        }
    }
}).mount('#app')