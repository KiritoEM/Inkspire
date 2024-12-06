import app from "server";

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
