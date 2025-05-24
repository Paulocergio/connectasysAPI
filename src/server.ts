import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRoutes } from './modules/users/api/routes/userRoutes';
import { swaggerSpec, swaggerUi } from './infrastructure/swagger/swagger';
import { customerRoutes } from './modules/Customer/api/routes/customerRoutes';  
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/Users', userRoutes);
app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

app.get('/swagger.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


app.get('/', (_, res) => {
  res.redirect('/swagger/');
});


app.use('/api/v1/Customers', customerRoutes);


app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ Server running at http://localhost:${process.env.PORT || 3000}`);
});
