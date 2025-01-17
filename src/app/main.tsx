import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store/store";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider value={defaultSystem}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
