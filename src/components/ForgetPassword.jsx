import React, { Fragment, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ForgetPasswordRequest } from '../apiRequest/authRequest'
import { ErrorToast, IsEmail } from '../helper/formHelper'
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

const ForgetPassword = () => {
    let email = useRef()
    const navigate = useNavigate()

    const onSend = async () => {
        if (email.value) {
            if (IsEmail(email.value)) {
                ErrorToast("Invalid email address.")
            }
            else {
                await ForgetPasswordRequest(email.value).then((result) => {
                    if (result) navigate('/')
                })
            }
        }
    }
    return (
        <Fragment>
            <section className=" ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <a href="#" className="flex text-bold px-2 items-center mb-6 text-2xl font-semibold text-[#b3b3b3]">
                        <HiChatBubbleOvalLeftEllipsis className='text-blue-600 text-4xl' />

                        Chat Buddies
                    </a>
                    <div className="w-full bg-neutral-800 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center ">
                                Forgot Your Password?
                            </h1>
                            <p className="mb-4 text-sm text-white ">
                                We get it, stuff happens. Just enter your email address below and we'll send you a
                                mail to reset your password.
                            </p>
                            <div className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-white ">Your email</label>
                                    <input ref={(i) => email = i} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#0C7075] focus:border-[#0C7075] block w-full p-2.5 " placeholder="name@company.com" required="" />
                                </div>
                                <button onClick={onSend} type="submit" className="w-full text-dark bg-white hover:bg-gray-950 hover:text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Send Password Reset Mail</button>
                                <p className="text-sm font-bold text-white ">
                                    Don’t have an account yet? <Link to="/register" className="font-medium text-blue-600 hover:underline">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default ForgetPassword
