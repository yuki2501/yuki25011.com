import {  chakra, Divider, ListItem, Spacer, Text, UnorderedList,  VStack, Wrap, WrapItem } from "@chakra-ui/react";
import Head from "next/head";
/* import * as MdAst from "mdast"; */
import Header from "../components/header";
import React from "react";
import {ServiceIcon} from "../components/service_icon";
import { AiFillGithub, AiFillMail  } from "react-icons/ai";
import {  FaBlog, FaKeybase } from "react-icons/fa";
import Image from "next/image";
import {TimeLineBullet} from "../components/timeline_bullet";
// type Props = {
//   mdast: MdAst.Root;
// };
function HomePage() {
  return (
    <chakra.div
      display="flex"
      alignItems="center"
      width={"100%"}
      flexDir={"column"}
    >
      <Head>
        <title>yuki25011.com</title>
        <meta property="lang" content="ja" />
        <meta name="description" content="yuki25011 profile" />
        <meta property="og:title" content="yuki25011.com" />
        <meta property="og:type" content="web site" />
        <meta property="og:site_name" content="yuki25011.com" />
        <meta
          property="og:description"
          content="yuki25011's personal web site"
        />
      </Head>
      <chakra.main
        p={5}
        fontSize={{ base: "md", md: "lg" }}
        width={{ base: "90%", md: "70%" }}
      >
        <Header />
        <VStack spacing="5">
        <chakra.div textAlign="center" >
        <Image src="/icon.jpg" alt={"yuki25011's icon image"} width="250" height="250"  style={{ borderRadius: "9999px", }}/>
        </chakra.div>
        <Text fontSize="5xl" fontWeight="bold" textAlign="center">{"yuki25011"}</Text>
        <Text fontSize="3xl" fontWeight="medium" textAlign="center">{"Saito Yuki"}</Text>
        <Text fontSize="3xl" fontWeight="medium" textAlign="center">{"Graduate student(M1)"}</Text>
      <Spacer />
      <Divider />
      <Spacer />
      <Wrap spacing="40px" justify="center">
      <WrapItem>
      <ServiceIcon service_name="GitHub" ServiceIcon={AiFillGithub} ServiceIconColor="" Servicelink="https://github.com/yuki2501" service_userid="yuki2501" TextForButton="Follow"/>  
      </WrapItem>
      <WrapItem>
      <ServiceIcon service_name="Keybase"  ServiceIcon={FaKeybase} ServiceIconColor={"cyan.400"} Servicelink="https://keybase.io/yuki25011" service_userid="yuki25011" TextForButton="Follow" />
      </WrapItem>
      <WrapItem>
      <ServiceIcon service_name="Mail" ServiceIcon={AiFillMail} Servicelink="mailto:me@yuki25011.com" ServiceIconColor={"tomato"} service_userid={"me@here"} TextForButton="Send" />
      </WrapItem>
      <WrapItem>
      <ServiceIcon service_name="Blog" ServiceIcon={FaBlog} ServiceIconColor={"green.300"} Servicelink="/blog" service_userid="/blog" TextForButton="Read" /> 
      </WrapItem>
      </Wrap>
      <Spacer />
      <Divider />
      <Spacer />
      <Text fontSize="5xl" fontWeight="bold">{"My TimeLine"}</Text>
      <UnorderedList spacing={"4"}>
      <ListItem>
      <TimeLineBullet timeline_date="2020.04" timeline_content="東北大学工学部 電気情報物理工学科入学" />
      </ListItem>
      <ListItem>
      <TimeLineBullet timeline_date="2021.08~2021.09" timeline_content="いい生活 サマーインターン参加" />
      </ListItem>
      <ListItem>
      <TimeLineBullet timeline_date="2022.08" timeline_content="セキュリティ・キャンプ2022 DB自作コース参加" />
      </ListItem>
      <ListItem>
      <TimeLineBullet timeline_date="2022.05~2023.03" timeline_content="RAとして音声合成用webアプリケーションのフロントエンド担当" />
      </ListItem>
      <ListItem>
      <TimeLineBullet timeline_date="2024.03" timeline_content="PPL2024 ポスター発表" />
      </ListItem>
      <ListItem>
      <TimeLineBullet timeline_date="2024.08" timeline_content="日本経済新聞 サマーインターン参加" />
      </ListItem>
      <ListItem>
      <TimeLineBullet timeline_date="2024.08" timeline_content="Dely株式会社 サマーインターン参加" />
      </ListItem>
      <ListItem>
      <TimeLineBullet timeline_date="2024.09" timeline_content="PKSHA Technology サマーインターン参加" />
      </ListItem>
      </UnorderedList>
      </VStack>

      </chakra.main>
    </chakra.div>
  );
}

export default HomePage;
