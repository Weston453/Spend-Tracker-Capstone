import React, { useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

const Signup = ({ history }) => {
    const navigate = useNavigate()

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            navigate('/dashboard')
        }
    })

    const submitHandler = () => {
        setLoading(true)
        const auth = getAuth()

        if (password !== confirmPassword){
            setError(true)
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, { displayName: name })
                    .then(() => navigate('/'))
                    .catch((e) => alert(e.message))
            }).catch((e) => alert(e.message))
            .finally(() => setLoading(false))
    }

    return (
        <div className="w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex justify-center items-center p-5px">
            <div className="w-96 bg-white rounded shadow-lg m-5">
                <div className="m-5">
                    <h2 className="block text-xl font-bold mb-2">Create Account</h2>
                </div>
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Name</label>
                    <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        name="name" 
                        type="name" 
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                        required
                    />
                </div>
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Email</label>
                    <input 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email" 
                        type="email" 
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                        required
                    />
                </div>
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Password</label>
                    <input 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password" 
                        type="password" 
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                        required
                    />
                </div>
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Confirm Password</label>
                    <input 
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        name="password" 
                        type="password" 
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                        required
                    />
                </div>
                <div className="m-5">
                {error && <p>Passwords need to match</p>}
                </div>
                <div className="m-5">
                    <button 
                        onClick={submitHandler}
                        className="bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 text-white px-10 py-2 rounded text-xl font-bold"
                    >
                        { loading ? 'Creating user ...' : 'Sign Up' }
                    </button>
                </div>
                <div className="m-5">
                Have an Account? <Link to="/"><u>Login</u></Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
