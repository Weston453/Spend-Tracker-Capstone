import React from 'react'
import { getAuth } from 'firebase/auth'
import { collection, addDoc, getDocs } from "firebase/firestore"; 



const BsFirebaseTest = ({ db }) => {
    const auth = getAuth()

    console.log(auth.currentUser.uid)
    //firestore testing------------------------------------------------------------------------------
    const make = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                id: auth.currentUser.uid
            });
            console.log("Document written with ID: ", docRef.id);
            } catch (e) {
            console.error("Error adding document: ", e);
            }
        }
    
    
        const view = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            });
        }
    
            //-----------------------------------------------------------------------------------------------

    return (
        <div>
            <button className='m-5' onClick={make}>
                <u>make</u>
            </button>
            <button className='m-5' onClick={view}>
                <u>view</u>
            </button>
        </div>
    )
}

export default BsFirebaseTest
