import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReduce";

//creacion del store
const store = configureStore({
    reducer: rootReducer,
});

export default store;