export default async function addDocServer(
    collectionName: string, 
    data: object, 
    docId?: string, 
    subcollection?: string, 
    subDocId?: string
){
    try {
        let endpoint = 'http://localhost:3000/api/firestore/' + collectionName;
    
        if (docId) {
            endpoint += '/' + docId;
            if (subcollection) {
                endpoint += '/' + subcollection;
                if (subDocId) {
                    endpoint += '/' + subDocId;
                } else{
                    endpoint += '/document';
                }
            }
        } else{
            endpoint += '/document';
        }
        // console.log("This is the API endpoint: ", endpoint);
        
        const response = await $fetch(endpoint, {
            method: 'POST',
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


  