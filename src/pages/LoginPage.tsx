import React, { useState, useCallback, useContext } from "react"
import Header from "../components/Header"
import axiosInstance from "../helpers/axios"
import AuthContext from "../context"
import { useHistory } from "react-router-dom"

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setToken } = useContext(AuthContext)
  const history = useHistory()

  const handleLogin = useCallback(async () => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      }) as { token: string }

      setToken(res.token)
      history.push("/")
    } catch(err) {
      console.log(err)
      alert(err.message)
    }
  }, [email, password])

  return (
    <>
      <Header />
      <div className="container p-5">
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
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
        <button onClick={handleLogin} type="submit" className="btn btn-submit">Login</button>
      </div>
    </>
  )
}

export default LoginPage