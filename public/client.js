import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const api_base = "http://localhost:3000"


createApp({
    data() {
        return {
            cars: [],
            carInModal: {},
            users: [],
            loginModal:{},
            role: "",
            loginName:"",
            loginPass:"",
            loginError:"",
            token:"",
            isAdmin: ""
        }
    },
    
    async created() {
        this.car = await (await fetch(`${api_base}/cars`)).json()
        this.token = sessionStorage.getItem("token")===null?"":sessionStorage.getItem("token")
        console.log("Created",this.token);

        let data = await (await fetch('http://localhost:3000/users')).json();
        this.users = data.data
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
        getUser: async function() {
            this.users = await (await fetch(`http://localhost:3000/users`)).json()
            console.log(this.users);
          }, deleteItem: async function (car) {
            let requestOptions = {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
  
            const response = await fetch("/delete/:id", requestOptions); // <----- HERE! 
            if (response.status != 204) {
              throw Error("Cannot delete your item from list");
            }
            return car;
          },
          confirmDeleteCar: async function (carId) {
            var shouldDelete = confirm('Are you sure you want to delete this car?')
            if (shouldDelete) {
              console.log('deleting car with id: ' + carId)
              await(await fetch(`http://localhost:3000/cars/${carId}`, {
                method: 'delete'
              }))
            }
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
        doLogOff: async function() {

            await fetch(`${api_base}/logout`)
            window.location.href = "/login"
        }
    
    }}).mount('#app')


    // $(".nav").click(function(){
	//     $("#mySidenav").css('width','70px');
	//     $("#main").css('margin-left','70px');
	//     $(".logo").css('visibility', 'hidden');
	//     $(".logo span").css('visibility', 'visible');
	//      $(".logo span").css('margin-left', '-10px');
	//      $(".icon-a").css('visibility', 'hidden');
	//      $(".icons").css('visibility', 'visible');
	//      $(".icons").css('margin-left', '-8px');
	//       $(".nav").css('display','none');
	//       $(".nav2").css('display','block');
	//   });

	// $(".nav2").click(function(){
	//     $("#mySidenav").css('width','300px');
	//     $("#main").css('margin-left','300px');
	//     $(".logo").css('visibility', 'visible');
	//      $(".icon-a").css('visibility', 'visible');
	//      $(".icons").css('visibility', 'visible');
	//      $(".nav").css('display','block');
	//       $(".nav2").css('display','none');
	//  });
