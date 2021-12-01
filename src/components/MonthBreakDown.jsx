import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { getDocs, collection, query, where, orderBy, deleteDoc, setDoc, doc } from 'firebase/firestore'
import backArrow from '../backArrow.svg'
import pencil from '../pencil.svg'
import trash from '../trash.svg'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Category Spend',
      },
    },
  };
  
const MonthBreakDown = ({ db }) => {
    const [ currentUserData, setCurrentUserData ] = useState([])
    const [ month, setMonth ] = useState('')
    const [ purchaseEdit, setPurchaseEdit ] = useState('')
    const [ dateEdit, setDateEdit ] = useState('')
    const [ categoryEdit, setCategoryEdit ] = useState('')
    const [ editModal, setEditModal ] = useState(false)
    const [ deleteModal, setDeleteModal ] = useState(false)
    const [ key, setKey ] = useState('')
    const usersCollectionRef = collection(db, "users")
    const navigate = useNavigate()
    const auth = getAuth()
    
    const [ living, setLiving ] = useState([])
    const [ livingTotal, setLivingTotal ] = useState(0)
    const [ loading, setLoading ] = useState(false)

    const [ food, setFood ] = useState([])
    const [ foodTotal, setFoodTotal ] = useState(0)
    
    const [ transportation, setTransportation ] = useState([])
    const [ transportationTotal, setTransportationTotal ] = useState(0)
    
    const [ health, setHealth ] = useState([])
    const [ healthTotal, setHealthTotal ] = useState(0)
    
    const [ discretionary, setDiscretionary ] = useState([])
    const [ discretionaryTotal, setDiscretionaryTotal ] = useState(0)
    
    const [ misc, setMisc ] = useState([])
    const [ miscTotal, setMiscTotal ] = useState(0)

    const userId = JSON.parse(localStorage.getItem('userId'))
    // console.log(month)
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
    
    useEffect(() => {
        const newFunc = async () => {
            let test = await getCategoryLiving()
            setLivingTotal(test)
            console.log(test)
            await getCategoryLiving()
            await getCategoryFood()
            setLoading(!loading)
            console.log('anything')
            return
        }
        newFunc()
        
        console.log('ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
    }, [])
    
    const data = {
    labels: ['Living', 'Food', 'Transportation', 'H & W', 'Discretionary', 'Misc'],
    datasets: [
        {
        label: 'Dataset 1',
        data: [livingTotal, foodTotal, transportationTotal, healthTotal, discretionaryTotal, miscTotal],
        backgroundColor: 'rgba(4,120,87,1)',
        },
    ],
    };
    
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
    
    const runEdit = (key) => {
        setKey(key)
        setEditModal(true)
    }
    
    const runDelete = async (key) => {
        await deleteDoc(doc(db, "users", key))
        setDeleteModal(true)
    }
    
    // stupidity starts here----------------------------------------------------------------------------------------------------------------------
    let getCategoryLiving = async () => {
        // Living-------------------------------------------------------------------------------------------------------------------------------
        const currentUDataL = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "Living"), orderBy("date", "desc"))
        const snapshotL = await getDocs(currentUDataL);
        
        // console.log("WE ARE INSIDE THE IF!!!!!")
        setLiving(snapshotL.docs.map((doc) => ({...doc.data(), id: doc.id })))
        
        let livingTotalStart = 0
        for (let i = 0; i < living.length; i++) {
            livingTotalStart += +living[i].purchase
            console.log(livingTotalStart)
        }
        
        console.log(living)
        setLivingTotal(livingTotalStart)
        
    }
    
    const getCategoryFood = async () => {
        //Food---------------------------------------------------------------------------------------------------------------------------------
        const currentUDataF = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "Food"), orderBy("date", "desc"))
        const snapshotF = await getDocs(currentUDataF);
        setFood(snapshotF.docs.map((doc) => ({...doc.data(), id: doc.id })))
        console.log(food)
        
        let foodTotalStart = 0
        for (let i = 0; i < food.length; i++) {
            foodTotalStart += +food[i].purchase
        }
        console.log(foodTotalStart)
        setFoodTotal(foodTotalStart)
    }
    
    const getCategoryTransportation = async () => {
        //Transportation---------------------------------------------------------------------------------------------------------------------------------
        const currentUDataT = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "Transportaton"), orderBy("date", "desc"))
        const snapshotT = await getDocs(currentUDataT);
        setTransportation(snapshotT.docs.map((doc) => ({...doc.data(), id: doc.id })))
        console.log(transportation)
        
        let transportationTotalStart = 0
        for (let i = 0; i < transportation.length; i++) {
            transportationTotalStart += +transportation[i].purchase
        }
        console.log(transportationTotalStart)
        setTransportationTotal(transportationTotalStart)
    }
    const getCategoryHealth = async () => {
        //Health & Wellness---------------------------------------------------------------------------------------------------------------------------------
        const currentUDataH = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "H & W"), orderBy("date", "desc"))
        const snapshotH = await getDocs(currentUDataH);
        setHealth(snapshotH.docs.map((doc) => ({...doc.data(), id: doc.id })))
        console.log(health)
        
        let healthTotalStart = 0
        for (let i = 0; i < health.length; i++) {
            healthTotalStart += +health[i].purchase
        }
        console.log(healthTotalStart)
        setHealthTotal(healthTotalStart)
    }
    const getCategoryDiscretionary = async () => {
        //Discretionary---------------------------------------------------------------------------------------------------------------------------------
        const currentUDataD = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "Discretionary"), orderBy("date", "desc"))
        const snapshotD = await getDocs(currentUDataD);
        setDiscretionary(snapshotD.docs.map((doc) => ({...doc.data(), id: doc.id })))
        console.log(discretionary)
        
        let discretionaryTotalStart = 0
        for (let i = 0; i < discretionary.length; i++) {
            discretionaryTotalStart += +discretionary[i].purchase
        }
        console.log(discretionaryTotalStart)
        setDiscretionaryTotal(discretionaryTotalStart)
    }
    const getCategoryMisc = async () => {
        //Misc---------------------------------------------------------------------------------------------------------------------------------
        const currentUDataM = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "Misc"), orderBy("date", "desc"))
        const snapshotD = await getDocs(currentUDataM);
        setMisc(snapshotD.docs.map((doc) => ({...doc.data(), id: doc.id })))
        console.log(misc)
        
        let miscTotalStart = 0
        for (let i = 0; i < misc.length; i++) {
            miscTotalStart += +misc[i].purchase
        }
        console.log(miscTotalStart)
        setMiscTotal(miscTotalStart)
    }
    // stupidity ends here----------------------------------------------------------------------------------------------------------------------

    return (
        <div className="w-screen h-100 bg-background bg-no-repeat bg-cover"> 
        { deleteModal && 
            <div className="w-screen h-screen fixed bg-gray-600 bg-opacity-80 flex items-center justify-center">
                <div className="w-80 bg-white rounded shadow-lg mx-5 mb-10 p-3 ">
                <div className="">
                    <button 
                        onClick={() => setDeleteModal(false)}
                        className="text-xl font-bold"
                        >
                        X
                    </button>
                </div>
                <h2 className="flex flex-col items-center text-xl font-bold mb-2 mt-2">Purchase Deleted</h2>   
                </div>
            </div>
        }
        
        { editModal && 
            <div className="w-screen h-screen fixed bg-gray-600 bg-opacity-80 flex items-center justify-center">
                <div className="w-80 bg-white rounded shadow-lg mx-5 mb-10 p-3">
                    <button 
                        onClick={() => setEditModal(false)}
                        className="text-xl font-bold"
                        >
                        X
                    </button>
                    <div className="flex flex-col items-center">
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
            </div>
        }
            <div className="w-screen h-19 bg-green-700 mb-10 flex items-center">
                <button className="z-30 ">
                    <Link to="/dashboard">
                        <img className="h-8" src={backArrow} alt="settings" />
                    </Link>
                </button>
                <h2 className="text-white text-2xl order-last font-bold mt-4 mx-auto mb-5 mr-28">Category Spend</h2>
            </div>
            <div>
                <div className="flex-col flex items-center">
                    {/* <select onChange={(e) => setMonth(e.target.value)} className="w-80 border-grey-200 border-2 rounded p-2 h-10 mt-24 mx-5 mb-5">
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
                    </select> */}
                    <div className="w-80 h- bg-white rounded shadow-lg">
                        <Bar options={options} data={data} />
                        <button onClick={getCategoryLiving}>Living</button>
                        <button onClick={getCategoryFood}>Food</button>
                        <button onClick={getCategoryTransportation}>Transportation</button>
                        <button onClick={getCategoryHealth}>Health</button>
                        <button onClick={getCategoryDiscretionary}>Discretionary</button>
                        <button onClick={getCategoryMisc}>Misc</button>
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
                                                        <button onClick={() => runEdit(data.id)}><img className="h-4" src={pencil} alt="Edit Purchase" /></button>
                                                    </td>
                                                    <td className="flex justify-center">
                                                        <button onClick={() => runDelete(data.id)}><img className="h-4" src={trash} alt="Delete Purchase" /></button>
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
