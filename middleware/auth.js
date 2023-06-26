/*
    Sends a request to checkauthstatus, waits for the response and redirects the user to the login page if the response is 401
*/
//This middleware is used by client side routes to check if the user is logged in
import { useStore } from '~/stores/myStore'

import useFirebaseClient from "~/composables/useFirebaseClient"
export default defineNuxtRouteMiddleware( async (to, from) => {
    const { auth } = useFirebaseClient()
    const { getData } = useFirestore()
    
    const { userData } = await useAsyncData('user', () => store.fetchUser())
    const userStore = useState('userStore')
    console.log("User store: ", userStore.value);
    while(true){ //wait for the user to be logged in
        if(auth.currentUser && userStore.value) break
    } 
    console.log("User store: ", userStore.value);
    console.log("Auth: ", auth.currentUser.uid);

    while(true){ //wait for the user data to be fetched
        if(userData) break
    }
    console.log("User data: ", userData);


    if(process.server){ //make sure this is only run on the server
        const cookie = useCookie('authCookie') //cookie is made in login.post.js
        // cookie.value = 'asdf'
        const response = await fetch('http://localhost:3000/api/checkauthstatus', {
            method: 'POST',
            body: JSON.stringify({sessionCookie: cookie.value})
        })

        const data = await response.json()

        if(data.statusCode !== 200){
            return navigateTo('/')
        }
    }
})