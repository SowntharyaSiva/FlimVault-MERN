import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import Movies from "./components/Movies";
import Banner from "./components/Banner";
import Login from "./components/Login";
import Register from "./components/Register";

import.meta.env.VITE_API_BASE_URL

import { BrowserRouter,Routes ,Route} from "react-router-dom";

export default function App() {

  const [user, setUser] = useState(null);
  let [watchlist , setWatchList] = useState([]);

  let handleAddtoWatchList = async (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    setWatchList(newWatchList);
    //localStorage.setItem('moviesApp', JSON.stringify(newWatchList));

    if (user) {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/watchlist/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.userId, movie: movieObj })
      });
    }
  };


  let handleRemoveFromWatchList = async (movieObj) => {
    let filteredWatchList = watchlist.filter((movie) => movie.id !== movieObj.id);
    setWatchList(filteredWatchList);
    //localStorage.setItem('moviesApp', JSON.stringify(filteredWatchList));

    if (user) {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/watchlist/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.userId, movieId: movieObj.id })
      });
    }
  };

  useEffect(() => {
  const storedUserJSON = localStorage.getItem("user");

  if (!storedUserJSON) {
    setUser(null);
    return;
  }

  try {
    const storedUser = JSON.parse(storedUserJSON);
    setUser(storedUser);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/watchlist/${storedUser.userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWatchList(data);
          //localStorage.setItem("moviesApp", JSON.stringify(data));
        } else {
          console.warn("Watchlist is not an array:", data);
          setWatchList([]);
        }
        
      })
      .catch((err) => {
        console.error("Failed to fetch watchlist", err);
        setWatchList([]);
      });
  } catch (err) {
    console.error("Invalid user data in localStorage");
    setUser(null);
    setWatchList([]);
  }
}, [user]);



  return (
    <>
      <BrowserRouter>

        <Routes>
        
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<> <Navbar user={user} setWatchList={setWatchList}/> <Banner/> <Movies watchlist={watchlist} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>  </>}></Route>
          <Route path="/Watchlist" element={<><Navbar user={user}/> <Watchlist  watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchlist={handleRemoveFromWatchList} /> </>}></Route>
        
        </Routes>
      </BrowserRouter>
    </>
  );
}
