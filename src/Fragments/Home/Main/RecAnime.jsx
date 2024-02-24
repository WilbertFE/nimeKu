// import icons
import { FaAngleRight } from "react-icons/fa6";
// import react
import { useEffect, useState } from "react";
import AnimeCard from "../../AnimeCard";

const RecAnime = () => {
  const [recAnime, setRecAnime] = useState(null);

  useEffect(() => {
    const fetchDataSequentially = async () => {
      const backoffDelay = 1000;
      const maxRetries = 5;
      let retries = 0;

      const fetchDataWithRetry = async (url) => {
        try {
          const response = await fetch(url);
          let data = null;
          if (response.status === 200) {
            data = await response.json();
          } else {
            throw new Error("Some error has happened");
          }
          return data.data;
        } catch (error) {
          console.log(error.message);
          if (retries < maxRetries) {
            retries++;
            await new Promise((resolve) =>
              setTimeout(resolve, backoffDelay * retries)
            );
            return fetchDataWithRetry(url);
          } else {
            throw new Error("Max retries exceeded");
          }
        }
      };
      // fetch RecAnime
      const recAnime = await fetchDataWithRetry(
        "https://api.jikan.moe/v4/top/anime?sfw=true&filter=favorite&limit=25"
      );
      setRecAnime(recAnime);
    };
    fetchDataSequentially();
  }, []);

  return (
    <div className="w-full flex flex-wrap pb-32">
      <div className="w-full flex">
        <h1 className="text-white font-bold text-xl mb-4 px-4">
          Rekomendasi Anime
        </h1>
        <div className="flex-1 flex items-center justify-end relative -top-1 px-4">
          <h3 className="text-white font-bold text-xs">Lihat Semua</h3>
          <FaAngleRight className="text-white w-[20px] h-[20px]" />
        </div>
      </div>
      <div className="hide-scrollbar flex overflow-auto gap-x-3 px-4">
        {recAnime &&
          recAnime.map((anime) => (
            <div key={anime.mal_id} className="min-w-[150px] flex flex-col">
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                width="150px"
                isNew={false}
                isPopular={false}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecAnime;
