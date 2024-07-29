'use client'
import { GridItem, Grid } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store'
import Login from "../(auth)/login/page";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const {isAuthenticated} = useSelector((state: RootState) => state.auth)
    let userData:any = localStorage.getItem('auth')
    userData = JSON.parse(userData)
    
    //const user = false
    return isAuthenticated || userData?.token ? 
    ( <>
        <Grid
          templateAreas={`"header header"
                    "nav main"
                    "nav footer"`}
          gridTemplateColumns={"1fr 5fr"}
        >
          <GridItem area={"header"} color={"white"}>
            <Navbar />
          </GridItem>
          <GridItem area={"nav"} height={"100vh"}>
            <Sidebar />
          </GridItem>
          <GridItem area={"main"}>{children}</GridItem>
        </Grid>
      </>) : <Login/>

 
};

export default AppLayout;
