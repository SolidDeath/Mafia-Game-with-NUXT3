import { firestore } from '~/composables/useFirebaseServer.js'

// Handles the event of fetching a whole collection from Firestore
export default defineEventHandler(async (event) => {
  const { collection: collectionName } = event.context.params;

  // Gets a reference to the specified collection in Firestore
  const colRef = firestore.collection(collectionName);

  // Fetches all documents in the collection
  const docsSnapshot = await colRef.get();

  // Transforms the documents data into a more usable format
  const data = docsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

  return data;
});
