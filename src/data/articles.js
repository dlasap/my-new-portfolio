import React from "react";

function article_1() {
	return {
		date: "7 May 2023",
		title: "AI Shorts for Real Estate",
		description: "app.tensixty.ai",
		keywords: [
			"AI Shorts Real Estate Software Developer",
			"Dominic Gabriel",
			"Dominic Gabriel L",
			"Dominic Gabriel Lasap",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">Content of article 1</div>
					<img
						src="https://picsum.photos/200/300"
						alt="random"
						className="randImage"
					/>
				</div>
			</React.Fragment>
		),
	};
}

function article_2() {
	return {
		date: "7 May 2023",
		title: "Artificial Intelligence Bot in RCM Studies",
		description:
			"https://reliability-management-frontend.vercel.app/analysis_bot/new",
		style: ``,
		keywords: [
			"Artificial Intelligence in Healthcare",
			"Dominic Gabriel",
			"Dominic Gabriel L",
			"Dominic Gabriel Lasap",
		],
		body: (
			<React.Fragment>
				<h1>Content of article 2</h1>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2];

export default myArticles;
