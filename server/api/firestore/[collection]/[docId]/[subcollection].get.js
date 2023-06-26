import useFirebaseServer from "~/server/utils/useFirebaseServer";


// Handles the event of fetching a subcollection of a document from a Firestore collection
export default defineEventHandler(async (event) => {
    const { firestore } = useFirebaseServer();
    const { collection: collectionName, docId, subcollection: subCollectionName } = event.context.params;

    // Gets a reference to the parent document and the subcollection in Firestore
    const subColRef = firestore.collection(collectionName).doc(docId).collection(subCollectionName);

    // Fetches all documents in the subcollection
    const docsSnapshot = await subColRef.get();

    // Transforms the documents data into a more usable format
    const data = docsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    return data;
});
