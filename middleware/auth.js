export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) {
      const cookie = useCookie('authCookie')
  
      if (!cookie.value) {
        console.error('No auth cookie found')
        return navigateTo('/')
      }
  
      const response = await fetch('http://localhost:3000/api/checkauthstatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionCookie: cookie.value })
      })
      if (!response.ok) {
        console.log("User is not logged in");
        return navigateTo('/')
      }
  
      const data = await response.json()
  
      // If the session cookie is valid, let them proceed
      if (data.statusCode === 200) {
        console.log("User is authenticated");
        return;
      } else {
        console.log("User is not logged in. Status code: ", data.statusCode);
        // If the session cookie is not valid, redirect them to the login page
        console.log("User is not logged in");
        return navigateTo('/')
      }
    }
})
  