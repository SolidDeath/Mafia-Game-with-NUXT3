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
  
    function subscribeDocument(collectionName: string, docId?: string, subCollection?: string, subDocId?: string): Ref<null | {[key: string]: any}> {
      const result = ref(null);
      let docRef;
      
      if(subCollection && subDocId) {
        docRef = doc(firestore, collectionName, docId as string, subCollection, subDocId);
      } else if(collectionName && docId) {
        docRef = doc(firestore, collectionName, docId);
      } else {
        throw createError({ statusCode: 400, statusMessage: "Invalid path parameters." });
      }
      
      const unsubscribe = onSnapshot(docRef, (doc) => {
        result.value = doc.data();
      });
      
      onUnmounted(unsubscribe);
      
      return result;
    }
  
    function subscribeCollection(collectionName: string, docId?: string, subCollection?: string): Ref<null | {[key: string]: any}[]> {
      const results = ref([]);
      let q;
      
      if(docId && subCollection) {
        q = query(collection(firestore, collectionName, docId, subCollection));
      } else if(collectionName) {
        q = query(collection(firestore, collectionName));
      } else {
        throw createError({ statusCode: 400, statusMessage: "Invalid path parameters." });
      }
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        results.value = snapshot.docs.map(doc => doc.data());
      });
      
      onUnmounted(unsubscribe);
      
      return results;
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