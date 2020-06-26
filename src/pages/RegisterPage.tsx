import React, { useState, useCallback, useContext } from "react"
import { useHistory } from "react-router-dom"

import Header from "../components/Header"
import axiosInstance from "../helpers/axios"

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const history = useHistory()

  const handleRegister = useCallback(async () => {
    try {
      const res = await axiosInstance.post("/auth/register", {
        email,
        name,
        password,
        confirmPassword: repeatPassword,
      }) as { token: string }

      history.push("/login")
    } catch(err) {
      console.log(err)
      alert(err.message)
    }
  }, [email, name, password, repeatPassword])

  return (
    <>
      <Header />
      <div className="container p-5">
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Repeat Password</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button onClick={handleRegister} type="submit" className="btn btn-submit">Register</button>
      </div>
    </>
  )
}

export default RegisterPage