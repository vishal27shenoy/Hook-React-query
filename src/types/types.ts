import { IconType } from 'react-icons';
import React ,{FocusEventHandler}from "react";
export interface registerData {
    userName : string;
    email : string;
    password : string;
    confirmPassword? : string;
}

export interface decodedData  {
    userName : string;
    email : string;
    token : string;
    _id : string;
}

export interface errorType {
    name: string;
    message: string;
    stack?: string;
}

export interface customInput {
    title : string,
    icon : IconType,
    placeholder : string,
    isError : boolean,
    fields : object,
    helperText : string,
    onBlur : FocusEventHandler<HTMLInputElement>,
    type : string;
}

export interface modalType  {
    isOpen : boolean;
    onClose : () => void;
    handleData : (values:userTodo) => void;
}

export interface loginData {
    email : string;
    password : string
}

export interface sidebarProps {
    setSidebar : React.Dispatch<React.SetStateAction<boolean>>;
    sidebar : boolean; 
}

export interface errorResponse {
    response?: {
      data?: {
        message?: string;
      };
    };
  }
  
export interface profile {
    userName : string;
    email : string;
    token : string;
    _id : string;
}


export interface userTodo {
    title :string;
    description : string;
}