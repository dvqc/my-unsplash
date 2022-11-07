import useSWR from "swr";

const useLike = async (photoId: string) => {
  let data;
  await fetch(`/api/like/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ photoId })
  })
    .then((r) => r.json())
    .then((resData) => (data = { ...resData }));
  return data;
};

export default useLike;
