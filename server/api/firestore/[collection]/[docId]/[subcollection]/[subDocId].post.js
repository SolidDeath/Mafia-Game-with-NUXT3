import useFirebaseServer from "~/composables/useFirebaseServer";
import { doc, setDoc } from "firebase/firestore";

export default defineEventHandler(async (event) => {
    // Initialize Firestore
    const { firestore } = useFirebaseServer();
  
    // Extract the collection, docId, subcollection, and subdocId from the context params
    const { collection: collectionName, docId, subcollection, subdocId } = event.context.params;
  
    // Extract the body from the event
    const data = JSON.parse(event.body);
  
    try {
      // Set a document in a subcollection with a custom ID
      const docRef = doc(firestore, collectionName, docId, subcollection, subdocId);
      await setDoc(docRef, data);
  
      return {
        statusCode: 200,
        message: `Document successfully written!`
      };
    } catch (err) {
      throw createError({
        statusCode: 500,
        message: 'DOCUMENT_WRITE_FAILED'
      });
    }
  });
  