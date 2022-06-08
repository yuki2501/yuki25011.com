import {
  chakra,
  Flex,
  Box,
  Spacer,
  IconButton,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";
import * as React from "react";
import { DrawerContents, MyDrawer } from "./drawer";
const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawercontents: DrawerContents = {};
  drawercontents.Blog = "/blog";
  drawercontents.Tags = "/blog/tags";
  drawercontents.About = "/";
  return (
    <>
      <Flex flexDir="row">
        <IconButton
          aria-label="Drawer"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        ></IconButton>
        <MyDrawer
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          placement="left"
          drawerName="Menu"
          drawercontents={drawercontents}
        ></MyDrawer>
        <Box width="10px" />
        <chakra.header
          display="flex"
          flexDir="row"
          justifyContent="space-between"
        >
          <chakra.span fontSize="xl" fontWeight="extrabold">
            <Link href={"/"}>{`yuki25011.com`}</Link>
          </chakra.span>
        </chakra.header>
        <Spacer />
        <Box>
          <IconButton
            mb={5}
            icon={
              colorMode === "light" ? (
                <SunIcon color="orange.400" boxSize="6" />
              ) : (
                <MoonIcon color="yellow.300" boxSize="6" />
              )
            }
            aria-label="DarkMode Switch"
            onClick={toggleColorMode}
          >
            <chakra.span fontSize="medium" fontWeight="medium">
              {colorMode === "light" ? "to Dark" : "to Light"}
            </chakra.span>
          </IconButton>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
