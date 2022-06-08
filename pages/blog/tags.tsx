import {  chakra,  Wrap, WrapItem } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Header from "../../components/header";
import { getTags } from "../../lib/posts";

export type Props = {
  tags: string[]
}

const Tags: React.FC<Props>  = (props:Props) => {
  return (
  <chakra.div display="flex" alignItems="center" flexDir="column" w="full">
    <Head>
    <title>tags</title>
    <meta name="description" content="yuki25011 blog" />
    <meta name="lang" content="ja" />
    <meta property="og:title" content="tags"/>
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="yuki25011.com" />

    </Head>
    <chakra.div w="full" fontSize={{base: "md",lg: "lg"}} p={5} width={{base:"90%",md: "70%"}}>

    <Header />
    <main>
      <chakra.h1 fontSize="4xl" fontWeight="bold" m = {3}>Tags</chakra.h1>
      <Wrap spacing="15px" flexDir="row">
      {props.tags.map((tag) => (
      <>
        <WrapItem key={tag}>
        <Link href={`/blog/tags/${tag}`} passHref={true}> 
        <chakra.a fontWeight="bold"> # {tag} </chakra.a> 
        </Link>
        </WrapItem>
      </>
        ))}
      </Wrap>
    </main>
      
    </chakra.div>
  </chakra.div>
      );
}; 


export async function getStaticProps(){
  const tags = await getTags()
  return{
    props: {
      tags,
    }
  }
}

export default Tags;
