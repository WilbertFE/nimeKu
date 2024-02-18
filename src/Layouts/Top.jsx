import Energy from "../Fragments/Home/Energy";
import Profile from "../Fragments/Home/Profile";
import Premium from "../Fragments/Home/Premium";
import Search from "../Fragments/Home/Search";
import NavMenu from "../Fragments/Home/NavMenu";
import LastAnime from "../Fragments/Home/LastAnime";
import Genres from "../Fragments/Home/Genres";

const Top = () => {
  return (
    <section id="top" className="pt-8">
      <div className="container">
        <div className="flex flex-wrap">
          <Energy />
          <Profile />
          <Premium />
          <Search />
          <NavMenu />
          <LastAnime />
          <Genres />
        </div>
      </div>
    </section>
  );
};
export default Top;
