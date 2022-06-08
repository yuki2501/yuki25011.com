import { PreviewMd } from "../components/markdown";
import { Post } from "../lib/parser";
import { chakra, useColorModeValue } from "@chakra-ui/react";
import TagButtons from "./tags";
import Link from "next/link";
import React from "react";

type Props = {
  post: Post;
};
export const Preview: React.FC<Props> = (props: Props) => {
  const title = props.post.frontmatter.title;
  const date = props.post.frontmatter.date;
  const tags = props.post.frontmatter.tags;
  const dateColor = useColorModeValue("gray.600", "gray.400");
  const linkcolor = useColorModeValue("cyan.800", "cyan.200");
  return (
    <>
      <chakra.div display="flex" flexDir="column">
        <Link href={`/blog/${props.post.filename}`} passHref={true}>
          <chakra.a fontSize="5xl" fontFamily="mono" fontWeight="bold">
            {title}
          </chakra.a>
        </Link>
        <TagButtons tags={tags} />
        <PreviewMd mdast={props.post.mdast} />
        <Link href={`/blog/${props.post.filename}`} passHref={true}>
          <chakra.a color={linkcolor} fontWeight="medium">
            もっと読む
          </chakra.a>
        </Link>
        <chakra.text fontWeight="bold" fontSize="medium" color={dateColor}>
          {date.toString()}
        </chakra.text>
      </chakra.div>
    </>
  );
};
