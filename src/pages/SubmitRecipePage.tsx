import React, { useState, useCallback } from "react"
import { useHistory } from "react-router-dom"

import classes from "./SubmitRecipePage.module.scss"
import Header from "../components/Header"
import useFetch from "../hooks/useFetch"
import axiosInstance from "../helpers/axios"

const SubmitRecipePage = () => {
  const [name, setName] = useState("")
  const [shortSummary, setShortSummary] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [ingredients, setIngredients] = useState<{ id: number, name: string, notes: string }[]>([])
  const [photo, setPhoto] = useState<File | null>(null)
  const [directions, setDirections] = useState("")
  const [yieldField, setYieldField] = useState("")
  const [preparationTime, setPreparationTime] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [calories, setCalories] = useState("")
  const [totalCarbohydrate, setTotalCarbohydrate] = useState("")
  const [totalFat, setTotalFat] = useState("")
  const [protein, setProtein] = useState("")
  const [cholesterol, setCholesterol] = useState("")

  const history = useHistory()
  const { data: categories } = useFetch("/categories")

  const handleSubmit = useCallback(async () => {
    try {
      const photoBlob = await fetch(URL.createObjectURL(photo))
      const formData = new FormData()
      formData.append("AttachmentFile", await photoBlob.blob())
      const { attachmentId } = await axiosInstance.post("/attachments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      await axiosInstance.post("/recipes", {
        name,
        shortSummary,
        tags,
        ingredients,
        attachmentId,
        directions,
        yield: yieldField,
        preparationTime,
        cookingTime,
        category,
        nutritionFacts: {
          id: 0,
          calories,
          totalCarbohydrate,
          totalFat,
          protein,
          cholesterol,
        },
      })

      history.push("/")
    } catch (err) {
      console.log(err)
      alert(err.message)
    }
  }, [
    name,
    shortSummary,
    tags,
    ingredients,
    directions,
    yieldField,
    preparationTime,
    cookingTime,
    category,
    photo,
    calories,
    totalCarbohydrate,
    totalFat,
    protein,
    cholesterol,
  ])

  return <>
    <Header />
    <div className="submit">
      <div className="title">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Submit Recipe</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">

              <div className="form-group">
                <label>Recipe Title</label>
                <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" />
              </div>

              <div className="form-group">
                <label>Choose category</label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className={classes.Select}
                  name="category" data-placeholder="Choose Category" tabIndex={-1}
                  aria-hidden="true"
                >
                  <option value="" defaultChecked disabled>Select one:</option>
                  {(categories || []).map((cat: { categoryId: number, name: string }) => (
                    <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Short summary</label>
                <textarea
                  value={shortSummary}
                  onChange={e => setShortSummary(e.target.value)}
                  className="form-control"
                  rows={4}
                  required={true}
                />
              </div>

              <div className="form-group">
                <label>Tag</label>
                <input value={tags} onChange={e => setTags(e.target.value)} type="text" className="form-control" />
              </div>

              <div className="form-group">
                <label>Upload your photo</label>
                <input
                  onChange={e => setPhoto(e.target.files![0])}
                  type="file"
                  className="form-control-file"
                />
              </div>

              <div className="form-group">
                <label>Ingredients:</label>

                {ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="box">
                    <div className="row">
                      <div className="col-lg-5 col-sm-5">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name of ingredient"
                          value={ingredient.name}
                          onChange={e => setIngredients(ingredients.map(ing => ing.id === ingredient.id ? {
                            ...ing,
                            name: e.target.value,
                          } : ing))}
                        />
                      </div>
                      <div className="col-lg-5 col-sm-5">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Notes (quantity or additional info)"
                          value={ingredient.notes}
                          onChange={e => setIngredients(ingredients.map(ing => ing.id === ingredient.id ? {
                            ...ing,
                            notes: e.target.value,
                          } : ing))}
                        />
                      </div>
                      <div className="col-lg-1 col-sm-1">
                        <i
                          onClick={() => setIngredients(ingredients.filter((ing) => ing.id !== ingredient.id))}
                          className="fa fa-times-circle-o minusbtn"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setIngredients([...ingredients, { id: ingredients.length, name: "", notes: "" }])}
                  className="btn btn-light"
                >Add new ingredient
                </button>

              </div>

              <div className="form-group">
                <label>Directions:</label>
                <textarea
                  value={directions}
                  onChange={e => setDirections(e.target.value)}
                  className="form-control"
                  rows={4}
                  required={true}
                />
              </div>

              <div className="form-group">
                <label>Additional Informations</label>
                <hr />
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Yield</label>
                <div className="col-sm-10">
                  <input
                    value={yieldField}
                    onChange={e => setYieldField(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Preparation Time</label>
                <div className="col-sm-10">
                  <input
                    value={preparationTime}
                    onChange={e => setPreparationTime(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Cooking Time</label>
                <div className="col-sm-10">
                  <input
                    value={cookingTime}
                    onChange={e => setCookingTime(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Nutrition Facts</label>
                <hr />
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Calories</label>
                <div className="col-sm-10">
                  <input
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Total Carbohydrate</label>
                <div className="col-sm-10">
                  <input
                    value={totalCarbohydrate}
                    onChange={e => setTotalCarbohydrate(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Total Fat</label>
                <div className="col-sm-10">
                  <input
                    value={totalFat}
                    onChange={e => setTotalFat(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Protein</label>
                <div className="col-sm-10">
                  <input
                    value={protein}
                    onChange={e => setProtein(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Cholesterol</label>
                <div className="col-sm-10">
                  <input
                    value={cholesterol}
                    onChange={e => setCholesterol(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <button onClick={handleSubmit} type="submit" className="btn btn-submit">Submit Recipe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default SubmitRecipePage
