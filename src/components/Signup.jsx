import React, { useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
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
                    .then(
                        signInWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                localStorage.setItem('token', userCredential._tokenResponse.idToken)
                                localStorage.setItem('userId', JSON.stringify(auth.currentUser.uid || 'we suck at life'))
                                navigate('/dashboard')
                            }))
                    .catch((e) => alert(e.message))
            }).catch((e) => alert(e.message))
            .finally(() => setLoading(false))
    }

    return (
        <div className="w-full h-screen bg-background bg-no-repeat bg-cover flex justify-center items-center">
            
            <div className="flex-col flex items-center">
            <h1 className="text-white text-4xl font-bold mb-">Spend Tracker</h1>
            <div className="w-80 bg-white rounded shadow-lg m-5">
                <div className="m-5">
                    <h2 className="block text-xl font-bold mb-2 flex justify-center">Create Account</h2>
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
                <div className="m-5 flex justify-center">
                    <button 
                        onClick={submitHandler}
                        className="bg-green-600 text-white px-10 py-2 rounded text-xl font-bold "
                    >
                        { loading ? 'Creating user ...' : 'Sign Up' }
                    </button>
                </div>
                <div className="m-5 text-lg">
                Have an Account? <Link to="/"><u>Login</u></Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Signup
