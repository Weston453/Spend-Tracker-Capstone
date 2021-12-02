import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const [ email, setEmail ] = useState("")
    const [ loading, setLoading ] = useState(false)

    const auth = getAuth()
    const navigate = useNavigate()

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
        <div className="w-full h-screen bg-background bg-no-repeat bg-cover flex justify-center items-center"> 
            <div className="flex-col flex items-center">
                <h1 className="text-white text-4xl font-bold mb-5">Spend Tracker</h1>
                <div className="w-80 bg-white rounded shadow-lg mx-5">
                    <div className="m-5">
                        <h2 className="block text-xl font-bold mb-2 flex-col flex items-center">Reset Password</h2>
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
                    <div className="m-5 flex-col flex items-center">
                        <button 
                            onClick={handlePasswordReset}
                            className="bg-green-600 text-white px-10 py-2 rounded text-xl font-bold"
                        >
                            { loading ? 'Sending Email ...' : 'Reset' }
                        </button>
                    </div>
                    <div className="m-5 text-lg">
                        <Link to="/"><u>Cancel</u></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
