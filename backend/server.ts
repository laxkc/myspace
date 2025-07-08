import app from "./app.ts";
import logger from "./src/utils/logger.ts";

const PORT = process.env.PORT || 3009;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});