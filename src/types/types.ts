import { object } from "prop-types";
import { IconType } from 'react-icons';
import React ,{FocusEventHandler}from "react";
export interface register_data {
    userName : string;
    email : string;
    password : string;
    confirmPassword? : string;
}

export interface decoded_data  {
    userName : string;
    email : string;
    token : string;
    _id : string;
}

export interface error_type {
    name: string;
    message: string;
    stack?: string;
}

export interface custom_input {
    title : string,
    icon : IconType,
    placeholder : string,
    isError : boolean,
    fields : object,
    helperText : string,
    onBlur : FocusEventHandler<HTMLInputElement>,
}

export interface modal_type  {
    isOpen : boolean;
    onClose : () => void;
}

export interface login_data {
    email : string;
    password : string
}

export interface sidebar_props {
    setSidebar : React.Dispatch<React.SetStateAction<boolean>>;
    sidebar : boolean; 
}

export interface error_response {
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