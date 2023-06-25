import { updateDoc, serverTimestamp, collection,getDoc, getDocs, doc, addDoc, setDoc, query, where, onSnapshot, deleteDoc} from "firebase/firestore";
import { ref } from "vue";
const {app, auth, firestore } = useFirebaseClient()

//TODO: Add error handling
export default function useFirestore(){ // getDoc is true by default
    // const docPath = collectionName + '/' + docId // path to the document
    // const docRef = doc(firestore, docPath) // reference to the document
  type whereObject = {
    field: string; 
    operator: string, 
    value: string
  }

  const getData = async (collectionName: string, docId?: string, subcollection?: string, subDocId?: string, queryObj?: whereObject) => {
    const returnedData = ref([])
    const error = ref(null)

    try {
        let queryRef;

        // Case 1: A document ID is not provided, we're fetching the whole collection
        if (!docId) {
            let colRef = collection(firestore, collectionName);

            // If a query object is provided, use it to filter the collection
            if (queryObj) {
                queryRef = query(colRef, where(queryObj.field, queryObj.operator, queryObj.value));
            } else {
                queryRef = colRef;
            }

            // Subscribe to changes in the data
            const unsub = onSnapshot(queryRef, (snap) => {
                let updatedData = []
                snap.forEach((doc) => {
                    updatedData.push({ ...doc.data(), id: doc.id })
                })
                returnedData.value = updatedData
            }, (err) => {
                // Handle any errors
                error.value = err.message
            })

            watchEffect((onInvalidate) => {
                onInvalidate(() => unsub()); // Unsubscribe from Firestore listener
            })

        } else {
            // Case 2: A document ID is provided, we're fetching a specific document or a subcollection of that document
            let docRef = doc(firestore, collectionName, docId);

            // If a subcollection is provided, fetch it
            if (subcollection) {
                let subColRef = collection(docRef, subcollection);

                // Case 2.1: A subdocument ID is provided, we're fetching a specific document in a subcollection
                if (subDocId) {
                    queryRef = doc(subColRef, subDocId);

                    // Subscribe to changes in the data
                    const unsub = onSnapshot(queryRef, (snap) => {
                        if (snap.exists()) {
                            returnedData.value = { ...snap.data(), id: snap.id }
                        } else {
                            error.value = "No document exists";
                        }
                    }, (err) => {
                        // Handle any errors
                        error.value = err.message
                    })

                    watchEffect((onInvalidate) => {
                        onInvalidate(() => unsub()); // Unsubscribe from Firestore listener
                    })
                } else {
                    // Case 2.2: No subdocument ID is provided, we're fetching the whole subcollection
                    // If a query object is provided, use it to filter the subcollection
                    if (queryObj) {
                        queryRef = query(subColRef, where(queryObj.field, queryObj.operator, queryObj.value));
                    } else {
                        queryRef = subColRef;
                    }

                    // Subscribe to changes in the data
                    const unsub = onSnapshot(queryRef, (snap) => {
                        let updatedData = []
                        snap.forEach((doc) => {
                            updatedData.push({ ...doc.data(), id: doc.id })
                        })
                        returnedData.value = updatedData
                    }, (err) => {
                        // Handle any errors
                        error.value = err.message
                    })

                    watchEffect((onInvalidate) => {
                        onInvalidate(() => unsub()); // Unsubscribe from Firestore listener
                    })
                }
            } else {
                // Case 3: No subcollection is provided, fetch the specific document
                queryRef = docRef;

                // Subscribe to changes in the data
                const unsub = onSnapshot(queryRef, (snap) => {
                    if (snap.exists()) {
                        returnedData.value = { ...snap.data(), id: snap.id }
                    } else {
                        error.value = "No document exists";
                    }
                }, (err) => {
                    // Handle any errors
                    error.value = err.message
                })

                watchEffect((onInvalidate) => {
                    onInvalidate(() => unsub()); // Unsubscribe from Firestore listener
                })
            }
        }
    } catch (error) {
        // Handle any errors that occur during execution
        throw createError({statusCode: 500, message: "Failed to " + error})
    }

    // Return the data, error
    return { data: returnedData, error }
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
            const docRef = await addDoc(collection(firestore, collectionName), {
                ...data,
                createdAt: serverTimestamp()
            });
        }
    } catch (error) {
        throw createError({statusCode: 500, message: "Failed to " + error});
    }
}



  async function updateDocument(collectionName: string, docId: string, data: Object, subcollection?: string, subDocId?: string){
    try {
        let docRef
        if (subcollection && subDocId) {
            let parentDocRef = doc(firestore, collectionName, docId);
            docRef = doc(parentDocRef, subcollection, subDocId);
        } else {
            docRef = doc(firestore, collectionName, docId);
        }
        await updateDoc(docRef, data);
    } catch (error) {
        throw createError({statusCode: 500, message: "Failed to update the document: " + error})
    }
  }

  async function deleteDocument(collectionName: string, docId: string, subcollection?: string, subDocId?: string){
    try {
        let docRef
        if (subcollection && subDocId) {
            let parentDocRef = doc(firestore, collectionName, docId);
            docRef = doc(parentDocRef, subcollection, subDocId);
        } else {
            docRef = doc(firestore, collectionName, docId);
        }
        await deleteDoc(docRef);
    } catch (error) {
        throw createError({statusCode: 500, message: "Failed to delete the document: " + error})
    }
  }

   
    return {addDocument, updateDocument, deleteDocument, getData }
}