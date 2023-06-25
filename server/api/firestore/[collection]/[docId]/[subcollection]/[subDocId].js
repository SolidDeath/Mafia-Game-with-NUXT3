import { firestore } from '~/composables/useFirebaseServer.js'

// Handles the event of fetching a specific document from a subcollection in Firestore
export default defineEventHandler(async (event) => {
  const { collection: collectionName, docId, subcollection: subCollectionName, subDocId } = event.context.params;

  // Gets a reference to the specified document in the subcollection
  const subDocRef = firestore.collection(collectionName).doc(docId).collection(subCollectionName).doc(subDocId);

  // Fetches the document data
  const docSnapshot = await subDocRef.get();

  // Checks if the document exists and returns its data
  if (docSnapshot.exists) {
    let data = { ...docSnapshot.data(), id: docSnapshot.id };
    return data;
  } else {
    throw new Error("Document not found");
  }
});
