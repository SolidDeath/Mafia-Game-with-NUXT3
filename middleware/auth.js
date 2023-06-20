/*
    Sends a request to checkauthstatus, waits for the response and redirects the user to the login page if the response is 401
*/

export default defineNuxtRouteMiddleware( async (to, from) => {
    if(process.server){ //make sure this is only run on the server
        const cookie = useCookie('authCookie')
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