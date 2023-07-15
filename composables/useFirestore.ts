import { 
    doc, 
    getDoc, 
    onSnapshot, 
    collection, 
    query, 
    getDocs, 
    addDoc, 
    setDoc, 
    updateDoc, 
    deleteDoc 
} from "firebase/firestore";

import { ref } from "vue";

export default function useFirestore() {
    const { firestore } = useFirebaseClient();
    
    async function getDocument(collectionName: string, docId: string, subCollection?: string, subDocId?: string): Promise<{[key: string]: any}> {
      let docRef;
      
      if(subCollection && subDocId) {
        docRef = doc(firestore, collectionName, docId as string, subCollection, subDocId);
      } else if(collectionName && docId) {
        docRef = doc(firestore, collectionName, docId);
      } else {
        throw createError({ statusCode: 400, statusMessage: "Invalid path parameters." });
      }
      
      const docSnap = await getDoc(docRef);
      
      return docSnap.data();
    }
  
    async function getCollection(collectionName: string, docId?: string, subCollection?: string): Promise<{[key: string]: any}[]> {
      let q;
      
      if(docId && subCollection) {
        q = query(collection(firestore, collectionName, docId, subCollection));
      } else if(collectionName) {
        q = query(collection(firestore, collectionName));
      } else {
        throw createError({ statusCode: 400, statusMessage: "Invalid path parameters." });
      }
      
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => doc.data());
      
      return docs;
    }
  
    async function subscribeDocument<T>(collectionName: string, docId?: string, subCollection?: string, subDocId?: string): Promise<Ref<T | null>> {
      const result = ref(null);
  
      return new Promise((resolve, reject) => {
          let docRef;
  
          if(subCollection && subDocId) {
              docRef = doc(firestore, collectionName, docId as string, subCollection, subDocId);
          } else if(collectionName && docId) {
              docRef = doc(firestore, collectionName, docId);
          } else {
              reject(createError({ statusCode: 400, statusMessage: "Invalid path parameters." }));
          }
  
          let isInitialSnapshot = true;
  
          const unsubscribe = onSnapshot(docRef, (doc) => {
              if (isInitialSnapshot) {
                  isInitialSnapshot = false;
                  result.value = doc.data();
                  resolve(result.value);  // resolve after the first snapshot
              } else {
                  setTimeout(() => {
                      result.value = doc.data();
                  }, 0);
              }
          });
  
          onUnmounted(unsubscribe);
      });
    }
  
  
  
    function subscribeCollection(collectionName: string, docId?: string, subCollection?: string): Promise<Ref<null | {[key: string]: any}[]>> {
      const results = ref([]);
  
      return new Promise((resolve, reject) => {
          let q;
  
          if(docId && subCollection) {
              q = query(collection(firestore, collectionName, docId, subCollection));
          } else if(collectionName) {
              q = query(collection(firestore, collectionName));
          } else {
              reject(createError({ statusCode: 400, statusMessage: "Invalid path parameters." }));
          }
  
          let isInitialSnapshot = true;
  
          const unsubscribe = onSnapshot(q, (snapshot) => {
              if (isInitialSnapshot) {
                  isInitialSnapshot = false;
                  results.value = snapshot.docs.map(doc => doc.data());
                  resolve(results.value);  // resolve after the first snapshot
              } else {
                  setTimeout(() => {
                      results.value = snapshot.docs.map(doc => doc.data());
                  }, 0);
              }
          });
  
          onUnmounted(unsubscribe);
      });
    }
  
  
    
    function getDataFromFirestore(subscribe: boolean, collectionName: string, docId?: string, subCollection?: string, subDocId?: string) {
      if(subscribe) {
        if(subCollection && subDocId) {
          return subscribeDocument(collectionName, docId, subCollection, subDocId);
        } else if(collectionName && docId) {
          return subscribeDocument(collectionName, docId);
        } else if(collectionName) {
          return subscribeCollection(collectionName);
        } else {
          throw createError({ statusCode: 400, statusMessage: "Invalid path parameters." });
        }
      } else {
        if(subCollection && subDocId) {
          return getDocument(collectionName, docId, subCollection, subDocId);
        } else if(collectionName && docId) {
          return getDocument(collectionName, docId);
        } else if(collectionName) {
          return getCollection(collectionName);
        } else {
          throw createError({ statusCode: 400, statusMessage: "Invalid path parameters." });
        }
      }
    }

    async function addDocument(
        collectionName: string, 
        docData: {[key: string]: any}, 
        docId?: string, 
        subCollection?: string
    ): Promise<string> {
        let docRef;
        
        if(subCollection) {
            if(docId) {
            docRef = collection(firestore, collectionName, docId, subCollection);
            } else {
            throw createError({ statusCode: 400, statusMessage: "docId is required when adding to a subcollection." });
            }
        } else {
            docRef = collection(firestore, collectionName);
        }
        
        const docRes = await addDoc(docRef, docData);
        
        return docRes.id;
    }
    
    async function setDocument(
        collectionName: string, 
        docId: string, 
        docData: {[key: string]: any}, 
        subCollection?: string, 
        subDocId?: string
        ): Promise<void> {
        let docRef;
        
        if(subCollection && subDocId) {
            docRef = doc(firestore, collectionName, docId, subCollection, subDocId);
        } else if(collectionName && docId) {
            docRef = doc(firestore, collectionName, docId);
        } else {
            throw createError({ statusCode: 400, statusMessage: "Invalid path parameters." });
        }
        
        await setDoc(docRef, docData);
    }
    
    async function updateDocument(
        collectionName: string, 
        docId: string, 
        docData: {[key: string]: any}, 
        subCollection?: string, 
        subDocId?: string
        ): Promise<void> {
        let docRef;
        
        if(subCollection && subDocId) {
            docRef = doc(firestore, collectionName, docId, subCollection, subDocId);
        } else if(collectionName && docId) {
            docRef = doc(firestore, collectionName, docId);
        } else {
            throw createError({ statusCode: 400, statusMessage: "Invalid path parameters." });
        }
        
        await updateDoc(docRef, docData);
    }
    
    async function deleteDocument(
        collectionName: string, 
        docId: string, 
        subCollection?: string, 
        subDocId?: string
        ): Promise<void> {
        let docRef;
        
        if(subCollection && subDocId) {
            docRef = doc(firestore, collectionName, docId, subCollection, subDocId);
        } else if(collectionName && docId) {
            docRef = doc(firestore, collectionName, docId);
        } else {
            throw createError({ statusCode: 400, statusMessage: "Invalid path parameters." });
        }
        
        await deleteDoc(docRef);
    }
    
    return {
        getDocument,
        getCollection,
        subscribeDocument,
        subscribeCollection,
        getDataFromFirestore,
        addDocument,
        setDocument,
        updateDocument,
        deleteDocument
    }
}