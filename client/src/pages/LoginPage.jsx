import React, { useContext, useState } from 'react'
import assets from '../assets/assets.js'
import { AuthContext } from '../../context/AuthContext.jsx'

const LoginPage = () => {
    const [currState, setCurrState] = useState("Sign Up")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [isDataSubmitted, setisDataSubmitted] = useState(false)

    const { login } = useContext(AuthContext)

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if (currState === 'Sign Up' && !isDataSubmitted) {
            setisDataSubmitted(true)
            return
        }
        login(currState === "Sign Up" ? 'signup' : 'login', { fullName, email, password, bio })
    }

    return (
        <div className="min-h-screen px-4 py-10 flex flex-col sm:flex-row items-center justify-center bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] text-white">
            {/* Logo Section */}
            <div className="hidden sm:flex flex-col items-center sm:mr-12 mb-10 sm:mb-0">
                <img src={'/logo.png'} alt="Logo" className="w-[min(280px,50vw)] drop-shadow-lg" />
                <p className="text-gray-400 mt-4 text-center text-sm sm:text-base">Connect. Chat. Chill.</p>
            </div>

            {/* Form Section */}
            <form
                onSubmit={onSubmitHandler}
                className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl w-full max-w-md shadow-2xl text-white flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold flex justify-between items-center">
                    {currState}
                    {isDataSubmitted && (
                        <img
                            onClick={() => setisDataSubmitted(false)}
                            src={assets.arrow_icon}
                            alt="Back"
                            className="w-5 cursor-pointer hover:scale-110 transition"
                        />
                    )}
                </h2>

                {currState === "Sign Up" && !isDataSubmitted && (
                    <input
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                        type="text"
                        placeholder="Full Name"
                        required
                        className="bg-[#2a2d3a] p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
                    />
                )}

                {!isDataSubmitted && (
                    <>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email Address"
                            required
                            className="bg-[#2a2d3a] p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            required
                            className="bg-[#2a2d3a] p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
                        />
                    </>
                )}

                {currState === "Sign Up" && isDataSubmitted && (
                    <textarea
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        rows={4}
                        placeholder="Tell us something about yourself..."
                        required
                        className="bg-[#2a2d3a] p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
                    />
                )}

                <button
                    type="submit"
                    className="py-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-md text-white font-medium hover:opacity-90 transition-all duration-300 shadow-md"
                >
                    {currState === "Sign Up" ? "Create Account" : "Login Now"}
                </button>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <input type="checkbox" className="accent-violet-500 w-4 h-4" />
                    <label className="select-none">Agree to the terms & privacy policy</label>
                </div>

                <div className="text-sm text-gray-400 text-center">
                    {currState === "Sign Up" ? (
                        <p>
                            Already have an account?{" "}
                            <span
                                onClick={() => {
                                    setCurrState("Login")
                                    setisDataSubmitted(false)
                                }}
                                className="text-gray-100 font-medium cursor-pointer hover:underline"
                            >
                                Login Here
                            </span>
                        </p>
                    ) : (
                        <p>
                            New here?{" "}
                            <span
                                onClick={() => {
                                    setCurrState("Sign Up")
                                    setisDataSubmitted(false)
                                }}
                                className="text-gray-100 font-medium cursor-pointer hover:underline"
                            >
                                Create an Account
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    )
}

export default LoginPage
