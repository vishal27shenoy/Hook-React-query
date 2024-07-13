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
import React, { FC, useState } from "react";
import { modalType } from "../types/types";
import { BASE_URL } from "../api/api";
import axios from "axios";
import { useMutation } from "react-query";

const addTodos = (id, data) => axios.post(BASE_URL + "todo/" + id, data);
const updateTodos = (id, data) => axios.put(BASE_URL + "todo/" + id, data);

const InputModal: FC<modalType> = ({
  isOpen,
  onClose,
  editTitle,
  editDescription,
  update,
  editingId,
  setUpdate,
  refetch
}) => {
  console.log(editTitle, editDescription);
  const profile = JSON.parse(sessionStorage.getItem("userDetail") || "");

  const { mutate: addData, isLoading } = useMutation(
    (data) => addTodos(profile._id, data),
    {
      onSuccess: (response) => {
        if (response?.status == 200) {
          setTitle("");
          setDesc("");
          refetch();
          onClose();
        }
      },
      onError: (error) => {},
    }
  );

  const { mutate: updateData, isLoading: isUpdated } = useMutation(
    (data) => updateTodos(profile._id, data),
    {
      onSuccess: (response) => {
        if (response?.status == 200) {
          setUpdate(false);
          setTitle("");
          setDesc("");
          refetch();
          onClose();
        }
      },
      onError: (error) => {},
    }
  );

  const [title, setTitle] = useState<string>(editTitle);
  const [desc, setDesc] = useState<string>(editDescription);

  const handleAdd = () => {
    const value = { title: title, description: desc };
    addData(value);
  };

  const handleUpdate = () => {
    const value = { title: title, description: desc, todoId: editingId };
    updateData(value);
  };
  return (
    <Modal isOpen={isOpen} onClose={() => {setTitle("");setDesc("");onClose()}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>CREATE YOUR TODO</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                update ?  handleUpdate() : handleAdd();
              }}
            }
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                update ?  handleUpdate() : handleAdd();
              }}
            }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={update ? handleUpdate : handleAdd}
            isLoading={isLoading || isUpdated}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default InputModal;
