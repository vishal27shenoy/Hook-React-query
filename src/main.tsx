import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import {RecoilRoot} from "recoil";
import { theme } from "./constants/themes";
import React from "react";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  </QueryClientProvider>
);
