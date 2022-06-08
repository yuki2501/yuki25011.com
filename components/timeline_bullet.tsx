import {HStack, Text, useColorModeValue} from "@chakra-ui/react";
import React from "react";

type Props = {
  timeline_date: string,
  timeline_content: string,
}

export const TimeLineBullet : React.FC<Props> = (props) => {
  const bgColor = useColorModeValue("green.100","green.900")
    return (
    <HStack spacing="30px">
    <Text bgColor={bgColor} fontSize="xl" fontWeight="bold">{props.timeline_date}</Text>
    <Text fontSize="xl" fontWeight="bold">{props.timeline_content}</Text>
    </HStack>
    )
}

