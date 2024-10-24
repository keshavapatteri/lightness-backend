

import express from 'express';
import v1Router from './v1/index.js'; // Importing the v1 router

const apiRouter = express.Router();

// Use v1Router for routes starting with /api/v1
apiRouter.use('/v1', v1Router);

export default apiRouter;
