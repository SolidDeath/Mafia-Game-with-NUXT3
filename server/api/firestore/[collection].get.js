import useFirebaseServer from "~/server/utils/useFirebaseServer";

// Handles the event of fetching a whole collection from Firestore
export default defineEventHandler(async (event) => {
    const { firestore } = useFirebaseServer();
    const { collection: collectionName } = event.context.params;

    // Gets a reference to the specified collection in Firestore
    const colRef = firestore.collection(collectionName);

    // Fetches all documents in the collection
    const docsSnapshot = await colRef.get();

    // Transforms the documents data into a more usable format
    const data = docsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    console.log("Data from the collection composable",data);
    return data;
});
