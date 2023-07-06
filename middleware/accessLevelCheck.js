import useFirebaseClient from "~/composables/useFirebaseClient"
import { doc, getDoc } from "firebase/firestore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if(!process.server){
        const { auth, authReady, firestore } = useFirebaseClient();

        console.log("Access level check middleware running");

        // Wait for auth to be ready
        await authReady;
        

        // Handle unauthorized access
        const handleUnauthorizedAccess = (message) => {
            console.log(message);
            return navigateTo('/');
        }

        // Check if user is authenticated
        if (!auth) {
            return handleUnauthorizedAccess("User is not authenticated");
        }

        // Fetch user document from Firestore
        const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        // Check if user document exists
        if (!userDocSnap.exists()) {
            return handleUnauthorizedAccess("Unable to retrieve user document from Firebase");
        }

        try {
            // Check user's access level against required access level
            const userAccessLevel = userDocSnap.data().accessLevel;
            const requiredAccessLevel = to.meta.meta.requiredAccess;

            if (requiredAccessLevel <= userAccessLevel) {
                console.log(`User ${auth.currentUser.uid} has sufficient access level (${userAccessLevel}). Navigating to ${to.path}`);
                navigateTo(to.path);
            } else {
                return handleUnauthorizedAccess(`User ${auth.currentUser.uid} does not have sufficient access level. Required: ${requiredAccessLevel}, User's: ${userAccessLevel}`);
            }
        } catch (error) {
            console.error("Error checking user access level:", error);
            return handleUnauthorizedAccess("Error checking user access level");
        }
    }
});
