import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="./fullscale-logo.jpeg"
								alt="fullscale"
								className="work-image"
							/>
							<div className="work-title">
								Full Scale
								<span className="work-place">
									Cebu, Philippines (Remote)
								</span>
							</div>
							<div className="work-subtitle">
								<span>Software Engineer</span>
							</div>
							<div className="work-duration">
								Jun 2022 - Present
							</div>
						</div>

						<div className="work">
							<img
								src="./dnamicro-logo.jpeg"
								alt="dnamicro-logo"
								className="work-image"
							/>
							<div className="work-title">
								DNA Micro
								<span className="work-place">
									Cebu, Philippines
								</span>
							</div>
							<div className="work-subtitle">
								Software Engineer
							</div>
							<div className="work-duration">
								May 2021 - Jun 2022
							</div>
						</div>

						<div className="work">
							<img
								src="./reliability-logo.png"
								alt="reliability-logo"
								className="work-image"
							/>
							<div className="work-title">
								Reliability Management
								<span className="work-place">
									United Kingdom (Remote)
								</span>
							</div>
							<div className="work-subtitle">
								Full Stack Developer
								<span className="work-type">(Part-Time)</span>
							</div>
							<div className="work-duration">
								Apr 2023 - Present
							</div>
						</div>

						<div className="work">
							<img
								src="./filinvestlogo.png"
								alt="filinvest-logo"
								className="work-image"
							/>
							<div className="work-title">
								Filinvest
								<span className="work-place">
									Philippines (Remote)
								</span>
							</div>
							<div className="work-subtitle">
								Frontend Developer
								<span className="work-type">(Part-Time)</span>
							</div>
							<div className="work-duration">
								Dec 2023 - Mar 2024
							</div>
						</div>

						<div className="work">
							<img
								src="./1cd-logo.png"
								alt="1cd-logo"
								className="work-image"
							/>
							<div className="work-title">
								1ClickDesign
								<span className="work-place">
									Philippines (Remote)
								</span>
							</div>
							<div className="work-subtitle">
								Frontend Developer
								<span className="work-type">(Part-Time)</span>
							</div>
							<div className="work-duration">
								Apr 2023 - Nov 2023
							</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
