// Move everything your old App.jsx rendered EXCEPT the nav bar and footer into this file.
// Adjust the import names/paths below to match your P3 components.
import Banner from "./Banner";
import Articles from "./Articles";
import FeaturedTutorials from "./FeaturedTutorials";
import Subscribe from "./Subscribe";

export default function Home() {
  return (
    <>
      <Banner />
      <Articles />
      <FeaturedTutorials />
      <Subscribe />
    </>
  );
}
