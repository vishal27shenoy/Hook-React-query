import React from "react";
import { Flex, Button, Icon, useDisclosure } from "@chakra-ui/react";
import { IoAddSharp } from "react-icons/io5";
import { color } from "../constants/constants";
import InputModal from "../common components/InputModal";

const Create = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex p="1.25rem" position="relative" height="100%">
      <InputModal isOpen={isOpen} onClose={onClose}/>
      <Button
        position="absolute"
        right="1.87rem"
        bottom="1.87rem"
        size="none"
        bg={color.SECONDARY_BUTTON}
        borderRadius="50%"
        height="2.5rem"
        width="2.5rem"
        zIndex="5"
        _hover="none"
        onClick={onOpen}
      >
        <Icon as={IoAddSharp} size={30} color={color.LIGHT_MODE} />
      </Button>
    </Flex>
  );
};

export default Create;
