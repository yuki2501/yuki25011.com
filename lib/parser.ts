import JsYaml from "js-yaml";
import * as MdAst from "mdast";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
type RawYaml = {
  value: string;
};

export type Frontmatter = {
  title: string;
  tags: string[];
  date: Date;
};

export type Post = {
  mdast: MdAst.Root;
  frontmatter: Frontmatter;
  filename: string;
};

export const parser: (src: string, filename: string) => Promise<Post> = async (
  src,
  filename
) => {
  const compiler = unified()
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkGfm)
    .use(remarkParse);
  const parsedmd = compiler.parse(src);
  return {
    mdast: parsedmd,
    frontmatter: JsYaml.load(
      (parsedmd.children[0] as RawYaml).value
    ) as Frontmatter,
    filename,
  };
};
