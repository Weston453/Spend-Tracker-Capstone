import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { getDocs, collection, query, where, orderBy, deleteDoc, setDoc, doc } from 'firebase/firestore'
import backArrow from '../backArrow.svg'

const MonthBreakDown = ({ db }) => {
    const [ currentUserData, setCurrentUserData ] = useState([])
    const [ month, setMonth ] = useState('')
    const [ purchaseEdit, setPurchaseEdit ] = useState('')
    const [ dateEdit, setDateEdit ] = useState('')
    const [ categoryEdit, setCategoryEdit ] = useState('')
    const [ editModal, setEditModal ] = useState(false)
    const [ key, setKey ] = useState('')
    const usersCollectionRef = collection(db, "users")
    const navigate = useNavigate()
    const auth = getAuth()
    
    const userId = JSON.parse(localStorage.getItem('userId'))
    console.log(month)

    const add = async () => {
        await setDoc(doc(db, "users", key), {
            id: auth.currentUser.uid,
            name: auth.currentUser.displayName,
            purchase: purchaseEdit,
            date: dateEdit,
            category: categoryEdit
        });
        alert('yay')
        window.location.reload()
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/')
        }
        // console.log('month')

        const getUsers = async () => {
            const currentUData = query(usersCollectionRef, where("id", "==", userId), orderBy("date", "desc"))
            const snapshot = await getDocs(currentUData);
            setCurrentUserData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getUsers() 
    }, [])

    const runEdit = (key) => {
        setKey(key)
        setEditModal(true)
    }

    
    const runDelete = async (key) => {
        await deleteDoc(doc(db, "users", key))
    }

    return (
        <div className="w-full h-100 bg-background bg-no-repeat bg-cover"> 
        { editModal && 
            <div className="w-screen h-screen fixed bg-gray-600 bg-opacity-80 flex items-center justify-center">
                    <div className="w-80 bg-white rounded shadow-lg mx-5 mb-10 p-3 flex flex-col items-center">
                    <button 
                        onClick={() => setEditModal(false)}
                        className="text-xl font-bold"
                    >
                        X
                    </button>
                    <h2 className="text-xl font-bold mb-2 mt-2">Amount Spent</h2>
                    <input 
                        value={purchaseEdit}
                        onChange={e => setPurchaseEdit(e.target.value)}
                        name="spend" 
                        type="float" 
                        placeholder="$"
                        className="border-grey-200 border-2 rounded w-full p-2 h-12"
                    />
                    <h2 className="text-xl font-bold mb-2 mt-2">Date Purchased</h2>
                    <input 
                        value={dateEdit}
                        onChange={e => setDateEdit(e.target.value)}
                        name="date" 
                        type="date"
                        className="border-grey-200 border-2 rounded w-full p-2 h-12"
                    />
                    <h2 className="text-xl font-bold mb-2 mt-2">Category</h2>
                    <select 
                        className="border-grey-200 border-2 rounded w-full p-2 h-12 mb-5"
                        value={categoryEdit}
                        onChange={(e) => setCategoryEdit(e.target.value)}
                    >
                        <option value="">Pick a Category</option>
                        <option value="Living">Living</option>
                        <option value="Food">Food</option>
                        <option value="Transportaton">Transportation</option>
                        <option value="H & W">Health & Wellness</option>
                        <option value="Discretionary">Discretionary</option>
                        <option value="Misc">Misc</option>
                    </select>
                    <button 
                        onClick={add}
                        className="bg-green-600 text-white px-10 py-2 rounded text-xl font-bold"
                    >
                        Add
                    </button>
                </div>
            </div>
        }
            <div className="fixed w-screen h-19 bg-green-700 mb-10 flex items-center">
                <button className="fixed z-30 ">
                    <Link to="/dashboard">
                        <img className="h-8" src={backArrow} alt="settings" />
                    </Link>
                </button>
                <h2 className="text-white text-2xl order-last font-bold mt-4 mx-auto mb-5 ">Current Month Spend</h2>
            </div>
            <div>
                <div className="flex-col flex items-center">
                    <select onChange={(e) => setMonth(e.target.value)} className="w-80 border-grey-200 border-2 rounded p-2 h-10 mt-24 mx-5 mb-5">
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <div className="w-80 h-60 bg-white rounded shadow-lg">
                        <p className="text-xl">Chart JS here</p>
                    </div>
                    <div className="flex-col">
                        <h2 className="w-80 text-white text-xl font-bold mt-2">Purchases</h2>
                        <div className="w-80 bg-white rounded shadow-lg mb-10 p-1">
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUserData.map((data, index) => {
                                        return (
                                            // (month === '' ?
                                            <>
                                                <tr className="border-b" key={index}>
                                                    <td className="flex justify-center">${data.purchase}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.category}</td>
                                                    {console.log(data.id)}
                                                    <td className="flex justify-center">
                                                        <button onClick={() => runEdit(data.id)}>e</button>
                                                    </td>
                                                    <td className="flex justify-center">
                                                        <button onClick={() => runDelete(data.id)}>d</button>
                                                    </td>
                                                </tr>
                                            </>
                                            // :
                                            // '')
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthBreakDown
