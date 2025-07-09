import app from "./app";
import logger from "./src/utils/logger";

const PORT = process.env.PORT || 3009;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});