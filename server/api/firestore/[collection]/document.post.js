import useFirebaseServer from "~/server/utils/useFirebaseServer";

export default defineEventHandler(async (event) => {
    // Initialize Firestore
    const { firestore } = useFirebaseServer();
  
    // Extract the collection from the context params
    const { collection: collectionName } = event.context.params;
  
    // Extract the body from the event
    const DATA = await readBody(event);

    try {
      // Add a new document with an auto-generated ID
      const colRef = firestore.collection(collectionName)
      let res = await colRef.add({
        ...DATA
        //TODO - add timestamp to all collections,  timestamp: FieldValue.serverTimestamp() did not work
      })
  
      return {
        statusCode: 200,
        message: `Document successfully written with ID: ${res.id}`
      };
    } catch (err) {
      console.error(err);
      throw createError({
        statusCode: 500,
        message: 'DOCUMENT_WRITE_FAILED',
        error: err.message, // Add the actual error message here
      });
    }
});
