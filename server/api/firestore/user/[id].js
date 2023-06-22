// import useFirebaseServer from "../../../utils/firebaseServer"

// const { firestore } = useFirebaseServer();


// export default defineEventHandler(async event => { 
//     const {id} = event.context.params
//     const ref = firestore.doc(`users/${id}`);
//     const snapshot = await ref.get();
//     const data = snapshot.data();
//     return data;
// })