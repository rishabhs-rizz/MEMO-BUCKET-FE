import { useRef, useState } from "react";
import { Button } from "./Button";
import { Input } from "./InputComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const UsernameRef = useRef<HTMLInputElement>();
  const PasswordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function signingUp() {
    const username = UsernameRef.current?.value;
    const password = PasswordRef.current?.value;

    const res = await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
    });
    console.log("res", res.data);
    if (res) {
      alert("signed up successfully");
      navigate("/signin", {
        state: { username, password },
      });
    } else {
      alert("error signing up");
    }
  }

  return (
    <div className="w-screen h-screen bg-blue-200 flex justify-center items-center ">
      <div className="w-64  bg-white shadow-2xl rounded-lg p-4">
        <div className="p-2 flex justify-center">SIGN-UP</div>
        <div>
          <Input reference={UsernameRef} Placeholder={"Enter Username"} />
          <Input reference={PasswordRef} Placeholder={"Enter Password"} />
          <div className="pt-4 flex justify-center items-center">
            <Button
              onClick={() => signingUp()}
              wide={true}
              variant="primary"
              size="md"
              text="SIGN-UP"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SignIn() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function signingIn() {
    interface SignInResponse {
      token: string;
    }

    const res = await axios.post<SignInResponse>(
      BACKEND_URL + "/api/v1/signin",
      {
        username,
        password,
      }
    );
    console.log("res", res.data);
    if (res && res.data.token) {
      localStorage.setItem("token", res.data.token);
      alert("signed in successfully");
      navigate("/dashboard");
    } else {
      alert("error signing up");
    }
  }
  return (
    <div className="w-screen h-screen bg-blue-200 flex justify-center items-center pl-60 pr-60">
      <div className="w-56  bg-white shadow-2xl rounded-lg p-4">
        <div className="p-2 flex justify-center">SIGN-IN</div>
        <div>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="p-2"
            placeholder="enter username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            className="p-2"
            placeholder="enter password"
          />
          <div className="pt-4 flex justify-center items-center">
            <Button
              onClick={() => signingIn()}
              wide={true}
              variant="primary"
              size="md"
              text="SIGN-IN"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
