import { Post } from '~/store/apis/postsApi';
import { User } from '~/store/apis/usersApi';

type UserInteractions = {
  likesCount: number;
  commentsCount: number;
  postsCount: number;
  followersCount: number;
  totalInteractions: number;
};

function getTopUsers(posts: Post[], users: User[], number: number) {
  // Step 1: Calculate likes, comments, posts, and followers count for each user
  const userLikesCount: Record<string, number> = {};
  const userCommentsCount: Record<string, number> = {};
  const userPostsCount: Record<string, number> = {};
  const userFollowersCount: Record<string, number> = {};

  posts?.forEach((post) => {
    const { authorId, likesCount, commentsCount } = post;

    if (userLikesCount[authorId]) {
      userLikesCount[authorId] += likesCount;
    } else {
      userLikesCount[authorId] = likesCount;
    }

    if (userCommentsCount[authorId]) {
      userCommentsCount[authorId] += commentsCount;
    } else {
      userCommentsCount[authorId] = commentsCount;
    }

    if (userPostsCount[authorId]) {
      userPostsCount[authorId]++;
    } else {
      userPostsCount[authorId] = 1;
    }
  });

  users?.forEach((user) => {
    const { uid, followers } = user;
    userFollowersCount[uid] = followers.length;
  });

  // Step 2: Combine likes, comments, posts, and followers count for each user
  const userInteractions: Record<string, UserInteractions> = {};

  for (const userId in userLikesCount) {
    const likesCount = userLikesCount[userId];
    const commentsCount = userCommentsCount[userId];
    const postsCount = userPostsCount[userId];
    const followersCount = userFollowersCount[userId];

    userInteractions[userId] = {
      likesCount,
      commentsCount,
      postsCount,
      followersCount,
      totalInteractions: likesCount + commentsCount,
    };
  }

  // Step 3: Sort users based on their total interactions
  const sortedUsers = Object.keys(userInteractions).sort(
    (userIdA, userIdB) =>
      userInteractions[userIdB].totalInteractions -
      userInteractions[userIdA].totalInteractions
  );

  // Step 4: Retrieve the top users with the highest likes and comments count
  const topUsersIds = sortedUsers.slice(0, number);
  const topUsers: User[] = [];
  for (const i in topUsersIds) {
    const userData = users?.find((user) => user.uid === topUsersIds[i]);
    topUsers.push(userData as User);
  }

  return topUsers;
}

export default getTopUsers;
