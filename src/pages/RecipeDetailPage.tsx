import React, { useState, useCallback, useEffect } from "react"
import Header from "../components/Header"
import axiosInstance from "../helpers/axios"
import useFetch from "../hooks/useFetch"
import { getHumanRecipeDate } from "../helpers/humanDates"

// @ts-ignore
const RecipeDetailPage = ({ match }) => {
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const { data: recipe, refetch: refetchRecipe } = useFetch(`/recipes/${match.params.recipeId}`)
  const { data: comments, refetch: refetchComments } = useFetch(`/comments/getByRecipe/${match.params.recipeId}`)

  useEffect(() => {
    if (recipe) {
      setRating(recipe.rating)
    }
  }, [recipe])

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData()
      formData.append("Value", comment)
      formData.append("ParentId", "0")
      formData.append("RecipeId", match.params.recipeId)

      await axiosInstance.post(`/comments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      await refetchComments()
    } catch (err) {
      console.log(err)
      alert(err.message)
    }
  }, [comment])

  const handleStarClick = useCallback(async () => {
    try {
      const res = await axiosInstance.post(`/recipes/${match.params.recipeId}/rating`, {
        rating,
      })

      console.log(res)
      await refetchRecipe()
    } catch (err) {
      console.log(err)
      alert(err.message)
    }
  }, [recipe, rating])

  const exportRecipe = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/recipes/${match.params.recipeId}/export`, {
        responseType: "blob"
      })

      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(res)
      link.download = recipe.name + ".pdf"
      link.click()
    } catch (err) {
      console.log(err)
      alert(err.message)
    }
  }, [recipe])

  return (
    <>
      <Header />
      <div className="recipe-detail">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <h4>{getHumanRecipeDate(new Date(recipe?.lastUpdated))}</h4>
              <h1>{recipe?.name}</h1>
              <div className="by">
                <i className="fa fa-user mr-2" aria-hidden="true" />
                {recipe?.user.name}
              </div>
            </div>
            <div className="col-lg-8">
              <button className="btn btn-submit btn-block" onClick={exportRecipe}>Export</button>
            </div>
            <div className="col-lg-8">
              <img src={recipe?.attachmentUrl} alt="" />
              <div className="info">
                <div className="row">
                  <div className="col-lg-4 col-sm-4">
                    <p>Serves:</p>
                    <p>
                      <strong>
                        <i className="fa fa-users" aria-hidden="true" />
                        {recipe?.yield} people
                      </strong>
                    </p>
                  </div>
                  <div className="col-lg-4 col-sm-4">
                    <p>Prep Time:</p>
                    <p>
                      <strong>
                        <i className="fa fa-clock-o" aria-hidden="true" />
                        {recipe?.preparationTime}
                      </strong>
                    </p>
                  </div>
                  <div className="col-lg-4 col-sm-4">
                    <p>Cooking:</p>
                    <p>
                      <strong>
                        <i className="fa fa-clock-o" aria-hidden="true" />
                        {recipe?.cookingTime}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <p>
                {recipe?.shortSummary}
              </p>

              <div className="tag">
                {recipe?.tags.split(" ")
                  .map((tag: string) => (
                    <a key={tag} href="#">{tag}</a>
                  ))}
                <div className="float-right">
                  {Array.from(Array(5)
                    .keys())
                    .map((i) => (
                      <i
                        key={i}
                        className={`fa pointer ${rating <= i ? "fa-star-o" : "fa-star"}`}
                        style={{ fontSize: 32 }}
                        onClick={handleStarClick}
                        onMouseEnter={() => setRating(i + 1)}
                        onMouseLeave={() => setRating(recipe?.rating)}
                      />
                    ))}
                </div>
              </div>

              <div className="ingredient-direction">
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <h3>Ingredients</h3>
                    <ul className="ingredients">
                      {recipe?.ingredients.map((ing: any) => (
                        <li key={ing.ingredientId}>
                          {ing.notes} {ing.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <h3>Directions</h3>
                    <ol className="directions">
                      {recipe?.directions.split("\n")
                        .map((dir: string, i: number) => (
                          <li key={i}>
                            {dir}
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              </div>

              <div className="nutrition-facts clearfix">
                <h3>Nutrition Facts</h3>
                <div>
                  <p>Calories:</p>
                  <p>
                    <strong>{recipe?.nutritionFacts.calories} kcal</strong>
                  </p>
                </div>
                <div>
                  <p>Carbohydrate:</p>
                  <p>
                    <strong>{recipe?.nutritionFacts.totalCarbohydrate} g</strong>
                  </p>
                </div>
                <div>
                  <p>Fat:</p>
                  <p>
                    <strong>{recipe?.nutritionFacts.totalFat} g</strong>
                  </p>
                </div>
                <div>
                  <p>Protein:</p>
                  <p>
                    <strong>{recipe?.nutritionFacts.protein} g</strong>
                  </p>
                </div>
                <div>
                  <p>Cholesterol:</p>
                  <p>
                    <strong>{recipe?.nutritionFacts.cholesterol} mg</strong>
                  </p>
                </div>

              </div>

              <div className="blog-comment">
                <h3>{comments?.length} Comments</h3>
                <hr />
                <ul className="comments">
                  {comments?.map((comment: any) => (
                    <li key={comment.commentId}>
                      <div className="post-comments">
                        <p className="meta">Dec 1, 2018 &#8212;
                          <a href="#">{comment.applicationUser.name}</a> says : <i className="pull-right"></i>
                        </p>
                        <p>
                          {comment.value}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="reply">
                  <h3>Leave a Reply</h3>
                  <p className="comment-form-comment">
											<textarea
                        className="form-control"
                        id="comment"
                        name="comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        cols={45}
                        rows={5}
                        aria-required="true"
                      />
                  </p>
                  <p className="form-submit">
                    <input
                      onClick={handleSubmit}
                      className="btn btn-submit btn-block" name="submit" type="submit"
                      id="submit" value="Post Comment"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipeDetailPage
