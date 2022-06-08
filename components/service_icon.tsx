import { Button, Icon, Spacer, Text, VStack  } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type Props = {
  service_name: string,
  service_userid: string,
  ServiceIcon: IconType,
  ServiceIconColor: string,
  ButtonColor?: string,
  Servicelink: string,
  TextForButton: string,
}

export const ServiceIcon: React.FC<Props> = (props:Props) => {
    return(
    <VStack>
    <Icon as={props.ServiceIcon} boxSize={"16"} color={props.ServiceIconColor}/>
    <Text fontSize={'4xl'} fontWeight={"bold"}>{props.service_name}</Text>
    <Text fontSize={'3xl'} fontWeight={"bold"}>{props.service_userid} </Text>
    <Spacer />
    <Link href={props.Servicelink} passHref={true}>
    <Button fontSize={'3xl'} fontWeight={"bold"} colorScheme={props.ButtonColor} >{props.TextForButton}</Button>
    </Link>
    </VStack>
    )
} 
