import useFirebaseServer from "~/composables/useFirebaseServer";
import { collection, addDoc } from "firebase/firestore";

export default defineEventHandler(async (event) => {
    // Initialize Firestore
    const { firestore } = useFirebaseServer();
  
    // Extract the collection from the context params
    const { collection: collectionName } = event.context.params;
  
    // Extract the body from the event
    const DATA = JSON.parse(event.body);
  
    try {
      // Add a new document with an auto-generated ID
      const collectionRef = collection(firestore, collectionName);
      const docRef = await addDoc(collectionRef, DATA);
  
      return {
        statusCode: 200,
        message: `Document successfully written with ID: ${docRef.id}`
      };
    } catch (err) {
      throw createError({
        statusCode: 500,
        message: 'DOCUMENT_WRITE_FAILED'
      });
    }
  });
  

  