import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import "./styles/project.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";

const Project = (props) => {
	const {
		logo: logos,
		title,
		description,
		linkText,
		link,
		screenshots,
	} = props;

	console.log("project", props);
	// const [openDetails, setOpenDetails] = useState(false);

	return (
		<React.Fragment>
			<div className="project">
				{/* <Link to={link}> */}
				<div className="project-container">
					<div className="project-title">{title}</div>
					{screenshots?.length > 0 && (
						<div className="project-screenshot">
							<Carousel
								autoPlay
								showThumbs={false}
								// thumbWidth={100}
								dynamicHeight
								infiniteLoop
								showIndicators
								stopOnHover={true}
							>
								{(screenshots ?? []).map((ss) => {
									return (
										<div>
											<img
												alt={`${ss}-${title}`}
												src={ss}
												style={{
													maxHeight: "250px",
													width: "100%",
												}}
											/>
										</div>
									);
								})}
							</Carousel>
						</div>
					)}
					<div className="project-description">{description}</div>
					<div className="project-logo">
						{logos.map((logo) => {
							return (
								<img
									src={logo}
									alt="logo"
									width={40}
									height={40}
								/>
							);
						})}
					</div>
					<div className="project-link">
						<div className="project-link-icon">
							<FontAwesomeIcon icon={faLink} />
						</div>

						<div className="project-link-text">
							<Link
								to={link}
								target="_blank"
								className="project-link-text"
							>
								{linkText}
							</Link>
						</div>
					</div>
				</div>
				{/* </Link> */}
			</div>
		</React.Fragment>
	);
};

export default Project;
