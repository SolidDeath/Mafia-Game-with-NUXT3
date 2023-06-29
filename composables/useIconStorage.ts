import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject} from 'firebase/storage';
import { ref as vueRef } from 'vue';

const { setDocument, deleteDocument, getDocument} = useFirestore();
const { auth, authReady} = useFirebaseClient();

const storage = getStorage();

export default function useIconStorage() {
    const error = vueRef(null);
    const url = vueRef(null);
    const filePath = vueRef(null);
    const userUid = vueRef('');
    const shortUUID = vueRef('');

    authReady.then(() => { //authReady is a promise that resolves when auth is initialized
        userUid.value = auth.currentUser.uid;
    })

    const generateFilePath = (folderName: string) => {
        const uniqueId = crypto.randomUUID(); //returns 36 characters long v4 UUID
        shortUUID.value = uniqueId.slice(0, 20);
        return `${folderName}/${shortUUID.value}`;
    }

    const uploadImage = async (folderName: string, file) => {
        try {
            filePath.value = generateFilePath(folderName);
            const storageRef = ref(storage, shortUUID.value);
            const uploadTask = uploadBytesResumable(storageRef, file); //can be paused / resumed / cancelled
            console.log('File to upload: ', file);
            
            uploadTask.on('state_changed', snapshot => {
                //TODO: Progress functionality here 
            }, err => {
                error.value = err.message;
            }, async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await setDocument(folderName, shortUUID.value, {
                    imageUrl: downloadURL,
                    originalName: file.name,
                    filePath: filePath.value,
                    fileName: shortUUID.value,
                    addedBy: userUid.value
                });
                url.value = downloadURL;
            });
        } catch (err) {
            error.value = err.message;
        }
    }

    const deleteImage = async (collection: string, docId: string) => {
        
        try {           
            const docData = await getDocument(collection, docId);

            if (!docData || !docData.imageUrl) {
                throw new Error('Document not found or has no imageUrl field.');
            }
            const imageRef = ref(storage, docId);
            
            await deleteObject(imageRef); //delete image from storage

            await deleteDocument(collection, docId);
            url.value = null;
            filePath.value = null;
        } catch (err) {
            error.value = err.message;
        }
    }

    return { url, filePath, error, uploadImage, deleteImage };
}
