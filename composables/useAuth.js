import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { doc , serverTimestamp, setDoc } from "firebase/firestore";

export default function useAuth(){
    const { firestore } = useFirebaseClient()


    const user = useState('userStore', () => ({}))
    const errorBag = ref({
        email: null,
        password: null,
        name: null
    })
    useFirebaseClient()
    const auth = getAuth()

    function signIn({email,password}){
        resetErrors()
        const validatedData = useAuthValidator({email, password}, 'login')
        setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithEmailAndPassword(auth, email, password).then(userDetails => {
                user.value = userDetails.user
                userDetails.user.getIdToken().then(token => {
                    serverAuth(token)
                })
            })
        })
    }

    function logOut(){ //have to send a request to server to log the user out (invalidate) and then delete the session cookie
        const token = user.uid
        signOut(auth).then(() => {
            $fetch("api/logout",  { //passes the token to the server though an api route for more information see server/api/login.post.js
                method: "POST", 
                body: JSON.stringify({ token })
            }).then(res => {
                if(res.statusCode == 200){
                    navigateTo('/')
                }
            }).catch(err => {
                alert("LogoutError: ", err.message)
            })
        })


    }
    //TODO: 23:00 fix variables
    function signUp({email, password , name}){
        resetErrors()
        const validatedData = useAuthValidator({email, password, name}, 'signup')
        console.log("Validated data: ", validatedData);
        setPersistence(auth, browserLocalPersistence).then(() => {
            createUserWithEmailAndPassword(auth, email, password).then(userDetails => {
                user.value = userDetails.user
                userDetails.user.getIdToken().then(async token => {
                    // Create a user document in the database
                    console.log("User: ", user.value.uid);
                    try{
                        await setDoc(doc(firestore, "users", user.value.uid), {
                            uid: user.value.uid,
                            name: name,
                            email: email,
                            accessLevel: 1,
                            createdAt: serverTimestamp()
                        })
                    }
                    catch(err){
                        throw createError({
                            statusCode: 500,
                            message: 'Failed to create user document: ' + err
                        })
                    }


                    try{
                        serverAuth(token) //Creates a session cookie on the server and sends it back to the client
                    }
                    catch(err){
                        throw createError({
                            statusCode: 500,
                            message: 'Failed to create session cookie: ' + err
                        })
                    }

                })
            })
        })
    }



    function resetErrors(){
        errorBag.value = {
            email: null,
            password: null,
            name: null,
        }
    }

    function serverAuth(token){ //takes in a token from the client and sends it to the server to be validated
        $fetch("api/login",  { //passes the token to the server though an api route for more information see server/api/login.post.js
            method: "POST", 
            body: JSON.stringify({ token })
        }).then(res => {
            if(res.statusCode == 200){
                navigateTo('/dashboard')
            }
        }).catch(err => {
            alert("Invalid creds", err.message)
        })
    }



    onAuthStateChanged(auth, (userDetails) => {
        if(userDetails){
            user.value = userDetails
        }
    })



    return { user, signIn, logOut, signUp, errorBag }
}


