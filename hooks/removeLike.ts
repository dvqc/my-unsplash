import useSWR from "swr";

const removeLike = async (photoId: string) => {
  let data;
  await fetch(`/api/like/${photoId}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then((resData) => (data = { ...resData }));
  return data;
};

export default removeLike;
