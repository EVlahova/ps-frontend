import React from "react";

const Slider = () => {
	return(
		<>
			<div id="myCarousel" className="carousel slide" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#myCarousel" data-slide-to="0" className=""/>
					<li data-target="#myCarousel" data-slide-to="1" className="active"/>
					<li data-target="#myCarousel" data-slide-to="2" className=""/>
				</ol>
				<div className="carousel-inner">
					<div className="carousel-item">
						<img className="first-slide" src="images/recipe1-1920x600.jpg" alt="First slide"/>
							<div className="container">
								<div className="carousel-caption text-left">
									<h1><a href="recipe/test1">The Classic Burger Recipe</a></h1>
									<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi
										porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id
										elit.</p>
									<p><a className="btn btn-lg btn-primary" href="recipe/test1" role="button">Read
										more</a></p>
								</div>
							</div>
					</div>
					<div className="carousel-item active">
						<img className="second-slide" src="images/recipe2-1920x600.jpg" alt="Second slide"/>
							<div className="container">
								<div className="carousel-caption">
									<h1><a href="recipe/test2">Spanish Mac &amp; Cheese</a></h1>
									<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi
										porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id
										elit.</p>
									<p><a className="btn btn-lg btn-primary" href="recipe/test2" role="button">Read
										more</a></p>
								</div>
							</div>
					</div>
					<div className="carousel-item">
						<img className="third-slide" src="images/recipe3-1920x600.jpg" alt="Third slide"/>
							<div className="container">
								<div className="carousel-caption text-right">
									<h1><a href="recipe/test3">Skillet Scalloped Potatoes</a></h1>
									<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi
										porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id
										elit.</p>
									<p><a className="btn btn-lg btn-primary" href="recipe/test3" role="button">Read
										more</a></p>
								</div>
							</div>
					</div>
				</div>
				<a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"/>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"/>
					<span className="sr-only">Next</span>
				</a>
			</div>
		</>
	)
}

export default Slider;
