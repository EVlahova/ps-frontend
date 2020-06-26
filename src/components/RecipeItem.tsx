import React from "react";
import { Link } from "react-router-dom"

interface Props {
	recipe: any
}

const RecipeItem: React.FC<Props> = ({ recipe }) => {
	return (
		<div className="col-lg-4 col-sm-6">
			<div className="box grid recipes">
				<div className="by"><i className="fa fa-user" aria-hidden="true"/> {recipe.user?.name}</div>
				<Link to={`/recipe/${recipe.recipeId}`}><img src={recipe.attachmentUrl} alt=""/></Link>
				<h2><Link to={`/recipe/${recipe.recipeId}`}>{recipe.name}</Link></h2>
				<p>{recipe.shortSummary}</p>
				<div className="tag">
					{recipe.tags.split(" ").map((tag: string) => (
						<a key={tag} href="#">{tag}</a>
					))}
				</div>
			</div>
		</div>
	)
}

export default RecipeItem;
