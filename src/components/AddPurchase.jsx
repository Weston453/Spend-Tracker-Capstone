import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import backArrow from '../backArrow.svg'
import AddPurchModal from './AddPurchModal'

const AddPurchase = ({ db, currentUserData, setCurrentUserData }) => {
    const [ purchase, setPurchase ] = useState('')
    const [ date, setDate ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ modal, setModal ] = useState(false)
    const [ docId, setDocId ] = useState('')

    const usersCollectionRef = collection(db, "users")
    const auth = getAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/')
        }

        // const getUsers = async () => {
        //     const currentUData = query(usersCollectionRef, where("id", "==", auth.currentUser.uid));
    
        //     const snapshot = await getDocs(currentUData);
        //     setCurrentUserData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
            
        // }
        // getUsers()
        console.log('addPurchase')
    }, [currentUserData])

    const add = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                purchase: purchase,
                date: date,
                category: category
            })
            console.log("Document written with ID: ", docRef.id)
            setDocId(docRef.id)
        } catch (e) {
            console.error("Error adding document: ", e)
        }
        setModal(true)
    }

    return (
        <div className="w-full h-screen bg-background bg-no-repeat bg-cover">
            {modal && <AddPurchModal setModal={setModal} db={db} docId={docId} />}
            <button>
                <Link to="/dashboard">
                    <img className="h-8 fixed mt-2" src={backArrow} alt="back to dashboard" />
                </Link>
            </button>
            <div className="mx-5">
                <div className="w-80 bg-white rounded shadow-lg mx-5 mb-10 p-3 flex flex-col items-center">
                    <div>
                        <h2 className="text-xl font-bold mb-2 mt-2">Amount Spent</h2>
                        <input 
                            value={purchase}
                            onChange={e => setPurchase(e.target.value)}
                            name="spend" 
                            type="float" 
                            placeholder="$"
                            className="border-grey-200 border-2 rounded w-full p-2 h-12"
                        />
                        <h2 className="text-xl font-bold mb-2 mt-2">Date Purchased</h2>
                        <input 
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            name="date" 
                            type="date"
                            className="border-grey-200 border-2 rounded w-full p-2 h-12"
                        />
                        <h2 className="text-xl font-bold mb-2 mt-2">Category</h2>
                        <select 
                            className="border-grey-200 border-2 rounded w-full p-2 h-12 mb-5"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Pick a Category</option>
                            <option value="Living">Living</option>
                            <option value="Food">Food</option>
                            <option value="Transportaton">Transportation</option>
                            <option value="H & W">Health & Wellness</option>
                            <option value="Discretionary">Discretionary</option>
                            <option value="Misc">Misc</option>
                        </select>
                    </div>
                    <button 
                        onClick={add}
                        className="bg-green-600 text-white px-10 py-2 rounded text-xl font-bold"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddPurchase
