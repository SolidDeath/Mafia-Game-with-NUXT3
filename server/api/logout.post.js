import useFirebaseServer from "~/server/utils/useFirebaseServer";
import cookie from 'cookie'

export default defineEventHandler(async (event) => {
    const { auth } = useFirebaseServer();
    // console.log(event);
    const cookies = cookie.parse(event.node.req.headers.cookie || ''); // Parse the Cookie header from the nested object
    const sessionCookie = cookies.authCookie;
    console.log("Session cookie: ", sessionCookie);
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        await auth.revokeRefreshTokens(decodedClaims.sub); // Revoke all sessions for the user
        deleteCookie(event, 'authCookie');
        return {
            statusCode: 200,
            message: 'Logout successful'
        };
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: error.message
        });
    }
});
