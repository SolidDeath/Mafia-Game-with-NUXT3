import useFirebaseServer from "~/server/utils/useFirebaseServer";

export default defineEventHandler(async (event) => {
    // Initialize Firestore
    const { firestore } = useFirebaseServer();
  
    // Extract the collection, docId, and subcollection from the context params
    const { collection: collectionName, docId, subcollection } = event.context.params;
  
    // Extract the body from the event
    const DATA = await readBody(event);
  
    try {
      // Add a new document with an auto-generated ID to a subcollection
      const docref = firestore.collection(collectionName).doc(docId).collection(subcollection);

      let res = await docref.add(DATA);


      return {
        statusCode: 200,
        message: `Document successfully written with ID: ${res.id}`
      };
    } catch (err) {
      throw createError({
        statusCode: 500,
        message: 'DOCUMENT_WRITE_FAILED',
        error: err.message, // Add the actual error message here
      });
    }
});
