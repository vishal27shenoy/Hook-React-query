import {
  Button,
  Text,
  ModalCloseButton,
  ModalContent,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React,{FC} from "react";
import { useNavigate } from "react-router-dom";
import { themeState } from "../store/theme.store";
import { useRecoilState } from "recoil";
import { color } from "../constants/constants";
import { modal_type } from "../types/types";

const CustomModal : FC<modal_type>  = ({ isOpen, onClose }) => {
  const [theme] = useRecoilState(themeState);
  const navigation = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    navigation("/login", { replace: true });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={theme === "dark" ? color.DARK_MODE : color.LIGHT_MODE}
        color={theme === "dark" ? color.LIGHT_MODE : color.DARK_MODE}
      >
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
          <Button
            variant="ghost"
            onClick={handleLogout}
            color={theme === "dark" ? color.LIGHT_MODE : color.DARK_MODE}
          >
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
