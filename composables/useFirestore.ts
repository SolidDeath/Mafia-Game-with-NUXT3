import { updateDoc, serverTimestamp, collection, getDoc, getDocs, doc, addDoc, setDoc, query, where, onSnapshot, deleteDoc, Unsubscribe, DocumentData } from "firebase/firestore";
import { ref, watchEffect } from "vue";
const {app, auth, firestore } = useFirebaseClient()

//TODO: Add error handling
export default function useFirestore(){
    type WhereObject = {
      field: string; 
      operator: string, 
      value: string
    }
  
    type DocData = DocumentData & { id: string };
  
    async function subscribeToData(queryRef: any, returnedData: Ref<any[]>, error: Ref<string|null>) {
        let unsub = onSnapshot(queryRef, (snap) => {
            let updatedData: any[] = [];
            if (!snap.docs) {
                // This is a document, not a query
                if (snap.exists()) {
                    updatedData.push({ ...snap.data(), id: snap.id });
                } else {
                    error.value = `Document with id: ${snap.id} does not exist`;
                }
            } else {
                // This is a query, we need to loop over docs
                snap.forEach((doc: any) => {
                    updatedData.push({ ...doc.data(), id: doc.id });
                });
            }
            returnedData.value = updatedData;
        }, (err) => {
            // Handle any errors
            error.value = `Failed to fetch data: ${err.message}`;
        });
    
        watchEffect((onInvalidate) => {
            onInvalidate(() => unsub());
        });
    }
    
    
  
    const getData = (collectionName: string, docId?: string, subcollection?: string, subDocId?: string, queryObj?: WhereObject) => {
        const returnedData = ref<DocData[]>([]);
        const error = ref<string|null>(null);
      
        try {
            let queryRef;
      
            if (!docId) {
                let colRef = collection(firestore, collectionName);
                queryRef = queryObj ? query(colRef, where(queryObj.field, queryObj.operator, queryObj.value)) : colRef;
            } else {
                let docRef = doc(firestore, collectionName, docId);
                if (subcollection) {
                    let subColRef = collection(docRef, subcollection);
                    if (subDocId) {
                        queryRef = doc(subColRef, subDocId);
                    } else {
                        queryRef = queryObj ? query(subColRef, where(queryObj.field, queryObj.operator, queryObj.value)) : subColRef;
                    }
                } else {
                    queryRef = docRef;
                }
            }
      
            subscribeToData(queryRef, returnedData, error);
        } catch (err) {
            throw createError({statusCode: 500, message: "Failed to fetch data: " + err});
        }
        return returnedData
    }
      



    async function addDocument(collectionName: string, data: object, docId?: string, subcollection?: string, subDocId?: string) {
        try {
            if(docId) {
                const docRef = doc(firestore, collectionName, docId);

                // If a subcollection is specified, we'll add a document to it
                if(subcollection) {
                    const subColRef = collection(docRef, subcollection);

                    // If a subdocument ID is specified, we'll set the document with that ID
                    if (subDocId) {
                        const subDocRef = doc(subColRef, subDocId);
                        await setDoc(subDocRef, {
                            ...data,
                            createdAt: serverTimestamp()
                        });
                    } else {
                        // If no subdocument ID is specified, we'll add a new document
                        await addDoc(subColRef, {
                            ...data,
                            createdAt: serverTimestamp()
                        });
                    }
                } else {
                    // If no subcollection is specified, we'll update the main document
                    await setDoc(docRef, {
                        ...data,
                        createdAt: serverTimestamp()
                    });
                }
            } else {
                // If no document ID is specified, we'll add a new document to the main collection
                await addDoc(collection(firestore, collectionName), {
                    ...data,
                    createdAt: serverTimestamp()
                });
            }
        } catch (error) {
            throw createError({statusCode: 500, message: "Failed to " + error});
        }
    }



    async function updateDocument(collectionName: string, docId: string, data: DocumentData, subcollection?: string, subDocId?: string){
        try {
            let docRef = doc(firestore, collectionName, docId);
            docRef = (subcollection && subDocId) ? doc(docRef, subcollection, subDocId) : docRef;
            await updateDoc(docRef, data);
        } catch (error) {
            throw createError({statusCode: 500, message: "Failed to update the document: " + error})
        }
    }

    async function deleteDocument(collectionName: string, docId: string, subcollection?: string, subDocId?: string){
        try {
            let docRef = doc(firestore, collectionName, docId);
            docRef = (subcollection && subDocId) ? doc(docRef, subcollection, subDocId) : docRef;
            await deleteDoc(docRef);
        } catch (error) {
            throw createError({statusCode: 500, message: "Failed to delete the document: " + error})
        }
    }

   
    return {addDocument, updateDocument, deleteDocument, getData }
}