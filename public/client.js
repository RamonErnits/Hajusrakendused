import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
const api_base = "http://localhost:3000"


createApp({
    data() {
        return {
            cars: [],
            carInModal: {},
            loginModal:{},
            role: "",
            loginName:"",
            loginPass:"",
            loginError:"",
            token:"",
            isAdmin:false,
        }
    },
    
    async created() {
        this.cars = await (await fetch('http://localhost:3000/cars')).json();
        this.token = sessionStorage.getItem("token")===null?"":sessionStorage.getItem("token")
        console.log("Created",this.token);
    },
    methods: {
        getcar: async function (id) {
            this.carInModal = await (await fetch(`http://localhost:3000/cars/${id}`)).json()
            console.log(this.carInModal);
            const carInfoModal = new bootstrap.Modal(document.getElementById('carInfoModal'), {})
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
                    body: JSON.stringify({"email":this.loginName, "password":this.loginPass })
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
            this.loginName=""
            this.loginPass=""
            this.loginError=""
            this.token =""
            sessionStorage.removeItem("token")
        }
    }
}).mount('#app')