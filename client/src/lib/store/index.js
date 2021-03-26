import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import web3Middleware from "../middlewares/web3Middleware";
import logger from "../middlewares/logger";
import Article from "../../contracts/Article.json";

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  }) || compose;

const contracts = [Article]; /* add contracts json here */

const middlewares = [web3Middleware(contracts), logger()];
export default createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
