import React, { useState, useCallback } from "react"

import classes from "./SubmitRecipePage.module.scss"
import Header from "../components/Header"
import useFetch from "../hooks/useFetch"
import axiosInstance from "../helpers/axios"
import { Link } from "react-router-dom"

const RecipesPage = () => {
  const [category, setCategory] = useState("")
  const [includeAllIngredients, setIncludeAllIngredients] = useState(true)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState([])
  const { data: categories } = useFetch("/categories")
  const { data: ingredients } = useFetch("/ingredients")

  const handleSubmit = useCallback(async () => {
    try {
      const res = await axiosInstance.post("/recipes/search", {
        categoryName: category,
        includeAllIngredients,
        searchTerm,
        ingredients: selectedIngredients,
      })

      setResults(res as any)
    } catch (err) {
      console.log(err)
      alert(err.message)
    }
  }, [category, includeAllIngredients, selectedIngredients, searchTerm])

  return <>
    <Header />
    <div className="search">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2>Browse Recipes</h2>
            <div className="row">
              <div className="col-lg-3">
                <div className="form-group">
                  <label>Choose category</label>
                  <select
                    value={category} onChange={e => setCategory(e.target.value)} className={classes.Select}
                    name="category" data-placeholder="Choose Category" tabIndex={-1}
                    aria-hidden="true"
                  >
                    {(categories || []).map((cat: { categoryId: number, name: string }) => (
                      <option key={cat.categoryId} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Select one or more ingredients that should be included in recipe</label>
                  <div>
                    <select
                      value=""
                      className={classes.Select}
                      onChange={e => setSelectedIngredients(selectedIngredients.includes(e.target.value)
                        ? selectedIngredients.filter(ing => ing !== e.target.value)
                        : [...selectedIngredients, e.target.value])}
                      name="ingredients[]" multiple={false} data-placeholder="Included Ingredients"
                      tabIndex={-1} aria-hidden="true"
                    >
                      <option value="" disabled defaultChecked>Select some:</option>
                      {(ingredients || []).map((ing: any) => (
                        <option key={ing.name} value={ing.name}>{ing.name}</option>
                      ))}
                    </select>
                    <label
                      onClick={e => e.stopPropagation()}
                      className={classes.SelectedItems}
                    >{selectedIngredients.map(ing => <span key={ing}>{ing}</span>)}</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label>Recipe needs to have</label>
                  <select
                    value={includeAllIngredients ? 1 : 0}
                    onChange={e => setIncludeAllIngredients(Boolean(+e.target.value))}
                    className={classes.Select}
                    name="category"
                    data-placeholder="Choose Category"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <option value={1}>All of selected ingredients</option>
                    <option value={0}>Any of selected ingredients</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <input
                    type="text"
                    onChange={e => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    className="form-control"
                    placeholder="Search by Keyword"
                  />
                  <button onClick={handleSubmit} className="btn">Search Recipes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {results.length > 0 && (
          <>
            <h2>Results</h2>
            <div className="row">
              {results?.map((res: any) => (
                <div className="col-lg-12">
                  <Link to={`/recipe/${res.recipeId}`} >{res.name}</Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  </>
}

export default RecipesPage
