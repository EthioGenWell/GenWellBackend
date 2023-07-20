import app from './app.ts';
import config from '../config/default';

const port = config.app.port;

app.listen(port, () => {
  `Server started 🚀 on port ${PORT}`;
});
