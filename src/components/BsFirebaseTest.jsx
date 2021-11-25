import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { collection, query, where, getDocs, addDoc } from "firebase/firestore" 



const BsFirebaseTest = ({ db }) => {
    const [ purchase, setPurchase ] = useState('')
    const [ date, setDate ] = useState('')
    const [ category, setCategory ] = useState('')

    const [ users, setUsers ] =useState([])
    const usersCollectionRef = collection(db, "users")
    const auth = getAuth()
    
    // console.log(auth.currentUser.uid)
    //firestore testing------------------------------------------------------------------------------
    
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getUsers()
        console.log('this one')
    }, [])
    
    const getUserData = async () => {
        const q = query(usersCollectionRef, where("id", "==", auth.currentUser.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUsers(q.docs.map((doc) => ({...doc.data(), id: doc.id })))
            console.log(doc.id, " => ", doc.data());
        });
    }

    const make = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                purchase: purchase,
                date: date,
                category: category
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
            <input 
                type='price' 
                className='border'
                placeholder='Purchase Amount'
                value={purchase}
                onChange={(e) => setPurchase(e.target.value)}
            />
            <input 
                type='date' 
                className='border'
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <select 
                className="border-grey-200 border-2 rounded w-full p-2 h-10 mb-5"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                    <option value="living">Living</option>
                    <option value="food">Food</option>
                    <option value="transportaton">Transportation</option>
                    <option value="health">Health & Wellness</option>
                    <option value="discretionary">Discretionary</option>
                    <option value="misc">Misc</option>
                </select>
            <button className='m-5' onClick={make}>
                <u>make</u>
            </button>
            <button className='m-5' onClick={view}>
                <u>view</u>
            </button>
            <button className='m-5' onClick={getUserData}>
                <u>get doc</u>
            </button>
            <div>
                {users.map((user) => {
                    return (
                        <div className="flex">
                            <h1>Amount: {user.purchase}</h1>
                            <h1>date: {user.date}</h1>
                            <h1>Category: {user.category}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BsFirebaseTest
