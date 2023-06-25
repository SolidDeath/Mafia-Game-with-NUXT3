export default function addDocServer() {
    async function addDocServe(
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
                    }
                }
            }
        
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const responseData = await response.json();
            return { data: responseData, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };
    
    return { addDocServe }
}


  