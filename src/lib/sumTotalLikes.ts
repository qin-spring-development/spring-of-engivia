export const sumTotalLikes = (joinUsersLength: number, totalLikes: number) => {
  const sumTotalLikes =
    (Math.round((totalLikes / joinUsersLength) * 5) * 10) / 10;
  return sumTotalLikes;
};
