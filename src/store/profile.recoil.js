import {atom} from 'recoil';

export const profileState = atom({
    key: 'profileState',
    default: {
        userName : "",
        email : "",
        token : "",
        _id :""
    },
  });

  