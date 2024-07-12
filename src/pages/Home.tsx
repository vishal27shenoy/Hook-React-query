import React ,{useState}from "react";
import {  Grid, GridItem, theme } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { themeState } from "../store/theme.store";
import { useRecoilState } from "recoil";
const Home = () => {
    const [sidebar,setSidebar] = useState(false);
    const [theme, setTheme] = useRecoilState<string>(themeState);
  return (
    <Grid
      templateAreas={`"Navbar Navbar"
    "Sidebar main"
    "Sidebar main"`}
      gridTemplateRows={"3.75rem 1fr"}
      gridTemplateColumns={`${sidebar ? "10.875rem" : "3.4rem"} 1fr`}
      h="100vh"
      w="100vw"
    >
      <GridItem area={"Navbar"}>
        <Navbar setSidebar={setSidebar} sidebar={sidebar}/>
      </GridItem>
      <GridItem area={"Sidebar"}>
        <Sidebar sidebar={sidebar}/>
      </GridItem>
      <GridItem area={"main"} bg={theme === "dark" ? "color.darkMode" : "color.lightMode"}>
        <Outlet/>
      </GridItem>
    </Grid>
  );
};

export default Home;
