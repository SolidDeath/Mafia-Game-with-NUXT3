import useFirebaseServer from "~/server/utils/useFirebaseServer";

export default defineEventHandler(async (event) => {
    // Initialize Firestore
    const { firestore } = useFirebaseServer();

    // Extract the parameters from the request
    const { collection, docId } = event.context.params;
    const DATA = await readBody(event);
    console.log("DATA",DATA);

    try {
      // Get reference to the document
      const docRef = firestore.collection(collection).doc(docId);

      // Update the document
      await docRef.update(DATA);

      return {
        statusCode: 200,
        message: 'Document successfully updated!'
      };
    } catch (err) {
      throw createError({
        statusCode: 500,
        message: 'DOCUMENT_UPDATE_FAILED',
        error: err.message, // Add the actual error message here
      });
    }
});
