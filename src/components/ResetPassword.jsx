import React, { Fragment, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ErrorToast, IsPassword } from '../helper/formHelper'
import { ResetPasswordRequest } from '../apiRequest/authRequest'
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

const ResetPassword = () => {
    let npassword, cpassword = useRef()
    let navigate = useNavigate()
    let params = useParams()

    const onReset = async () => {
        if (IsPassword(npassword.value)) {
            ErrorToast("Password must be six characters, at least one letter and one number !")
        } else if (npassword.value !== cpassword.value) {
            ErrorToast("Password doesn't match with confirm password.")
        } else {
            await ResetPasswordRequest(npassword.value, params.token).then((result) => {
                if (result) navigate('/')
            })
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
                    <div className="w-full rounded-lg shadow bg-neutral-800 md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-white text-center md:text-2xl ">
                                Reset Password
                            </h1>
                            <div className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-white ">New Password</label>
                                    <input ref={(i) => npassword = i} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#0C7075] focus:border-[#0C7075] block w-full p-2.5 " required="" />
                                </div>
                                <div>
                                    <label for="Cpassword" className="block mb-2 text-sm font-medium text-white ">Confirm Password</label>
                                    <input ref={(i) => cpassword = i} type="password" name="Cpassword" id="Cpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#0C7075] focus:border-[#0C7075] block w-full p-2.5 " required="" />
                                </div>
                                <button onClick={onReset} type="submit" className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center text-dark bg-white hover:bg-gray-950 hover:text-white ">Upadte Password</button>
                                <p className="text-sm font-bold text-white ">
                                    Already have an account? <Link to="/" className="font-medium text-blue-600 hover:underline ">Login here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default ResetPassword
