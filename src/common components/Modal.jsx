import {
  Button,
  Text,
  ModalCloseButton,
  ModalContent,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  background,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { themeState } from "../store/theme.store";
import { useRecoilState } from "recoil";
import { color } from "../constants/constants";

const CustomModal = ({ isOpen, onClose }) => {
  const [theme,] = useRecoilState(themeState);
  console.log(isOpen, "this is modal", onClose);
  const navigation = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    navigation("/login", { replace: true });
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent  bg={theme === "dark" ? color.DARK_MODE : color.LIGHT_MODE} color={theme === "dark" ? color.LIGHT_MODE : color.DARK_MODE}>
        <ModalHeader>
          <Text fontSize="18px" fontWeight="300">
            Do You Want to Logout ?
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleLogout} color={theme === "dark" ? color.LIGHT_MODE : color.DARK_MODE}>
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
