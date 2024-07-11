import React ,{useState}from "react";
import { Flex, Text, Button, Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Main from "./Main"
import { Outlet } from "react-router-dom";
const Home = () => {
    const [sidebar,setSidebar] = useState(false);
    
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
      <GridItem area={"main"} >
        <Outlet/>
      </GridItem>
    </Grid>
  );
};

export default Home;
