import React from "react";
import Head from "next/head";
import  * as Parser   from "../../../lib/parser";
import  * as Posts from "../../../lib/posts";
import { GetStaticPropsContext  } from "next";
import { Box, chakra, VStack } from "@chakra-ui/react";
import Header from "../../../components/header";
import {Preview} from "../../../components/preview";

type Props = {
    posts: Parser.Post[];
    tag: string;
};

export default function Home(props: Props) {
  return (
    <chakra.div display="flex" alignItems="center" flexDir="column" w="full">
      <Head>
        <title>tag:#{props.tag}</title>
        <meta name="lang" content="ja" />
        <meta name="description" content="yuki25011 blog" />
        <meta property="og:title" content={props.tag} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="yuki25011.com" />
      </Head>
      <chakra.div
        w="full"
        p={5}
        fontSize={{ base: "base", lg: "lg" }}
        width={{ base: "90%", md: "70%" }}
      >
      <Header />
        <main>
          <chakra.h1 fontSize="4xl" fontFamily="mono" fontWeight="bold" my={4}>
           tag:#{props.tag}
          </chakra.h1>
          <VStack spacing={"100"} align={"stretch"}>
           {props.posts.map((post) => (
             <Box key={post.filename}>
             <Preview post={post} />
             </Box>
            ))}
          </VStack>
        </main>
      </chakra.div>
    </chakra.div>
  );
}

export async function getStaticPaths() {
  const tags = await Posts.getTags();
  return {paths: tags.map((tag) => `/blog/tags/${tag}`),
    fallback: false,
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const params = ctx.params;
  if (params) {
    const posts = await Posts.getPostsByTag(params.tag as string);
    return {
    props:{
      posts,
      tag: params.tag as string
    }};
  } else {
    return {
      notFound: true,
    };
  }
}
