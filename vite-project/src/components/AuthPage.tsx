import { useRef } from "react"
import { Button } from "./Button"
import { Input } from "./InputComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signup(){

    const UsernameRef = useRef<HTMLInputElement>();
    const PasswordRef = useRef<HTMLInputElement>();

    function signingUp (){
        const username = UsernameRef.current?.value;
        const password = PasswordRef.current?.value

        axios.post(BACKEND_URL + "/api/v1/signup",{
            username,
            password
        })
    }

    return <div className="w-screen h-screen bg-blue-200 flex justify-center items-center ">
        <div className="w-64  bg-white shadow-2xl rounded-lg p-4" >
            <div className="p-2 flex justify-center">SIGN-UP</div>
            <div>
                <Input reference={UsernameRef} Placeholder={"Enter Username"} />
                <Input reference={PasswordRef} Placeholder={"Enter Password"} />
                <div className="pt-4 flex justify-center items-center">
                <Button onClick={signingUp} wide={true} variant="primary" size="md" text="SIGN-UP"/>
                </div>
            </div>
        </div>
    </div>
}

export function SignIn(){

    return <div className="w-screen h-screen bg-blue-200 flex justify-center items-center pl-60 pr-60">
        <div className="w-56  bg-white shadow-2xl rounded-lg p-4" >
            <div className="p-2 flex justify-center">SIGN-IN</div>
            <div>
                <input type="text" className="p-2" placeholder="enter username"/>
                <input type="text" className="p-2" placeholder="enter password"/>
                <div className="pt-4 flex justify-center items-center">
                <Button wide={true} variant="primary" size="md" text="SIGN-IN"/>
                </div>
            </div>
        </div>
    </div>
}