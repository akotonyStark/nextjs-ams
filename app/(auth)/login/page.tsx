'use client'
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const Login = () => {

  const user = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    onSubmit: (values) => {
      // store user's auth in local storage on success
      let userData = {email: values.email, token: 'some jwt auth token would be stored from api response if this was an api call'}
      localStorage.setItem('auth',JSON.stringify(userData))
      dispatch(login(values))
    }
  });
  
  useEffect(() => {
    if(user.isAuthenticated){
      router.push('/articles')
    }
  }, [user])

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" width={400}>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              onChange={formik.handleChange}
              isChecked={formik.values.rememberMe}
              colorScheme="purple"
            >
              Remember me?
            </Checkbox>
            <Button type="submit" colorScheme="teal" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}


export default Login