import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState(
    JSON.parse(sessionStorage.getItem("token")) || {
      isAuth: false,
      token: null,
      role: null,
    }
  );
  const [album, setAlbum] = useState([
    {
      albumTitle: "School",
      images: ["school-image1.jpg", "school-image2.jpg", "school-image3.jpg"],
      titles: ["titles 1", "titles 2", "titles 3"],
      captions: ["captions 1", "captions 2", "captions 3"],
    }

    // Add more albums as needed
  ]);
  

  // ... other functions ...

  const createNewAlbum = (album) => {
    setAlbum((prevAlbums) => [...prevAlbums, album]);
   
  };
  const [allImages, setAllImages] = useState([
    {
      filename: "School",
      title: "school-image1.jpg",
      caption: "captions 2",
    },

    // Add more albums as needed
  ]);
  const loginUser = (val, role) => {
    setAuthState({ isAuth: true, token: val, role });
    sessionStorage.setItem(
      "token",
      JSON.stringify({ isAuth: true, token: val })
    );
  };
  const logoutUser = () => {
    setAuthState({ isAuth: false, token: null });
    sessionStorage.removeItem("token");
  };
  const addPostToAllImages = (post) => {
    setAllImages((prevImages) => [...prevImages, post]);
    console.log(allImages);
  };
  useEffect(() => {
    console.log(allImages);
  }, [allImages]);

  let value = {
    authState,
    album,
    setAlbum,
    allImages,
    addPostToAllImages,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
