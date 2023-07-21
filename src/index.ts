import app from './app';
import config from '../config/default';

const PORT = config.app.port;
console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server started 🚀 on port ${PORT}`);
});
