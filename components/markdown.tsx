import {
  Center,
  chakra,
  Divider,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as MdAst from "mdast";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Unist from "unist";

export type Props = {
  mdast: MdAst.Root;
};


function hasImage(ast: Unist.Node): boolean {
  if (ast.type === "image") return true;
  switch (ast.type) {
    case "heading":
    case "paragraph": {
      const parent = ast as MdAst.Parent;
      return parent.children.some(hasImage);
    }
    default:
      return false;
  }
}

function AstToComponent(ast: Unist.Node, key = 0): React.ReactElement | string | null {
  const colorLinkSelected = useColorModeValue("black", "white");
  const colorLinkUnSelected = useColorModeValue("cyan.800", "cyan.200");
  const inlineCodeBgColor = useColorModeValue("green.100", "green.900");
  const quotebgcolor = useColorModeValue("gray.100", "gray.700");
  const quotedsentencecolor = useColorModeValue("black.100", "gray.200");

  switch (ast.type) {
    case "heading": {
      const heading = ast as MdAst.Heading;
      switch (heading.depth) {
        case 1:
          return (
            <chakra.div key={key}>
              <chakra.h1
                fontSize="4xl"
                mb={2}
                mt={4}
                fontWeight="semibold"
                fontFamily="mono"
              >
                {heading.children.map(AstToComponent)}
              </chakra.h1>
              <Divider />
            </chakra.div>
          );
        case 2:
          return (
            <chakra.div key={key}>
              <chakra.h2
                fontSize="3xl"
                mb={2}
                mt={6}
                fontWeight="semibold"
                fontFamily="mono"
              >
                {heading.children.map(AstToComponent)}
              </chakra.h2>
            </chakra.div>
          );
        case 3:
          return (
            <chakra.div key={key}>
              <chakra.h3
                fontSize="2xl"
                mb={2}
                mt={5}
                fontWeight="semibold"
                fontFamily="mono"
              >
                {heading.children.map(AstToComponent)}
              </chakra.h3>
            </chakra.div>
          );
        case 4:
          return (
            <chakra.h4
              key={key}
              fontSize="xl"
              mb={2}
              mt={4}
              fontWeight="semibold"
              fontFamily="mono"
            >
              {heading.children.map(AstToComponent)}
            </chakra.h4>
          );
        case 5:
          return (
            <chakra.h5
              key={key}
              fontSize="lg"
              mb={2}
              mt={4}
              fontWeight="semibold"
              fontFamily="mono"
            >
              {heading.children.map(AstToComponent)}
            </chakra.h5>
          );
        case 6:
          return (
            <chakra.h6
              key={key}
              fontSize="medium"
              mb={2}
              mt={4}
              fontWeight="semibold"
              fontFamily="mono"
            >
              {heading.children.map(AstToComponent)}
            </chakra.h6>
          );
      }
      break;
    }
    case "image": {
      const img = ast as MdAst.Image;
      const alt = img.alt ? img.alt : "";
      const altMatched = /(\d+),(\d+):/.exec(alt);
      if (altMatched) {
        const w = parseInt(altMatched[1], 10);
        const h = parseInt(altMatched[2], 10);
        return <Image key={key} src={img.url} width={w} height={h} alt={alt} />;
      } else {
        return (
          <Image key={key} src={img.url} width={100} height={100} alt={alt} />
        );
      }
    }
    case "text": {
      const text = ast as MdAst.Text;
      return text.value;
    }
    case "paragraph": {
      const paragraph = ast as MdAst.Paragraph;
      if (hasImage(paragraph)) {
        return (
          <chakra.div key={key} my={2}>
            {paragraph.children.map(AstToComponent)}
          </chakra.div>
        );
      } else {
        return (
          <chakra.div key={key}>
            <chakra.p key={key} my={2} lineHeight={7}>
              {paragraph.children.map(AstToComponent)}
            </chakra.p>
          </chakra.div>
        );
      }
    }
    case "list": {
      const list = ast as MdAst.List;
      if (list.ordered) {
        return (
          <chakra.ol key={key} pl={2} listStyleType="decimal">
            {list.children.map(AstToComponent)}
          </chakra.ol>
        );
      } else {
        return (
          <chakra.ul key={key} pl={2} listStyleType="disc">
            {list.children.map(AstToComponent)}
          </chakra.ul>
        );
      }
    }
    case "listItem": {
      const listitem = ast as MdAst.ListItem;
      return <li key={key}>{listitem.children.map(AstToComponent)}</li>;
    }
    case "link": {
            const link = ast as MdAst.Link;
      if (link.url.startsWith("/")) {
        return (
          <Link key={key} href={link.url} passHref={true}>
            <chakra.a
              color={colorLinkUnSelected}
              _hover={{
                color: colorLinkSelected,
                fontsize: "medium",
                textDecor: "underline",
              }}
            >
              {link.children.map(AstToComponent)}
            </chakra.a>
          </Link>
        );
      } else {
        return (
          <chakra.a
            textDecor="underline"
            color={colorLinkUnSelected}
            _hover={{
              color: colorLinkSelected,
              fontsize: "medium",
            }}
            key={key}
            href={link.url}
          >
            {link.children.map(AstToComponent)}
          </chakra.a>
        );
      }
    }
    case "inlineCode": {
      const inlineCode = ast as MdAst.InlineCode;
      return (
        <chakra.span
          key={key}
          fontFamily="mono"
          bgColor={inlineCodeBgColor}
          p={1}
          rounded="sm"
        >
          {inlineCode.value}
        </chakra.span>
      );
    }
    case "strong": {
      const text = ast as MdAst.Strong;
      return (
        <chakra.text fontWeight="bold" key={key}>
          {text.children.map(AstToComponent)}
        </chakra.text>
      );
    }
    case "blockquote": {
      const quotedsentence = ast as MdAst.Blockquote;
            return (
        <Flex bg={quotebgcolor} flexDir="row" key={key}>
          <Center width="10px" bg={"blue.300"} />
          <Center width="30px" />
          <Text
            fontStyle="italic"
            fontSize="medium"
            color={quotedsentencecolor}
          >
            {quotedsentence.children.map(AstToComponent)}
          </Text>
          <Center width="30px" />
        </Flex>
      );
    }

    case "emphasis": {
      const text = ast as MdAst.Emphasis;
      return (
        <chakra.text fontStyle="italic" key={key}>
          {text.children.map(AstToComponent)}
        </chakra.text>
      );
    }
    case "yaml": {
      return null;
    }

    default:
      return <span key={key}>unsupported type {ast.type}</span>;
  }
}

export const Md: React.FC<Props> = (props: Props) => {
  const rootChildren = props.mdast.children;
  return (
    <chakra.div key={props.mdast.type}>
      {rootChildren.map(AstToComponent)}
    </chakra.div>
  );
};

export const PreviewMd: React.FC<Props> = (props: Props) => {
  const children = props.mdast.children;
  const rootChildrenforPreview = props.mdast.children.slice(
    0,
    children.length < 6 ? children.length : 6
  );
  return (
    <chakra.div key={props.mdast.type}>
      {rootChildrenforPreview.map(AstToComponent)}
    </chakra.div>
  );
};
