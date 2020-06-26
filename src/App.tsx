import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"
import HomePage from "./pages/HomePage"
import RecipesPage from "./pages/RecipesPage"
import SubmitRecipePage from "./pages/SubmitRecipePage"
import RecipeDetailPage from "./pages/RecipeDetailPage"
import AuthContext from "./context"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import axiosInstance from "./helpers/axios"

const App = () => {
  const [authState, setAuthState] = useState({
    token: "",
    setToken: (newToken: string) => {
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${newToken}`
      if (!newToken) {
        localStorage.removeItem("token")
      } else {
        localStorage.setItem("token", newToken)
      }
      setAuthState({
        ...authState,
        token: newToken
      })
    }
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      authState.setToken(token)
    }
  }, [])

  return (
    <AuthContext.Provider value={authState}>
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/recipes" component={RecipesPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/submit-recipe" component={SubmitRecipePage} />
        <Route path="/recipe/:recipeId" component={RecipeDetailPage} />
      </Router>
    </AuthContext.Provider>
  )
}

export default App
