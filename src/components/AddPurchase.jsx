import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import backArrow from '../backArrow.svg'

const AddPurchase = ({ db, users, setUsers }) => {
    const [ purchase, setPurchase ] = useState('')
    const [ date, setDate ] = useState('')
    const [ category, setCategory ] = useState('')

    // const [ users, setUsers ] =useState([])
    const usersCollectionRef = collection(db, "users")
    const auth = getAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/')
        }

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getUsers()
    })

    const add = async () => {
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

        const getUserData = async () => {
            const q = query(usersCollectionRef, where("id", "==", auth.currentUser.uid));
    
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        }

        const view = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            });
        }

    return (
        <div className="w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex center-items justify-center">
           <div className="text-white space-x-28">
                <button className="mx-10 text-3xl">
                    <Link to="/dashboard"><img className="h-8" src={backArrow} alt="back to dashboard" /></Link>
                </button>
            </div>
           <div className="m-5">
                <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Amount Spent</h2>
                <input 
                    value={purchase}
                    onChange={e => setPurchase(e.target.value)}
                    name="spend" 
                    type="float" 
                    placeholder="$"
                    className="border-grey-200 border-2 rounded w-full p-2 h-12"
                />
                <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Date Purchased</h2>
                <input 
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    name="date" 
                    type="date" 
                    className="border-grey-200 border-2 rounded w-full p-2 h-12"
                />
                <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Category</h2>
                <select 
                    className="border-grey-200 border-2 rounded w-full p-2 h-12 mb-5"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Living">Living</option>
                    <option value="Food">Food</option>
                    <option value="Transportaton">Transportation</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Discretionary">Discretionary</option>
                    <option value="Misc">Misc</option>
                </select>
                <button 
                    onClick={add}
                    className="bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 text-white px-10 py-2 rounded font-bold"
                >
                    Add
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
        </div>
    )
}

export default AddPurchase
