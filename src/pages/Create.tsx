import React, { useState } from "react";
import { Flex, Button, Icon, useDisclosure,Text } from "@chakra-ui/react";
import { IoAddSharp } from "react-icons/io5";
import InputModal from "../components/InputModal";
import { userTodo } from "../types/types";
import { themeState } from "../store/theme.store";
import { useRecoilState } from "recoil";

const Create = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data,setData] = useState<userTodo[]>([])
  const [theme, setTheme] = useRecoilState<string>(themeState);

  const handleData = (values : userTodo) => {
    console.log(values);
    setData((prev) => [...prev,values]);
  }
  return (
    <Flex p="1.25rem" position="relative" height="100%">
      <Flex flexWrap="wrap">
      {
        data?.length > 0 && data?.map((item,index) => {
          return(
            <Flex key={index} flexDirection="column" boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;" p="1rem" m=".5rem" w="15.625rem" h="10.5rem" borderRadius="0.625rem" color={theme === "dark" ? "color.lightMode" : "color.dark"} bg={theme === "dark" ? "color.dark" : "color.light"}>
              <Flex>
              <Text>Title : {item?.title}</Text>
              </Flex>
              <Flex>
              <Text>Description : {item?.description}</Text>
              </Flex>
            </Flex>
          )
        })
      }
      </Flex>
      <InputModal isOpen={isOpen} onClose={onClose} handleData={handleData}/>
      <Button
        position="absolute"
        right="1.87rem"
        bottom="1.87rem"
        size="none"
        bg="color.secondaryButton"
        borderRadius="50%"
        height="2.5rem"
        width="2.5rem"
        zIndex="5"
        _hover="none"
        onClick={onOpen}
      >
        <Icon as={IoAddSharp} size={30} color="color.lightMode" />
      </Button>
    </Flex>
  );
};

export default Create;
