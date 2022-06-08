import { Box, chakra, VStack } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { sortedPosts } from "../lib/posts";
import Header from "../components/header";
import { Preview } from "../components/preview";
import { Post } from "../lib/parser";
export type Props = {
  PostInfos: Post[];
};

const Blog: React.FC<Props> = (props: Props) => {
  const postinfos = props.PostInfos;
  return (
    <chakra.div display="flex" alignItems="center" flexDir="column" w="full">
      <Head>
        <title>Blog</title>
        <meta name="description" content="yuki25011 Blog" />
        <meta name="lang" content="ja"/>
        <meta property="og:title" content="blog" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="yuki25011.com" />

      </Head>
      <chakra.div
        w="full"
        fontSize={{ base: "md", lg: "lg" }}
        p={5}
        width={{ base: "90%", md: "70%" }}
      >
        <Header />
        <main>
          <chakra.h1 fontSize="6xl" fontWeight="bold" >
            Posts
          </chakra.h1>
          <VStack flexDir="column" spacing={"100"} align="stretch">
            {postinfos.map((postinfo) => (
              <Box key={postinfo.frontmatter.title}>
                <Preview post={postinfo} />
              </Box>
            ))}
          </VStack>
        </main>
      </chakra.div>
    </chakra.div>
  );
};

export async function getStaticProps() {
  const posts = await sortedPosts();
  return {
    props: {
      PostInfos: posts,
    },
  };
}

export default Blog;
