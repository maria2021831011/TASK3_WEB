const app = require('./app');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Task Manager API running at http://localhost:${PORT}`);
});
