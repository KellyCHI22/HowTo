import { Post } from '~/store/apis/postsApi';

export default function getSortedPosts(sortOption: string, posts: Post[]) {
  if (sortOption === 'latest') {
    const sortedPosts = [...posts].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    return sortedPosts;
  } else if (sortOption === 'oldest') {
    const sortedPosts = [...posts].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
    return sortedPosts;
  } else if (sortOption === 'popularity') {
    const sortedPosts = [...posts].sort(
      (a, b) => b.commentsCount + b.likesCount - a.commentsCount - a.likesCount
    );
    return sortedPosts;
  } else {
    return posts;
  }
}
