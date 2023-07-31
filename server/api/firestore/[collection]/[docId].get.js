import useFirebaseServer from "~/server/utils/useFirebaseServer";


// Handles the event of fetching a specific document from a Firestore collection
export default defineEventHandler(async (event) => {
    const { firestore } = useFirebaseServer();
    const { collection: collectionName, docId } = event.context.params;

    // Gets a reference to the specified document in Firestore
    const docRef = firestore.collection(collectionName).doc(docId);

    // Fetches the document data
    const docSnapshot = await docRef.get();
    console.log("docSnapshot", docSnapshot);
    // Checks if the document exists and returns its data
    if (docSnapshot.exists) {
        let data = { ...docSnapshot.data(), id: docSnapshot.id };
        return data;
    } else {
        throw new Error("Document not found");
    }
});
