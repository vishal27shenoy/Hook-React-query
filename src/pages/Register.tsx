import { Flex, Text, Button, Box } from "@chakra-ui/react";
import CustomInput from "../common components/Input";
import { CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {  Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query"
import { AUTH, BASE_URL } from "../api/api";
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { profileState } from "../store/profile.recoil";
import { useRecoilState, } from "recoil";
import { color } from "../constants/constants";
import React from "react";
import { decoded_data,error_response, profile, register_data } from "../types/types";

const registerApi = (data : register_data) => axios.post(BASE_URL+AUTH,data);

const Register = () => {
  const navigate = useNavigate();
  const [, setProfile] = useRecoilState<profile>(profileState);
  const toast = useToast();

  const {mutate : userRegister , isLoading : isUserSiging} = useMutation(registerApi, {
    onSuccess: (response) => {
      const {accessToken} = response?.data || "";
      const decoded : decoded_data = jwtDecode(accessToken);
      setProfile({
        userName : decoded?.userName,
        email : decoded?.email,
        token : accessToken,
        _id : decoded?._id,
      });
      sessionStorage.setItem("jwt",accessToken)
      navigate("/create",{replace : true});
    },
    onError : (error:error_response) => {
      const errorMessage : string = error?.response?.data?.message || "Server Error";
      toast({
        position: 'bottom-right',
        isClosable: true,
        render: () => (
        <Box color="white" p={3} bg={color.DANGER}>
          {errorMessage}
        </Box>
        )
      })
    }
  })


  const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/;
  const schema = z
    .object({
      userName: z
        .string()
        .min(1, { message: "Name is required" })
        .min(4, { message: "Length must be at least 4" })
        .max(10, { message: "must be less than 10" }),
      email: z.string().email({ message: "Enter a valid email" }),
      password: z
        .string()
        .min(8, { message: "Password length must be 8" })
        .regex(passwordRegex, {
          message: "must contain A-Z ,a-z,0-9 and symbols",
        }),
      confirmPassword: z
        .string()
        .min(8, { message: "Password length must be 8" })
        .regex(passwordRegex, {
          message: "must contain A-Z ,a-z,0-9 and symbols",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const { control, handleSubmit, formState ,trigger} = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const onSubmit = (data : register_data) => {
    delete data?.confirmPassword;
    userRegister(data);
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
          REGISTER
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gap="1.25rem">
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <CustomInput
                  title="USERNAME"
                  icon={CiUser}
                  fields={field}
                  placeholder="Enter your Name"
                  isError={!!errors?.userName}
                  helperText={errors?.userName?.message || ""}
                  onBlur={() => trigger("userName")}
                />
              )}
            />

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
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <CustomInput
                  title="CONFIRM PASSWORD"
                  icon={RiLockPasswordLine}
                  fields={field}
                  placeholder="re-enter your Password"
                  isError={!!errors?.confirmPassword}
                  helperText={errors?.confirmPassword?.message || ""}
                  onBlur={() => trigger("confirmPassword")}
                />
              )}
            />
            <Button type="submit" colorScheme="blue" isLoading={isUserSiging}>
              REGISTER
            </Button>
          </Flex>
        </form>
        <Flex flexDirection={"column"} alignItems="center">
          <Text fontSize="0.75rem">or</Text>
          <Text fontSize="0.75rem">
            Already have an account ? <Link to="/login">Login</Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;
