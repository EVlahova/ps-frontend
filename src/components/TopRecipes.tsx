import React from "react";
import { Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"

const TopRecipes = () => {
	const { data: topRecipes } = useFetch("/recipes/top")

	return <>
		<div className="top">
			<div className="container">
				<div className="row">
					{topRecipes?.breakfast && (
						<div className="col-lg-4">
							<h5><i className="fa fa-cutlery" aria-hidden="true"/> Top Breakfast Recipes</h5>
							<div className="box clearfix">
								<Link to={`/recipe/${topRecipes?.breakfast.recipeId}`}><img src={topRecipes?.breakfast.attachmentUrl} alt=""/></Link>
								<h3><Link to={`/recipe/${topRecipes?.breakfast.recipeId}`}>{topRecipes?.breakfast.name}</Link></h3>
								<p>{topRecipes?.breakfast.shortSummary}</p>
							</div>
						</div>
					)}
					{topRecipes?.lunch && (
						<div className="col-lg-4">
							<h5><i className="fa fa-cutlery" aria-hidden="true"/> Top Lunch Recipes</h5>
							<div className="box clearfix">
								<Link to={`/recipe/${topRecipes?.lunch.recipeId}`}><img src={topRecipes?.lunch.attachmentUrl} alt=""/></Link>
								<h3><Link to={`/recipe/${topRecipes?.lunch.recipeId}`}>{topRecipes?.lunch.name}</Link></h3>
								<p>{topRecipes?.lunch.shortSummary}</p>
							</div>
						</div>
					)}
					{topRecipes?.dinner && (
						<div className="col-lg-4">
							<h5><i className="fa fa-cutlery" aria-hidden="true"/> Top Dinner Recipes</h5>
							<div className="box clearfix">
								<Link to={`/recipe/${topRecipes?.dinner.recipeId}`}><img src={topRecipes?.dinner.attachmentUrl} alt=""/></Link>
								<h3><Link to={`/recipe/${topRecipes?.dinner.recipeId}`}>{topRecipes?.dinner.name}</Link></h3>
								<p>{topRecipes?.dinner.shortSummary}</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
		</>
}

export default TopRecipes;
