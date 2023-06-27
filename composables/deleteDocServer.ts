export default async function deleteDocServe(
    collectionName: string, 
    docId?: string, 
    subcollection?: string, 
    subDocId?: string
) {
    try {
        let endpoint = 'http://localhost:3000/api/firestore';

        if (docId) {
            if(!collectionName){
                throw new Error('Collection name is required when deleting a document.');
            }
            else{
                endpoint += '/' + collectionName + '/' + docId;
            }
            if (subDocId) {
                if(!subcollection){ 
                    throw new Error('Subcollection is required when deleting a subdocument.')
                }
                else{
                    endpoint += '/' + subcollection + '/' + subDocId;
                }
            }
        }

        // console.log("This is the API endpoint: ", endpoint);
        
        const response = await fetch(endpoint, {
            method: 'DELETE', // Change this to DELETE for deleting
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return { data: response, error: null };
    } catch (error) {
        return { data: null, error };
    }
};
