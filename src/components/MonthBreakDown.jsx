import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import backArrow from '../backArrow.svg'

const MonthBreakDown = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/')
        }
    })

    return (
        <div className="w-full h-full bg-background bg-no-repeat bg-cover">
            <div>
                <div className="text-white space-x-28">
                    <button className="mx-10 text-3xl">
                        <Link to="/dashboard">
                            <img className="h-8" src={backArrow} alt="settings" />
                        </Link>
                    </button>
                </div>
                <div className="flex-col flex items-center md:flex-row">
                    <select className="w-80 border-grey-200 border-2 rounded p-2 h-10 mx-5 mb-5">
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
                    </select>
                    <div className="w-80 h-60 bg-white rounded shadow-lg">
                        <p className="text-xl">Chart JS here</p>
                    </div>
                    <div className="flex-col">
                        <h2 className="w-80 text-white text-xl font-bold">Purchases</h2>
                        <div className="w-80 h-60 bg-white rounded shadow-lg">
                            <p className="text-xl">Purchases</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthBreakDown
