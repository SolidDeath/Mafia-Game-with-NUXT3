import useFirebaseServer from "~/server/utils/useFirebaseServer";

export default defineEventHandler(async (event) => {
    // Initialize Firestore
    const { firestore } = useFirebaseServer();
  
    // Extract the parameters from the request
    const { collection: collectionName, docId, subcollection, subDocId } = event.context.params;
  
    try {
      // Delete a document
      const docRef = firestore.collection(collectionName).doc(docId).collection(subcollection).doc(subDocId);
      await docRef.delete();
  
      return {
        statusCode: 200,
        message: 'Document successfully deleted!'
      };
    } catch (err) {
      throw createError({
        statusCode: 500,
        message: 'DOCUMENT_DELETE_FAILED',
        error: err.message, // Add the actual error message here
      });
    }
});
