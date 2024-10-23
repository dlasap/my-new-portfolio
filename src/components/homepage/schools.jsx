import React from "react";
import { faSchoolFlag } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Schools = () => {
	return (
		<div className="works">
			<Card
				icon={faSchoolFlag}
				title="Schools"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="./usc-logo.png"
								alt="fullscale"
								className="work-image"
							/>
							<div className="work-title">
								University of San Carlos
								<span className="work-place">
									Cebu, Philippines
								</span>
							</div>
							<div className="work-subtitle">
								<span>College, Elementary</span>
							</div>
							<div className="work-duration">
								2003-2011, 2015-2020
							</div>
						</div>

						<div className="work">
							<img
								src="./fugen-logo.jpg"
								alt="fugen-logo"
								className="work-image"
							/>
							<div className="work-title">
								Future Generation Philippines
								<span className="work-place">
									Kingdom of Saudi Arabia
								</span>
							</div>
							<div className="work-subtitle">High School</div>
							<div className="work-duration">2012 - 2014</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Schools;
