const app = require("./api/server");

const port = process.env.PORT || 6000;

app.listen(port, console.log(`Server listening on ${port}`));
