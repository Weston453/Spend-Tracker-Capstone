import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { getDocs, collection, query, where, orderBy, limit } from 'firebase/firestore'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import UpdateProfileModal from './UpdateProfileModal'
import cog from '../cog.svg'
import plus from '../plus.svg'

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ db }) => {
    const [ currentUserData, setCurrentUserData ] = useState([])
    const [ name, setName ] = useState('')
    const [ modal, setModal ] = useState(false)
    const [ updateName, setUpdateName ] = useState(false)

    const [ living, setLiving ] = useState([])
    const [ food, setFood ] = useState([])
    const [ transportation, setTransportation ] = useState([])
    const [ health, setHealth ] = useState([])
    const [ discretionary, setDiscretionary ] = useState([])
    const [ misc, setMisc ] = useState([])

    const usersCollectionRef = collection(db, "users")
    const navigate = useNavigate()
    const auth = getAuth()
    const userId = JSON.parse(localStorage.getItem('userId'))

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/')
        }
        
        const getUsers = async () => {
            const currentUData = query(usersCollectionRef, where("id", "==", userId), orderBy("date", "desc"), limit(5))
            const snapshot = await getDocs(currentUData);
            setCurrentUserData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getUsers() 

        getCategoryLiving()
        getCategoryMisc()
        getCategoryTransportation()
        getCategoryHealth()
        getCategoryFood()
        getCategoryDiscretionary()
    }, [])

    const pickMonth = () => {
        navigate('/monthBreakDown')
    }

    //Total spend function------------------------------------------------
    const stephenFunc = () => {
        let stephenTotal = 0
        console.log(currentUserData.length)//----------------this one
        for (let i = 0; i < currentUserData.length; i++) {
            stephenTotal += +currentUserData[i].purchase
        }
        if (stephenTotal === 0) {
            return('...')
        } else {
            return `$${stephenTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`
        }
    }

    //category addtion functions-------------------------------------
    // Living-------------------------------------------------------------------------------------------------------------------------------
    const livingFunc = () => {
        let livingTotalStart = 0
        for (let i = 0; i < living.length; i++) {
            livingTotalStart += +living[i].purchase
            console.log(livingTotalStart)
        }
        if (livingTotalStart === 0) {
            return('...')
        } else {
            return livingTotalStart
        }
    }
    
    // Food-------------------------------------------------------------------------------------------------------------------------------
    const foodFunc = () => {
        let foodTotalStart = 0
        for (let i = 0; i < food.length; i++) {
            foodTotalStart += +food[i].purchase
            console.log(foodTotalStart)
        }
        if (foodTotalStart === 0) {
            return('...')
        } else {
            return foodTotalStart
        }
    }
    
    // Transportation-------------------------------------------------------------------------------------------------------------------------------
    const transportationFunc = () => {
        let transportationTotalStart = 0
        for (let i = 0; i < transportation.length; i++) {
            transportationTotalStart += +transportation[i].purchase
        }
        if (transportationTotalStart === 0) {
            return('...')
        } else {
            return transportationTotalStart
        }
    }

    // Health-------------------------------------------------------------------------------------------------------------------------------
    const healthFunc = () => {
        let healthTotalStart = 0
        for (let i = 0; i < health.length; i++) {
            healthTotalStart += +health[i].purchase
        }
        if (healthTotalStart === 0) {
            return('...')
        } else {
            return healthTotalStart
        }
    }
    
    // Discretionary-------------------------------------------------------------------------------------------------------------------------------
    const discretionaryFunc = () => {
        let discretionaryTotalStart = 0
        for (let i = 0; i < discretionary.length; i++) {
            discretionaryTotalStart += +discretionary[i].purchase
        }
        if (discretionaryTotalStart === 0) {
            return('...')
        } else {
            return discretionaryTotalStart
        }
    }

    // Misc-------------------------------------------------------------------------------------------------------------------------------
    const miscFunc = () => {
        let miscTotalStart = 0
        for (let i = 0; i < misc.length; i++) {
            miscTotalStart += +misc[i].purchase
        }
        if (miscTotalStart === 0) {
            return('...')
        } else {
            return miscTotalStart
        }
    }

//firebase category calls--------------------------------------------------------------------
    // Living-------------------------------------------------------------------------------------------------------------------------------
    let getCategoryLiving = async () => {
        const currentUDataL = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "Living"), orderBy("date", "desc"))
        const snapshotL = await getDocs(currentUDataL);
        setLiving(snapshotL.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }

    //Food---------------------------------------------------------------------------------------------------------------------------------
    const getCategoryFood = async () => {
        const currentUDataF = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "Food"), orderBy("date", "desc"))
        const snapshotF = await getDocs(currentUDataF);
        setFood(snapshotF.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }
    
    //Transportation---------------------------------------------------------------------------------------------------------------------------------
    const getCategoryTransportation = async () => {
        const currentUDataT = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "Transportaton"), orderBy("date", "desc"))
        const snapshotT = await getDocs(currentUDataT);
        setTransportation(snapshotT.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }

    //Health & Wellness---------------------------------------------------------------------------------------------------------------------------------
    const getCategoryHealth = async () => {
        const currentUDataH = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "H & W"), orderBy("date", "desc"))
        const snapshotH = await getDocs(currentUDataH);
        setHealth(snapshotH.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }

    //Discretionary---------------------------------------------------------------------------------------------------------------------------------
    const getCategoryDiscretionary = async () => {
        const currentUDataD = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "Discretionary"), orderBy("date", "desc"))
        const snapshotD = await getDocs(currentUDataD);
        setDiscretionary(snapshotD.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }

    //Misc---------------------------------------------------------------------------------------------------------------------------------
    const getCategoryMisc = async () => {
        const currentUDataM = query(usersCollectionRef, where("id", "==", userId), where("category", "==", "Misc"), orderBy("date", "desc"))
        const snapshotD = await getDocs(currentUDataM);
        setMisc(snapshotD.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }

    const data = {
        labels: ['Living', 'Food', 'Transportation', 'Health & Wellness', 'Discretionary', 'Misc'],
        datasets: [
          {
            label: '# of Votes',
            data: [livingFunc(), foodFunc(), transportationFunc(), healthFunc(), discretionaryFunc(), miscFunc()],
            backgroundColor: [
              'blue',
              'green',
              'orange',
              'red',
              'purple',
              'pink',
            ],
            borderColor: [
                'white',
            ],
            borderWidth: 3,
          },
        ],
      };
    
    return (
        <div className="w-screen h-100 bg-background bg-no-repeat bg-cover">
            {modal && <UpdateProfileModal modal={modal} setModal={setModal} name={name} setName={setName} updateName={updateName} setUpdateName={setUpdateName} / >}
            <div>
                <div className="w-screen h-19 bg-green-700 py-2">
                    <div className="text-white flex items-center justify-between mx-3">
                        <div className="mt-2">
                            <button className="text-7xl">
                                <Link to="/AddPurchase"><img className="h-10" src={plus} alt="add purchase" /></Link>
                            </button>
                        </div>
                        <div>
                            <h1 className="text-2xl">Spend Tracker</h1>
                        </div>
                        <div>
                            <button onClick={() => {setModal(true)}}>
                                <img className="h-10 mt-2 mr-" src={cog} alt="settings" />
                            </button>
                        </div>
                    </div>
                </div>
                    <div className="text-white text-lg mb-4 mr-2 flex-col text-right">
                        <p>Welcome, {
                            !updateName
                            ?
                            auth.currentUser ? auth.currentUser.displayName : '...'
                            :
                            name
                        }</p> 
                    </div>
                <div className="flex-col flex items-center">
                    <div>
                        <h2 className="text-white text-xl font-bold mx-5 mb-2">Total Spend</h2>
                        <div className="w-80 bg-white rounded shadow-lg mx-5 mb-3 p-1">
                            <p className="m-5 text-xl">{stephenFunc()}</p>
                        </div>
                        <div className="w-80 bg-white rounded shadow-lg mx-5 pt-2 pb-2 flex justify-center items-center">
                            <Doughnut data={data} />  
                        </div>
                        <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Recent Purchases</h2>
                        <div className="w-80 bg-white rounded shadow-lg mx-5 mb-3 p-1 flex justify-center items-center">
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
                                            <>
                                                <tr className="border-t" key={index}>
                                                    <td className="flex justify-center">${data.purchase.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.category}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-80 bg-white rounded shadow-lg mx-5 mt-4 mb-10 p-3 flex flex-col items-center">
                            <button 
                                className="bg-green-600 text-white px-10 py-2 rounded text-xl font-bold"
                                onClick={pickMonth}
                            >
                                Category Breakdown
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
