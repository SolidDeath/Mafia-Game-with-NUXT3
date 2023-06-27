import useFirebaseServer from "~/server/utils/useFirebaseServer";

export default defineEventHandler(async (event) => {
    // Initialize Firestore
    const { firestore } = useFirebaseServer();

    // Extract the parameters from the request
    const { collection: collectionName, docId, subcollection, subDocId } = event.context.params;
    const DATA = await readBody(event);
    console.log("DATA",DATA);

    try {
      // Get reference to the document in the subcollection
      const docRef = firestore.collection(collectionName).doc(docId).collection(subcollection).doc(subDocId);

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
