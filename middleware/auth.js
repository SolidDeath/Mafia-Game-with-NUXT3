/*
    Sends a request to checkauthstatus, waits for the response and redirects the user to the login page if the response is 401
*/
//This middleware is used by client side routes to check if the user is logged in

import useFirebaseClient from "~/composables/useFirebaseClient"
export default defineNuxtRouteMiddleware( async (to, from) => {
    const { auth } = useFirebaseClient()
    const { getData } = useFirestore()
    

    // while(true){ //wait for the user to be logged in
    //     if(auth.currentUser) break
    // } 
    // console.log("Auth: ", auth.currentUser.uid);
    // const serverUserDoc = await $fetch('api/firestore/users/' + auth.currentUser.uid)


    // console.log("User doc from firebase using api call: ", serverUserDoc);


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