import React, { useEffect, useState } from "react";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { Flex, Text, Button, Image, Box } from "@chakra-ui/react";
import { CiSearch, CiSun } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiMoonThin } from "react-icons/pi";
import { useRecoilState } from "recoil";
import { themeState } from "../store/theme.store";
import { color } from "../constants/constants";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import CustomModal from "../common components/Modal";
import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";

const sidebarData = [
  {
    title: "Home",
    icon: AiOutlineHome,
    to: "/create",
  },
  {
    title: "Deleted",
    icon: MdOutlineDelete,
    to: "/deleted",
  },
  {
    title: "Edited",
    icon: MdEdit,
    to: "/edited",
  },
  {
    title: "History",
    icon: GoHistory,
    to: "/history",
  },
  {
    title: "Settings",
    icon: CiSettings,
    to: "/settings",
  },
];
const Sidebar = ({ sidebar }) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [currentTab, setCurrentTab] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(isOpen, onOpen, onClose);
  const profileImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    const tab = location.href.split("/");
    setCurrentTab(`/${tab[tab.length - 1]}`);
  }, []);
  return (
    <Flex
      flexDirection="column"
      py="1.25rem"
      h="calc(100vh - 3.75rem)"
      gap="1.25rem"
      w={sidebar ? "10.875rem" : "3.4rem"}
      bg={theme === "dark" ? color.DARK_MODE : color.LIGHT_MODE}
      color={theme === "dark" ? color.LIGHT_MODE : color.DARK_MODE}
      borderRight="solid lightgray 1px"
      overflow="hidden"
    >
      {sidebarData.map((item) => {
        return (
          <Link
            to={item?.to}
            key={item.title}
            onClick={() => setCurrentTab(item?.to)}
          >
            <Flex
              h="3.125rem"
              alignItems="center"
              cursor="pointer"
              _hover={{
                background: theme === "dark" ? color.DARK : color.LIGHT_HOVER,
              }}
              px="1.3rem"
              color={currentTab === item.to && color.HIGHLIGHT}
            >
              <Flex alignItems="center" mr="1.3rem">
                <Icon as={item.icon} h="1.125rem" w="1.125rem"/>
              </Flex>
              <Box>
                <Text>{item.title}</Text>
              </Box>
            </Flex>
          </Link>
        );
      })}
      <Flex
        h="3.125rem"
        alignItems="center"
        cursor="pointer"
        _hover={{
          background: theme === "dark" ? color.DARK : color.LIGHT_HOVER,
        }}
        px="1.3rem"
        mt="auto"
        onClick={onOpen}
      >
        <Flex alignItems="center" mr="1rem">
          <Icon as={CiLogout} />
        </Flex>
        <Box>
          <Text>Logout</Text>
        </Box>
      </Flex>

      <CustomModal isOpen={isOpen} onClose={onClose} h="1.125rem" w="1.125rem"/>
    </Flex>
  );
};

export default Sidebar;