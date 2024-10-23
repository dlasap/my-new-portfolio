const INFO = {
	main: {
		title: "Dom's Portfolio",
		name: "Dominic Gabriel Lasap",
		email: "lasapdominic@gmail.com",
		logo: "../logo.png",
	},

	socials: {
		github: "https://github.com/dlasap",
		linkedin:
			"https://www.linkedin.com/in/dominic-gabriel-lasap-07655a199/",
		facebook: "https://facebook.com/dominiclasap",
	},

	homepage: {
		title: "Full-stack Web Developer, Computer Engineer and Gamer.",
		description:
			"Hey, I'm Dom, a versatile front-end and back-end developer focused on feature implementation and system enhancements. I am skilled in transforming user stories into actual features through efficient programming with best practices and rigorous debugging, and I am committed to building scalable applications that prioritize performance and user experience.",
	},

	about: {
		title: "I’m Dominic Gabriel Lasap, living in the Philippines, where I do my best work.",
		description:
			"I've worked on alot of client projets, with alot of client project teams, mostly international clients around the world, and locally, collaborating and having fun in achieving the end goal. I am open to feedback, new ideas and criticisms to further my knowledge, and grow as an aspiring engineer.",
	},

	articles: {
		title: "I'm passionate about pushing the boundaries of what's possible and inspiring the next generation of innovators.",
		description:
			"Chronological collection of my long-form thoughts on programming, leadership, product design, and more.",
	},

	projects: [
		{
			title: "AI Shorts - Video Generator for Real Estate",
			description:
				"Worked on an AI Shorts application for real-estate products for a client. My work primarily focused on interpreting figma designs, to seamless UI and UX, ensuring responsiveness, feature implementation, and improvements. Challenging tasks I’ve encountered here include Video Effects/ Transitions, Markdown Implementation and Manipulation, Image Resizing, Image and Text Repositioning, and API route configuration for our NextJS App. Overall, I greatly enjoyed working here, while learning a lot of things from work and my colleagues.",
			logo: [
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/typescript/typescript.png",
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png",
				"https://static.cdnlogo.com/logos/r/63/react.svg",
				"https://static.cdnlogo.com/logos/n/80/next-js.svg",
				"https://static.cdnlogo.com/logos/t/34/tailwind-css.svg",
				"https://static.cdnlogo.com/logos/o/38/openai.svg",
				"https://static.cdnlogo.com/logos/f/43/figma.svg",
				"https://static.cdnlogo.com/logos/j/28/jira.svg",
			],
			linkText: "View App",
			link: "https://app.tensixty.ai/",
			project_screenshots: [
				"/ai-shorts-ss.png",
				"/ai-shorts-ss-3.png",
				"/ai-shorts-ss-5.png",
				"/ai-shorts-ss-4.png",
				"/ai-shorts-ss-6.png",
				"/ai-shorts-ss-2.png",
				"/ai-shorts-ss-7.png",
				"/ai-shorts-ss-8.png",
				"/ai-shorts-ss-9.png",
			],
		},

		{
			title: "LendingStandard - Multifamily Loan CRM App",
			description:
				"Contributed to a project focused on multifamily loan services, aimed at streamlining the online lending process. Utilized ReactJS, CSS, Java, MongoDB, and Docker in an Agile environment. Initially tasked with bug fixes, quickly transitioned to handling features and components based on mockups and JIRA criteria, ensuring timely delivery of assigned tickets.",
			logo: [
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png",
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/java/java.png",
				"https://static.cdnlogo.com/logos/r/63/react.svg",
				"https://static.cdnlogo.com/logos/c/85/css10.svg",
				"https://static.cdnlogo.com/logos/m/25/mongodb.svg",
				"https://static.cdnlogo.com/logos/d/41/docker.svg",
				"https://static.cdnlogo.com/logos/j/28/jira.svg",
			],
			linkText: "Link to business",
			link: "https://app.multifamilydebt.com/",
			project_screenshots: [
				"/ls-ss-1.png",
				"/ls-ss-2.png",
				"/ls-ss-3.png",
			],
		},

		{
			title: "AI Web Apps - Bot/Appsheet Apps/PDF Generator",
			description:
				"Started as a sole web developer for an RCM (Reliability Centered Maintenance) engineering business. Developed an AI Bot Web Application (powered by NextJS, OpenAI, NodeJS) to receive inputs from the designated users/engineers and then have them post-processed by AI, using our engineered prompts, after receiving the AI response, I then display the appropriate responses through Tables, PDFs, texts which can be exported via PDFs.Shortly after developing the AI Bot, we explored no code platform development design, where I learned to utilize and make apps out of Google AppSheet, with Google AppScript and Google Drive support. I made an app, where RCM data are displayed on the frontend, from a Google Sheet database, and added features like generating PDFs to the user and adding tables to represent correlated data. It was a challenging yet fulfilling task to learn a new platform but I had a great time learning it and was able to utilize its Scripting feature (Google AppScript) to run JavaScript functions called by triggered events on AppSheet. Finally, I’ve also tried Mobile Application deployments on Google Dev Console.",
			logo: [
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png",
				"https://static.cdnlogo.com/logos/r/63/react.svg",
				"https://static.cdnlogo.com/logos/c/85/css10.svg",
				"https://static.cdnlogo.com/logos/n/80/next-js.svg",
				"https://static.cdnlogo.com/logos/o/38/openai.svg",
				"https://static.cdnlogo.com/logos/g/12/google-apps-script.svg",
				"https://static.cdnlogo.com/logos/g/92/google-apps.svg",
				"https://static.cdnlogo.com/logos/v/78/vercel.svg",
			],
			linkText: "Deployed app link",
			link: "https://reliability-management-frontend.vercel.app/analysis_bot/new",
			project_screenshots: [
				"/rcm-ss-1.png",
				"/rcm-ss-2.png",
				"/rcm-ss-3.png",
				"/rcm-ss-4.png",
				"/rcm-ss-5.png",
				"/rcm-ss-6.png",
				"/rcm-ss-7.png",
				"/rcm-ss-8.png",
			],
		},

		{
			title: "Business Templates Builder",
			description:
				"Worked on a client project to create a user-friendly web editor for small businesses, enabling document customization (e.g., payroll templates). Proficient in Next.js, Figma, and Mantine UI, with a focus on CSS styling. Implemented Single Sign-On (SSO), developed dashboard features, and conducted ReCaptcha validation. Engaged in both frontend and backend tasks using Ruby on Rails, actively participated in daily scrums, and consistently resolved tickets on time.",
			logo: [
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png",
				"https://static.cdnlogo.com/logos/r/63/react.svg",
				"https://static.cdnlogo.com/logos/c/85/css10.svg",
				"https://static.cdnlogo.com/logos/j/28/jira.svg",
				"https://static.cdnlogo.com/logos/f/43/figma.svg",
				"https://static.cdnlogo.com/logos/m/57/microsoft-azure.svg",
			],
			linkText: "Link to business",
			link: "https://trsexpress.com/",
			project_screenshots: [
				"/trs-ss-1.png",
				"/trs-ss-2.png",
				"/trs-ss-3.png",
				"/trs-ss-4.png",
			],
		},
		{
			title: "Plannet - Intinerary App ",
			description:
				"Participated in a project using React and Node.js to showcase planners’ itineraries worldwide. Responsible for frontend and backend tasks, including component implementation, bug fixing, and backend testing, delivering results smoothly within a short timeframe.",
			logo: [
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png",
				"https://static.cdnlogo.com/logos/r/63/react.svg",
				"https://static.cdnlogo.com/logos/c/85/css10.svg",
				"https://static.cdnlogo.com/logos/j/28/jira.svg",
			],
			linkText: "Link to business",
			link: "https://plannet.io/",
			project_screenshots: ["/planet-ss-1.png", "/planet-ss-2.png"],
		},
		{
			title: "GoRentals - CRM App for managing luxury vehicles",
			description: `Full-Stack Development Training
				Trained in full-stack development with a focus on JavaScript, building functional applications using React for the front end and Node.js + Express for the back end, with RethinkDB as the database. Successfully defended our projects in front of senior developers.
				
				Frontend Development (Post-Training)
				Assigned to the frontend team, specializing in TypeScript and ReactJS. Responsible for implementing pre-built components and addressing post-testing issues. Identified and resolved data inconsistencies due to conflicting data types affecting asynchronous behavior.

				Database Team Transition
				Moved to the database team based on my aptitude for data handling. Tasks included troubleshooting database and API issues, assisting frontend developers with API access, and implementing multiple services:
				Migration Service: Developed a script for data migration between instances.
				Resync Service: Monitored database synchronization and provided notifications for inconsistencies, with the capability to re-synchronize databases.
				Email Service: Implemented email notifications using SendGrid.
`,
			logo: [
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
				"https://static.cdnlogo.com/logos/r/63/react.svg",
				"https://static.cdnlogo.com/logos/n/80/next-js.svg",
				"https://static.cdnlogo.com/logos/t/34/tailwind-css.svg",
				"https://static.cdnlogo.com/logos/n/57/nestjs.svg",
				"https://static.cdnlogo.com/logos/r/49/rethinkdb.svg",
			],
			linkText: "Link to business",
			link: "https://www.gorentals.com/",
		},
		{
			title: "Filinvest - Multiproperty Web Apps",
			description:
				"Worked on upgrading the client’s website on real estate, to utilize NextJS as its frontend and Tailwind CSS Styling. Fixed UI multiple UI issues on responsiveness, adding missing features, fixing search queries and paginations, and maintaining codebase on Git.",
			logo: [
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
				"https://static.cdnlogo.com/logos/r/63/react.svg",
				"https://static.cdnlogo.com/logos/n/80/next-js.svg",
				"https://static.cdnlogo.com/logos/t/34/tailwind-css.svg",
			],
			linkText: "Link to business",
			link: "https://filinvest.com/",
		},
		{
			title: "CRM App - Real Estate Showrooms and Assets",
			description:
				"Initially focused on a CRM App for a real estate company, to manage its products, customers, users, and properties. Our app was built on VueJS and tailwindCSS, with Google Auth, and FireBase database. Built a dashboard and appropriate tables for data and management, as well as managed the FireBase data. I was an all-around developer here, directly attending daily meetings with the owner and team.",
			logo: [
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
				"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png",
				"https://static.cdnlogo.com/logos/t/34/tailwind-css.svg",
				"https://static.cdnlogo.com/logos/f/30/firebase.svg",
				"https://static.cdnlogo.com/logos/v/84/vue-js.svg",
			],
			linkText: "Link to business",
			link: "https://www.1clickdesign.com/virtual_showroom",
		},
	],
};

export default INFO;
