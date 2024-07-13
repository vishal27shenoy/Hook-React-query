import React, { useState } from "react";
import { Flex, Button, Icon, useDisclosure, Text,Box, useToast } from "@chakra-ui/react";
import { IoAddSharp } from "react-icons/io5";
import InputModal from "../components/InputModal";
import { themeState } from "../store/theme.store";
import { useRecoilState,  } from "recoil";
import axios from "axios";
import { BASE_URL } from "../api/api";
import { useMutation, useQuery } from "react-query";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
const getTodos = (id) => axios.get(BASE_URL + "todo/" + id);
const removeTodos = (id, data) => axios.patch(BASE_URL + "todo/" + id, data);

const Create = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [theme, setTheme] = useRecoilState<string>(themeState);
  const profile = JSON.parse(sessionStorage.getItem("userDetail") || "");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [update, setUpdate] = useState(false);
  const [todoId, setTodoId] = useState("");
  const toast = useToast();

  const {
    data: todo,
    refetch,
} = useQuery("todos", () => getTodos(profile._id), {
  });

  const { mutate: removeData, isLoading: isDeleting, } = useMutation(
    (data) => removeTodos(profile._id, data),
    {
      onSuccess: (response) => {
        handleRefetch()
      },
      onError: (error) => {
        toast({
          position: 'bottom-right',
          isClosable: true,
          render: () => (
            <Box color="white" p={3} bg="color.danger">
           Something went wrong
          </Box>
          )
        })
      },
    }
  );

  const handleDelete = async(todoId) => {
    console.log(todoId);
    const value = { notesId: todoId };
    removeData(value);
  };

  const handleEdit = (_id, title, description) => {
    setTitle(title);
    setDescription(description);
    setUpdate(true);
    setTodoId(_id);
    onOpen();
  };


  const handleRefetch = () => {
    refetch();
  } 

  return (
    <Flex p="1.25rem" position="relative" height="100%">
      <Flex flexWrap="wrap">
        {todo?.data?.data?.map((item, index) => {
          return (
            <Flex
              key={item?._id}
              flexDirection="column"
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
              p="1rem"
              m=".5rem"
              w="15.625rem"
              h="10.5rem"
              borderRadius="0.625rem"
              color={theme === "dark" ? "color.lightMode" : "color.dark"}
              bg={theme === "dark" ? "color.dark" : "color.light"}
            >
              <Flex overflow="scroll">
                <Text>Title : {item?.title}</Text>
              </Flex>
              <Flex flex={1} overflow="scroll">
                <Text>Description : {item?.description}</Text>
              </Flex>
              <Flex justifyContent="end" gap="1rem">
                <Icon
                  as={MdEdit}
                  onClick={() =>
                    handleEdit(item?._id, item?.title, item?.description)
                  }
                />
                <Icon
                  as={MdOutlineDeleteOutline}
                  onClick={() => handleDelete(item?._id)}
                />
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <InputModal
        isOpen={isOpen}
        onClose={onClose}
        refetch={handleRefetch}
      />

      {
        update && <InputModal
        isOpen={isOpen}
        onClose={onClose}
        editTitle={title}
        editDescription={description}
        update={update}
        editingId={todoId}
        setUpdate={setUpdate}
        refetch={handleRefetch}
       
      />
      }

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
