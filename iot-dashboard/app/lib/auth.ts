// // import { db } from "./firebase";
// import { doc, getDoc } from "firebase/firestore";

// export async function checkPermission(email: string) {
//     const ref = doc(db, "allowedUsers", email);
//     const snap = await getDoc(ref);
//     return snap.exists(); // true -> allowed, false -> not allowed
// }
