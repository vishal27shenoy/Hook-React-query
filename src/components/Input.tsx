import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Text,
  InputRightElement,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { customInput } from "../types/types";
import { FaEyeSlash,FaEye } from "react-icons/fa";

const CustomInput: FC<customInput> = ({
  title,
  icon,
  placeholder,
  isError,
  fields,
  helperText,
  onBlur,
  type,
}) => {

  const [visible ,setVisible] = useState<boolean>(false);
  return (
    <Box width={{ base: "100%", sm: "20.5rem" }}>
      <Text fontSize="0.75rem" color={isError ? "color.danger" : "color.dark"}>
        {title}
      </Text>
      <InputGroup
        borderColor={isError ? "color.danger" : "color.dark"}
        {...fields}
        onBlur={onBlur}
      >
        <InputLeftElement pointerEvents="none">
          <Icon color={isError ? "color.danger" : "color.dark"} as={icon} />
        </InputLeftElement>
        <Input
          type={type === "password" && !visible ? "password" : "text"}
          borderRadius="0px"
          placeholder={placeholder}
          fontSize="12px"
        />
        {type === "password" && (
          <InputRightElement onClick={() => setVisible(!visible)}>
            <Icon as={visible ? FaEyeSlash : FaEye} />
          </InputRightElement>
        )}
      </InputGroup>
      {isError && (
        <Text fontSize="0.75rem" color={"color.danger"}>
          {helperText}
        </Text>
      )}
    </Box>
  );
};
export default CustomInput;
