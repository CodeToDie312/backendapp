const express = require('express');
const { developerEndpoints } = require("./endpoints/api");


const app = express();
const apiRouter = express.Router();
app.use(express.json());

app.use("/api", apiRouter);
developerEndpoints(app, apiRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
