import useFirebaseServer from "~/server/utils/useFirebaseServer";

export default defineEventHandler(async (event) => {
    // Initialize Firestore
    const { firestore } = useFirebaseServer();
  
    // Extract the parameters from the request
    const { collection: collectionName, docId, subcollection, subDocId } = event.context.params;
    const DATA = await readBody(event);
    console.log("DATA",DATA);
  
    try {
      // Add a new document with a custom ID
      const docRef = firestore.collection(collectionName).doc(docId).collection(subcollection).doc(subDocId);
      await docRef.set(DATA);
  
      return {
        statusCode: 200,
        message: 'Document successfully written!'
      };
    } catch (err) {
      throw createError({
        statusCode: 500,
        message: 'DOCUMENT_WRITE_FAILED',
        error: err.message, // Add the actual error message here
      });
    }
});
