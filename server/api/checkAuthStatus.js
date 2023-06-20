import useFirebaseServer from "../../server/utils/firebaseServer"
import { getAuth } from "firebase-admin/auth";
// import {setCookie} from 'h3' //have to import in case of an error (in case nuxt doesn't import it)


/*
    Takes a request object containing a user token, authenticates the server and verifies the session cookie of the client
*/
export default defineEventHandler( async (event) => {
    const {app} = useFirebaseServer()
    const { sessionCookie } = await readBody(event) //readBody returns a promise

    try{
        const claim = await getAuth(app).verifySessionCookie(sessionCookie)
        return { statusCode: 200, claim: claim}
    }
    catch(error){
        return {
            statusCode: 401,
            error: 'UNATUHORIZED_REQUEST'
        }
    }

})