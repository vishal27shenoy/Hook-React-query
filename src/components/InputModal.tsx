import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React,{FC, useState} from "react";
import { modalType } from "../types/types";

const InputModal :  FC<modalType>  = ({ isOpen, onClose,handleData }) => {

  const [title,setTitle] = useState<string>("");
  const [desc,setDesc]  = useState<string>("");


  const handleClick = () => {
    handleData({title:title,description : desc});
    setDesc("");
    setTitle("");
    onClose();
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>CREATE YOUR TODO</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input placeholder="Description" onChange={(e) => setDesc(e.target.value)}/>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClick}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default InputModal;
