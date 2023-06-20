import firebaseServer from "../utils/firebaseServer";
import {getAuth} from 'firebase-admin/auth'


/*
    This is a helper function that takes a request object containing a user token, authenticates the server and saves a session cookie on the client

    The file automatically only accepts post requests because of the file name (login.post.js)
*/
export default defineEventHandler(async (event) => {

    const {app} = firebaseServer() // initialize firebase app on server
    const { token } = await readBody(event)
    const auth = getAuth()
    const expiresIn = 60 * 60 * 24 * 5 * 100 // 5 days

    
    /*
        RESPONSES GO BACK TO composables/useAuth.js
    */
    try{ 
        const options = { //options for the cookie
            maxAge: expiresIn,
            httpOnly: true,
            secure: true, //if in production, secure the cookie //TODO: learn more about this
            sameSite: 'none'
        }
        const authCookie = await getAuth().createSessionCookie(token, { options }) //get a session cookie from firebase admin
    
        setCookie(event, 'authCookie', authCookie, options) // If someone passes an invalid token, it will throw an error, therefore the whole thing has to be inside of a try-catch block
        return { //if cookie is set successfully, return a success message
            statusCode: 200,
            message: 'Auth successful'
        }
    } catch(err) { //if the authCookie cannot be set (could be a malicious attact), return an error message
        throw createError({ 
            statusCode: 401,
            message: 'AUTHORIZATION_FAILED'
        })
    }
})