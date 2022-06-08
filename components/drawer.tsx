import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  chakra,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
export type DrawerContents = {
  [link: string]: string;
};

export type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  placement: "right" | "left";
  drawerName: string;
  drawercontents: DrawerContents;
};
export const MyDrawer: React.FC<Props> = (props: Props) => {
  return (
    <chakra.div key={props.drawerName}>
      <Drawer
        placement={props.placement}
        onClose={props.onClose}
        isOpen={props.isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Text fontSize="3xl">{props.drawerName}</Text>
          </DrawerHeader>
          <DrawerBody>
            {Object.keys(props.drawercontents).map((name) => {
              return (
                <Box key={name} height="45px">
                  <Link
                    key={name}
                    href={props.drawercontents[`${name}`]}
                    passHref={true}
                  >
                    <chakra.a fontSize="2xl">{name}</chakra.a>
                  </Link>
                </Box>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </chakra.div>
  );
};
