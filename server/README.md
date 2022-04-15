# Finance App Backend:

### Description:
A finance app's backend built with the tools and concepts of the MERN tech stack. Responsible for managing, storing, and sorting user data in a MongoDB
database. The project is hosted on an AWS server. This server-side API is built with Express on the Node.js runtime environment to communicate with the frontend and the database. In addition to establishing endpoints for fetching the relevant data for the frontend app, the backend is responsible for user authentication. This includes hashing passwords and delivering/authenticating JSW tokens. 

### TO DO:
- [x] [Set up Express server to include routers](https://github.com/meilseit/mern-finance-app/blob/master/server/server.js)
- [x] [Construct data base schema for MongoDB](https://github.com/meilseit/mern-finance-app/tree/master/server/models)
- [x] [New user router and hashing procedure](https://github.com/meilseit/mern-finance-app/blob/master/server/routes/registerRouter.js)
- [x] [Login router and user authentication procedure](https://github.com/meilseit/mern-finance-app/blob/master/server/routes/loginRouter.js)
- [x] [User data router with the relevent frontend endpoints](https://github.com/meilseit/mern-finance-app/blob/master/server/routes/userDataRouter.js)
- [x] Test endpoints before setting up frontend
- [ ] Build middleware function for verifying JWS tokens

### Technologies Used:
- Mongoose Module: for communication with the MongoDB data base
- CORS Module: middle wear for sending request to and from front end
- Bcrypt Module: for hashing and unhashing passwords
- Jsonwebtoken Module: unique idetifying web tokens to pass to the front end
- Express: web application framework for the backend
- Node: javascript runtime environment
- 


