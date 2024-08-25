import { Firestore, getFirestore } from "firebase/firestore";

/**
 * Establishes a connection to the Firestore database.
 *
 * @return {Firestore} The Firestore instance.
 */
export const dbConnect = (): Firestore => {
    return getFirestore()
}
