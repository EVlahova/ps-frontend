import { createContext } from "react"

// @ts-ignore
const AuthContext = createContext<{ token: string, setToken: (token: string) => void }>(null)

export default AuthContext