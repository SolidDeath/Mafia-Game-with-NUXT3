import useFirebaseServer from "~/composables/useFirebaseServer";
import { addDoc, collection } from "firebase/firestore";

export default defineEventHandler(async (event) => {
    // Initialize Firestore
    const { firestore } = useFirebaseServer();
  
    // Extract the collection, docId, and subcollection from the context params
    const { collection: collectionName, docId, subcollection } = event.context.params;
  
    // Extract the body from the event
    const DATA = JSON.parse(event.body);
  
    try {
      // Add a new document with an auto-generated ID to a subcollection
      const collectionRef = collection(firestore, collectionName, docId, subcollection);
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
  