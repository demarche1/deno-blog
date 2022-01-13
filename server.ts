import { Application, Relationships } from "./deps.ts";
import { User, UserKeys } from "./Models/index.ts";
import router from "./routes/index.ts";
import db from "./db/connector.ts";

Relationships.belongsTo(UserKeys, User);

db.link([User, UserKeys]);
db.sync({ drop: true });

const app: Application = new Application();

// const user = await User.where("id", "1").keys();

// console.log(user);

router.init(app);
