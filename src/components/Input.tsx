import { Input , InputGroup, InputLeftElement, Box,Text} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import React,{FC} from 'react';
import {customInput} from "../types/types"
const CustomInput : FC<customInput> = ({title,icon,placeholder,isError,fields,helperText,onBlur}) => {
  return (
    <Box width={{base:"100%",sm:"20.5rem"}}>
    <Text fontSize="0.75rem" color={isError ? "color.danger" : "color.dark"}>{title}</Text>
    <InputGroup borderColor={isError ? "color.danger" : "color.dark"} {...fields} onBlur={onBlur}>
      <InputLeftElement pointerEvents='none'>
        <Icon color={isError ? "color.danger" : "color.dark"} as={icon}/>
      </InputLeftElement>
      <Input type='tel' borderRadius="0px" placeholder={placeholder} fontSize="12px"/>
    </InputGroup>
    {isError &&  <Text fontSize="0.75rem" color={"color.danger"}>{helperText}</Text>}
    </Box>
  )
}
export default CustomInput;
