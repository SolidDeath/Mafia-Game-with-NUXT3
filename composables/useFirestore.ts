import { updateDoc, serverTimestamp, collection,getDoc, getDocs, doc, addDoc, setDoc, query, where, onSnapshot} from "firebase/firestore";
import { ref } from "vue";
const {app, auth, firestore } = useFirebaseClient()

//TODO: Add error handling
export default function useFirestore(collectionName: string, docId?: string, ){ // getDoc is true by default
    // const docPath = collectionName + '/' + docId // path to the document
    // const docRef = doc(firestore, docPath) // reference to the document
    type whereObject = {
        field: string; 
        operator: string, 
        value: string
    }


    const getData = async (subcollection?: string, queryObj?: whereObject) => {

        const returnedData = ref([])
        const error = ref(null)
        const cache = new Map() // Simple caching mechanism
        //TODO, add a cache invalidation mechanism and figure out how to use firebase's cache (has to be enabled in useFirebaseClient.js) https://firebase.google.com/docs/firestore/manage-data/enable-offline

        if(cache.has(collectionName + docId + subcollection)) {
          returnedData.value = cache.get(collectionName + docId + subcollection)
          return
        }
    
        let colRef = collection(firestore, collectionName)
        let docRef
        if (docId) {
          docRef = doc(colRef, docId)
          if (subcollection) {
            colRef = collection(docRef, subcollection)
            if (queryObj) {
              docRef = query(colRef, where(queryObj.field, queryObj.operator, queryObj.value))
            }
          }
        }
    
        const unsub = onSnapshot(
          docRef,
          (snap) => {
            let updatedData = []
            snap.forEach((doc) => {
              updatedData.push({ ...doc.data(), id: doc.id })
            })
            returnedData.value = updatedData
            cache.set(collectionName + docId + subcollection, updatedData) // set the data in cache
          },
          (err) => {
            error.value = err.message
          }
        )
    
        watchEffect((onInvalidate) => {
          onInvalidate(() => {
            if (unsub) {
              unsub() // unsubscribe from Firestore listener
            }
          })
        })
      }


    async function addDocument(data: object){
        if(docId){
            const docRef = doc(firestore, collectionName, docId)
            await setDoc(docRef, {
                ...data,
                createdAt: serverTimestamp()
            })
        }
        else{
            const docRef = await addDoc(collection(firestore, collectionName), {
                ...data,
                createdAt: serverTimestamp()
            })
        }
    }



    async function updateDocument(collectionName: string, docId: string, data: Object){

    }

    async function deleteDocument(){

    }

    async function getCollection(){

    }

   
    return {addDocument, updateDocument, deleteDocument, getData }
}