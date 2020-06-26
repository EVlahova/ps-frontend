import React from "react";

import RecipeItem from "./RecipeItem";
import useFetch from "../hooks/useFetch"

const AllRecipes = () => {
	const { data: recipes } = useFetch("/recipes")

	return <>
		<div className="list">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<h5><i className="fa fa-cutlery" aria-hidden="true"/> List Recipes</h5>
					</div>

					{recipes?.map((rec: any) => <RecipeItem key={rec.recipeId} recipe={rec} />)}

				</div>
			</div>
		</div>
		</>
}

export default AllRecipes;
