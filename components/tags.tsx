import React from "react";
import { chakra, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Link from "next/link";

export type Props = {
  tags: string[];
};

const TagButtons: React.FC<Props> = (props) => {
  const tags = props.tags;
  return (
    <chakra.div key={"tags"}>
      <Wrap spacing="15px" flexDir="row" >
        <WrapItem >
          <Text fontWeight="bold" fontSize="xl">
            Tags
          </Text>
        </WrapItem>
        {tags.map((tag) => {
          return (
            <WrapItem key={tag}>
              <Link href={`/blog/tags/${tag}`} passHref={true}>
                <chakra.a fontSize="xl" fontWeight="bold">
                  #{tag}
                </chakra.a>
              </Link>
            </WrapItem>
          );
        })}
      </Wrap>
    </chakra.div>
  );
};

export default TagButtons;
