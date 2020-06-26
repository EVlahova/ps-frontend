import React from "react";
import Header from "../components/Header";
import TopRecipes from "../components/TopRecipes";
import AllRecipes from "../components/AllRecipes";
import Slider from "../components/Slider";

const HomePage = () => {
	return (
		<>
			<Header/>
			<Slider/>
			<TopRecipes/>
			<AllRecipes/>
		</>
	);
}

export default HomePage
