import express from 'express';
import * as dontenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';

dontenv.config();

const app = express();
app.use(cors());
app.use(
	express.json({
		limit: '50mb',
	})
);

app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Hello World from DALL.E',
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
