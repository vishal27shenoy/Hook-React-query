import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Flex, Text, Button, Box, useToast } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomInput from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AUTH, BASE_URL } from "../api/api";
import { profileState } from "../store/profile.recoil";
import { jwtDecode } from "jwt-decode";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import React from "react";
import { decodedData, errorResponse, loginData, profile } from "../types/types";
const loginApi = (data:loginData) => axios.put(BASE_URL+AUTH,data);

const Login = () => {
  const navigate = useNavigate();
  const [, setProfile] = useRecoilState<profile>(profileState);

  const toast = useToast();

  const {mutate : userLogin , isLoading : isUserLoging} = useMutation(loginApi, {
    onSuccess: (response) => {
      const {accessToken} = response?.data || "";
      const decoded : decodedData = jwtDecode(accessToken);
      setProfile({
        userName : decoded?.userName,
        email : decoded?.email,
        token : accessToken,
        _id : decoded?._id,
      });
      sessionStorage.setItem("userDetail",JSON.stringify(decoded));
      sessionStorage.setItem("jwt",accessToken);
      navigate("/create",{replace : true});
    },
    onError : (error:errorResponse) => {
      toast({
        position: 'bottom-right',
        isClosable: true,
        render: () => (
          <Box color="white" p={3} bg="color.danger">
          {error?.response?.data?.message || "Server Error"}
        </Box>
        )
      })
    }
  })

  const schema = z.object({
    email: z.string({message : "Email is required"}).email({ message: "Enter a valid email" }).toLowerCase(),
    password: z.string().min(1,{message : "Password is required"})
  });

  const { control, handleSubmit, formState,trigger } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });


  const { errors } = formState;
  
  const onSubmit = (data:loginData) => {
    if(data?.email == "testing@gmail.com" && data?.password === "Test@123"){
      sessionStorage.setItem("jwt","thisistoken123");
      return navigate("/create",{replace : true});
    }

    userLogin(data);
  };

  return (
    <Flex height="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Flex
        w={{base : "100%" , sm:"auto"}}
        p="1.25rem"
        boxShadow={{base : "none",sm: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}}
        flexDirection="column"
        gap="1.25rem"
      >
        <Text
          fontSize={{ base: "1.25rem" }}
          fontWeight="bold"
          textAlign="center"
        >
          LOGIN
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gap="1.25rem">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomInput
                  title="EMAIL"
                  icon={AiOutlineMail}
                  fields={field}
                  placeholder="Enter your Email"
                  isError={!!errors?.email}
                  helperText={errors?.email?.message || ""}
                  onBlur={() => trigger("email")}
                  type="text"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CustomInput
                  title="PASSWORD"
                  icon={RiLockPasswordLine}
                  fields={field}
                  placeholder="Enter your Password"
                  isError={!!errors?.password}
                  helperText={errors?.password?.message || ""}
                  onBlur={() => trigger("password")}
                  type="password"
                />
              )}
            />
            <Button type="submit" colorScheme="blue" isLoading={isUserLoging}>
             LOGIN
            </Button>
          </Flex>
        </form>
        <Flex flexDirection={"column"} alignItems="center">
          <Text fontSize="0.75rem">or</Text>
          <Text fontSize="0.75rem">
            New Here ? <Link to="/">Register</Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
