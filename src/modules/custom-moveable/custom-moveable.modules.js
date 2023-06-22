import React, { Fragment, useRef, useState } from "react";
import { Button } from "../../common/components/button";
import { Card } from "../../common/components/card";
import MoveableComponent from "../../common/components/moveable";
import { UseGetPhotos } from "../../common/hooks/use-get-photos";

export const CustomMoveableModule = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const { photos, isLoading } = UseGetPhotos();
  const containerRef = React.useRef(null);
  const addMoveable = () => {
    setMoveableComponents((prev) => [
      ...prev,
      photos[Math.floor(Math.random() * photos.length)],
    ]);
  };
  return (
    <Fragment>
      <Button onClick={addMoveable}>
        {isLoading ? "Loading images..." : "Add Moveable"}
      </Button>
      <Card
        id="parent"
        classNames="relative w-[800px] h-[800px]"
        ref={containerRef}
      >
        {moveableComponents.map((photo, index) => (
          <MoveableComponent
            width={200}
            height={200}
            key={index}
            id={index}
            containerRef={containerRef}
          >
            <img
              width={200}
              height={200}
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-contain"
            />
          </MoveableComponent>
        ))}
      </Card>
    </Fragment>
  );
};
