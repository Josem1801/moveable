import React from "react";
const ENDPOINT = process.env["REACT_APP_ENDPOINT"] ?? "";
export const UseGetPhotos = () => {
  const [photos, setPhotos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  //Endpoint: https://jsonplaceholder.typicode.com/photos
  React.useEffect(() => {
    setIsLoading(true);
    fetch(ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setIsLoading(false);
      });
  }, []);

  return { photos, isLoading };
};
