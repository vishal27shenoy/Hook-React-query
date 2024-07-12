import { Flex, Switch, Icon, Box } from "@chakra-ui/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { color } from "../constants/constants";
import { themeState } from "../store/theme.store";
import { CiMenuFries } from "react-icons/ci";
import React,{FC} from "react";
import { sidebar_props } from "../types/types";
const Navbar : FC<sidebar_props> = ({ setSidebar, sidebar }) => {
  const [theme, setTheme] = useRecoilState(themeState);
  return (
    <Flex
      h="3.75rem"
      w="100%"
      alignItems="center"
      bg={theme === "dark" ? color.DARK_MODE : color.LIGHT_MODE}
      color={theme === "dark" ? color.LIGHT_MODE : color.DARK_MODE}
      px="1.25rem"
      borderBottom="solid lightgray 1px"
    >
      <Flex>
        <Box cursor="pointer" onClick={() => setSidebar(!sidebar)}>
          <Icon as={CiMenuFries} />
        </Box>
      </Flex>
      <Flex ml="auto" gap="1.25rem">
        <Switch
          size="md"
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          cursor="pointer"
        />
        <Icon as={FaRegCircleUser} size="40px" w={5} h={5} cursor="pointer" />
      </Flex>
    </Flex>
  );
};

export default Navbar;
