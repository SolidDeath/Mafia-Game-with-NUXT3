export default async function updateDocServe(
    collectionName: string, 
    data: object, 
    docId?: string, 
    subcollection?: string, 
    subDocId?: string
) {
    try {
        let endpoint = 'http://localhost:3000/api/firestore';
    
        if (docId) {
            if(!collectionName){
                throw new Error('Collection name is required when updating a document.');
            }
            else{
                endpoint += '/' + collectionName + '/' + docId;
            }
            if (subDocId) {
                if(!subcollection){ 
                    throw new Error('Subcollection is required when updating a subdocument.')
                }
                else{
                    endpoint += '/' + subcollection + '/' + subDocId;
                }
            }
        }
        // console.log("This is the API endpoint: ", endpoint);
        
        const response = await fetch(endpoint, {
            method: 'PUT', // Change this to PUT for update
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        return { data: response, error: null };
    } catch (error) {
        return { data: null, error };
    }
};
