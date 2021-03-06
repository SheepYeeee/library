
import dva from "dva";
import "./index.less";


// 1. Initialize
const app = dva();


// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/global").default);
app.model(require("./models/auth").default);
app.model(require("./models/book").default);
app.model(require("./models/dashboard").default);
// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
