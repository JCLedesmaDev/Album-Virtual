"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("config"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const headersHandler_1 = require("./middlewares/headersHandler");
// import swaggerSetup from "./docs/swagger";
function startServer(PORT) {
    const app = (0, express_1.default)();
    app.use((0, morgan_1.default)(config_1.default.get('logger')));
    app.use(express_1.default.json()); //--> Comprende mensajes JSON
    app.use((0, cors_1.default)({ origin: '*' }));
    app.use(headersHandler_1.headersHandler); // Definimos como manejamos todos los datos provenientes del headers
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running in ${config_1.default.util.getEnv("NODE_ENV")} at ${config_1.default.get('server.public_url')}${PORT}`);
    });
    app.use('/api', index_routes_1.default);
    // app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup))
}
exports.default = {
    startServer
};
//# sourceMappingURL=server.js.map