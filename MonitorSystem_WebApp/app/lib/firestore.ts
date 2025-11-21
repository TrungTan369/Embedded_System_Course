// // import { db } from "./firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// export async function addUser(email: string) {
//     await setDoc(doc(db, "allowedUsers", email), { role: "user" });
// }

// export async function getUser(email: string) {
//     const snap = await getDoc(doc(db, "allowedUsers", email));
//     return snap.data();
// }
