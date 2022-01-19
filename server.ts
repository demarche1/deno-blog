import { Application, Relationships } from "./deps.ts";
import { User, UserKeys, ApiToken } from "./Models/index.ts";
import router from "./routes/index.ts";
import db from "./db/connector.ts";

Relationships.belongsTo(UserKeys, User);

db.link([User, UserKeys, ApiToken]);
// db.sync({ drop: true });

const app: Application = new Application();

router.init(app);
