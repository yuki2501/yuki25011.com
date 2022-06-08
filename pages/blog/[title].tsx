import React from "react";
import Head from "next/head";
import TagButtons from "../../components/tags"
import {Md} from "../../components/markdown";
import  * as Parser   from "../../lib/parser";
import  * as Posts from "../../lib/posts";
import { GetStaticPropsContext  } from "next";
import { Box, chakra, Divider,  useColorModeValue } from "@chakra-ui/react";
import Header from "../../components/header";

type Props = {
    post: Parser.Post;
};

export default function Home(props: Props) {
  const dateColor = useColorModeValue("gray.600", "gray.400")
  return (
    <chakra.div display="flex" alignItems="center" flexDir="column" w="full" > 
      <Head>
        <title>{props.post.frontmatter.title}</title>
        <meta name="description" content="yuki25011 blog" />
        <meta name="lang" content="ja"/>
        <meta property="og:title" content={props.post.frontmatter.title} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="yuki25011.com" />
      </Head>
      <chakra.div
        w="full"
        p={5}
        fontSize={{ base: "base", lg: "lg" }}
        width={{ base: "90%", md: "70%" }}
      >

      <chakra.div key={props.post.filename}>
      <Header />
      </chakra.div>
        <main>
          <chakra.h1 fontSize="6xl" fontFamily="mono" fontWeight="bold" >
             {props.post.frontmatter.title}
          </chakra.h1>
          <Divider />
          <chakra.text fontWeight="bold" fontSize="medium" color={dateColor}>{props.post.frontmatter.date.toString()}</chakra.text> 
          <TagButtons tags={props.post.frontmatter.tags}/>
          <Box height="10"></Box>

      <chakra.div key={props.post.filename}>
          <Md mdast={props.post.mdast} />
          </chakra.div>
      </main>
      </chakra.div>
    </chakra.div>
  );
}

export async function getStaticPaths() {
  const articles = await Posts.sortedPosts();
  return {paths: articles.map((article) => `/blog/${article.filename}`),
    fallback: false,
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const params = ctx.params;
  if (params) {
    const post = await Posts.getPostById(params.title as string);
    return {
    props:{
      post,
    }};
  } else {
    return {
      notFound: true,
    };
  }
}
