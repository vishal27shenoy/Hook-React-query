import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import {RecoilRoot} from "recoil";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ChakraProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  </QueryClientProvider>
);
