import { Input , InputGroup, InputLeftElement, Box,Text} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import React,{FC} from 'react';
import { color } from '../constants/constants';
import {custom_input} from "../types/types"
const CustomInput : FC<custom_input> = ({title,icon,placeholder,isError,fields,helperText,onBlur}) => {
  return (
    <Box width={{base:"100%",sm:"20.5rem"}}>
    <Text fontSize="0.75rem" color={isError ? color.DANGER : color.DARK}>{title}</Text>
    <InputGroup borderColor={isError ? color.DANGER : color.DARK} {...fields} onBlur={onBlur}>
      <InputLeftElement pointerEvents='none'>
        <Icon color={isError ? color.DANGER : color.DARK} as={icon}/>
      </InputLeftElement>
      <Input type='tel' borderRadius="0px" placeholder={placeholder} fontSize="12px"/>
    </InputGroup>
    {isError &&  <Text fontSize="0.75rem" color={color.DANGER}>{helperText}</Text>}
    </Box>
  )
}
export default CustomInput;
