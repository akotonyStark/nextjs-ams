'use client'
import { Avatar, Flex, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import UserAccountPopover from "./UserAccountPopover";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  let loggedInUser: any = localStorage.getItem("auth");
  loggedInUser = JSON.parse(loggedInUser);

  const router = useRouter()
  const dispatch = useDispatch();
 

  const handleLogout = () => {
    console.log('logging out...')
    dispatch(logout());
    router.push('/login')
  };

  return (
    <Flex
      as={"nav"}
      alignItems={"center"}
      background={"#1a202c"}
      p={2}
      style={{ borderBottom: "5px solid teal" }}
    >
      <Heading size={"0.6em"} pl={5}>
        Article Management System
      </Heading>
      <Spacer />

      <HStack spacing={"20px"}>
        <Text>{loggedInUser?.email}</Text>
        <UserAccountPopover handleLogout={handleLogout}>
          <Avatar src={""} bg={"teal"} name={loggedInUser?.email}/>
        </UserAccountPopover>
      </HStack>
    </Flex>
  );
};

export default Navbar;
