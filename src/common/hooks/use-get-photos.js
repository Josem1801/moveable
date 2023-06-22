import React from "react";

export const UseGetPhotos = () => {
  const [photos, setPhotos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  //Endpoint: https://jsonplaceholder.typicode.com/photos
  React.useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setIsLoading(false);
      });
  }, []);

  return { photos, isLoading };
};
