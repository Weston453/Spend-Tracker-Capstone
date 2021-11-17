import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const auth = getAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ loading, setLoading ] = useState(false)

    const handlePasswordReset = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigate('/')
                alert('Email to reset password has been sent')
            })
            .catch((e) => alert(e.message))
            .finally(() => setLoading(false))
    }

    return (
        <div className="w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex justify-center items-center">
            {/* <h1>Spend Tracker</h1> */}
            <div className="w-96 bg-white rounded shadow-lg mx-5">
                <div className="m-5">
                    <h2 className="block text-xl font-bold mb-2">Reset Password</h2>
                </div>
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Email</label>
                    <input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email" 
                    type="email" 
                    className="border-grey-200 border-2 rounded w-full p-2 h-10"
                    />
                </div>
                <div className="m-5">
                    <button 
                        onClick={handlePasswordReset}
                        className="bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 text-white px-10 py-2 rounded text-xl font-bold"
                    >
                        { loading ? 'Sending Email ...' : 'Reset' }
                    </button>
                </div>
                <div className="m-5">
                    <Link to="/"><u>Cancel</u></Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
