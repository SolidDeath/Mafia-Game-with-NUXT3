/*
    This is a helper function that takes a request object containing a user token, authenticates the server and saves a session cookie on the client

*/
export default defineEventHandler(async (event) => {    
    /*
        RESPONSES GO BACK TO composables/useAuth.js
    */
    try{ 
        console.log('Deleted the cookie');
        deleteCookie(event, 'authCookie')
        return { //if cookie is set successfully, return a success message
            statusCode: 200,
            message: 'Logout successful'
        }
    } catch(err) { //if the authCookie cannot be set (could be a malicious attact), return an error message
        throw createError({ 
            statusCode: 401,
            message: 'Logout failed'
        })
    }
})