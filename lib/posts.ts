import fs from "fs";
import path from "path";

import { parser, Post } from "./parser";
const postDir = path.join(process.cwd(), "posts");
export type Posts = Post[];

export const sortedPosts: () => Promise<Posts> = async () => {
  const postNames: string[] = fs.readdirSync(postDir);
  const posts: Promise<Post>[] = postNames.map(async (filename) => {
    const filePath = path.join(postDir, filename);
    const fileId = filename.replace(".md", "");
    const rawPost = fs.readFileSync(filePath).toString();
    const parsedPost: Post = await parser(rawPost, fileId);
    return parsedPost;
  });
  const settledPosts: Posts = await Promise.all(posts);
  return settledPosts.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getPostById: (id: string) => Promise<Post> = async (id) => {
  const filepath = path.join(postDir, `${id}.md`);
  const fileContent = fs.readFileSync(filepath).toString();
  const parsedPost = await parser(fileContent, id);
  return parsedPost;
};

export const postIds: () => string[] = () => {
  const Paths = fs.readdirSync(postDir);
  return Paths.map((filename) => filename.replace("/.md$/", ""));
};

export const getTags: () => Promise<string[]> = async () => {
  const posts = await sortedPosts();
  const frontmatters = posts.map((post) => post.frontmatter);

  return frontmatters
    .map((frontmatter) => frontmatter.tags)
    .flat()
    .filter((elem: string, index: number, array: string[]) => {
      return array.indexOf(elem) === index;
    });
};

export const getPostsByTag: (tag: string) => Promise<Posts> = async (tag) => {
  const posts = await sortedPosts();
  return posts.filter((post) => post.frontmatter.tags.includes(tag));
};
