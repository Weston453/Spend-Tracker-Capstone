import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { getDocs, collection, query, where, orderBy, limit } from 'firebase/firestore'
import UpdateProfileModal from './UpdateProfileModal'
import cog from '../cog.svg'
import plus from '../plus.svg'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Living', 'Food', 'Transportation', 'Health & Wellness', 'Discretionary', 'Misc'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

// const Dashboard = ({ db, currentUserData, setCurrentUserData }) => {
const Dashboard = ({ db }) => {
    const [ currentUserData, setCurrentUserData ] = useState([])
    const [ modal, setModal ] = useState(false)
    const [ updateName, setUpdateName ] = useState(false)
    const [ name, setName ] = useState('')
    const [ total, setTotal ] = useState(0)
    const usersCollectionRef = collection(db, "users")
    const navigate = useNavigate()
    const auth = getAuth()
    
    const userId = JSON.parse(localStorage.getItem('userId'))
    console.log(userId)

    // const logout = () => {
    //     signOut(auth)
    //     .then(() => {
    //         localStorage.removeItem('token')
    //         navigate('/')
    //     })
    //     .catch((e) => alert(e.message))
    // }

    const sumPurchases = async () => {
        let stephenTotal = 0
        const currentUData = query(usersCollectionRef, where("id", "==", userId), orderBy("date", "desc"), limit(5))
        const snapshot = await getDocs(currentUData);
        setCurrentUserData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
  
        for (let i = 0; i < currentUserData.length; i++) {
            stephenTotal += +currentUserData[i].purchase
        }
        console.log(stephenTotal)
        setTotal(stephenTotal)
    }

    const pickMonth = () => {
        navigate('/monthBreakDown')
    }
    

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
    }, [])

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
                        {/* <button onClick={logout}>
                            <u>Logout</u>
                        </button> */}
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
                            <p className="m-5 text-xl">{total}</p>
                            <button onClick={sumPurchases}>temp sum</button>
                        </div>
    {/* --------------------------------------------------------------------------------------------------------------------- */}
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
                                                    <td className="flex justify-center">${data.purchase}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.category}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2"></h2> */}
                        <div className="w-80 bg-white rounded shadow-lg mx-5 mt-4 mb-10 p-3 flex flex-col items-center">
                            {/* <select className="border-grey-200 border-2 rounded w-full p-2 h-10 mb-5">
                                <option value="january">January</option>
                                <option value="february">February</option>
                                <option value="march">March</option>
                                <option value="april">April</option>
                                <option value="may">May</option>
                                <option value="june">June</option>
                                <option value="july">July</option>
                                <option value="august">August</option>
                                <option value="september">September</option>
                                <option value="october">October</option>
                                <option value="november">November</option>
                                <option value="december">December</option>
                            </select> */}
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
