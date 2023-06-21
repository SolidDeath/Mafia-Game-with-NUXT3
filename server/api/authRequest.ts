// This funciton is used at the beginning of every post or request function



function authRequest (userAuthLevel: Number, funcionAuthLevel: Number){
    if(userAuthLevel < funcionAuthLevel){
        throw createError({
            statusCode: 401,
            message: 'UNAUTHORIZED_REQUEST'
        })
    }
}


