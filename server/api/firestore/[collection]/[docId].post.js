import useFirebaseServer from "~/composables/useFirebaseServer";
import { doc, setDoc } from "firebase/firestore";

export default defineEventHandler(async (event) => {
    // Initialize Firestore
    const { firestore } = useFirebaseServer();
  
    // Extract the parameters from the request
    const { collection, docId } = event.context.params;
    const data = await readBody(event);
  
    try {
      // Add a new document with a custom ID
      const docRef = doc(firestore, collection, docId);
      await setDoc(docRef, data);
  
      return {
        statusCode: 200,
        message: 'Document successfully written!'
      };
    } catch (err) {
      throw createError({
        statusCode: 500,
        message: 'DOCUMENT_WRITE_FAILED'
      });
    }
  });