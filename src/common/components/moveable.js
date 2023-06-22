import React, { useRef, useState, useEffect } from "react";

const MoveableComponent = ({ containerRef, children, width, height }) => {
  const moveableRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({
    x: 0,
    y: 0,
    width,
    height,
  });
  const [showResizePoints, setShowResizePoints] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        handleMove(event);
      } else if (resizeDirection) {
        handleResize(event);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setResizeDirection("");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, currentPosition, resizeDirection, initialPosition]);

  const handleMove = (event) => {
    const newX = currentPosition.x + event.movementX;
    const newY = currentPosition.y + event.movementY;

    const containerRect = containerRef.current.getBoundingClientRect();
    const moveableRect = moveableRef.current.getBoundingClientRect();

    const maxX = containerRect.width - moveableRect.width;
    const maxY = containerRect.height - moveableRect.height;

    setCurrentPosition((prevPosition) => ({
      ...prevPosition,
      x: clamp(newX, 0, maxX),
      y: clamp(newY, 0, maxY),
    }));
  };

  const handleResize = (event) => {
    const containerRect = containerRef.current.getBoundingClientRect();

    const diffX = event.clientX - initialPosition.x;
    const diffY = event.clientY - initialPosition.y;

    let newWidth = currentPosition.width + diffX;
    let newHeight = currentPosition.height + diffY;
    let newX = currentPosition.x;
    let newY = currentPosition.y;

    if (resizeDirection.includes("right")) {
      newWidth = currentPosition.width + diffX;
    } else if (resizeDirection.includes("left")) {
      newWidth = currentPosition.width - diffX;
      newX = currentPosition.x + diffX;
    }

    if (resizeDirection.includes("bottom")) {
      newHeight = currentPosition.height + diffY;
    } else if (resizeDirection.includes("top")) {
      newHeight = currentPosition.height - diffY;
      newY = currentPosition.y + diffY;
    }

    const maxX = containerRect.width - newX;
    const maxY = containerRect.height - newY;

    setCurrentPosition((prevPosition) => ({
      ...prevPosition,
      x: clamp(newX, 0, maxX),
      y: clamp(newY, 0, maxY),
      width: clamp(newWidth, 0, containerRect.width),
      height: clamp(newHeight, 0, containerRect.height),
    }));

    setInitialPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setInitialPosition({ x: event.clientX, y: event.clientY });
  };

  const handleResizeMouseDown = (event, direction) => {
    event.stopPropagation();
    setIsDragging(false);
    setResizeDirection(direction);
    setInitialPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseEnter = () => {
    setShowResizePoints(true);
  };

  const handleMouseLeave = () => {
    setShowResizePoints(false);
  };

  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  return (
    <div
      ref={moveableRef}
      className="absolute rounded-md cursor-move border border-white"
      style={{
        top: currentPosition.y + "px",
        left: currentPosition.x + "px",
        width: currentPosition.width + "px",
        height: currentPosition.height + "px",
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showResizePoints && (
        <>
          <div
            className="w-2 h-2 bg-white rounded-full absolute left-0 top-1/2 transform -translate-y-1/2 cursor-ew-resize"
            onMouseDown={(event) => handleResizeMouseDown(event, "left")}
          />
          <div
            className="w-2 h-2 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 cursor-ew-resize"
            onMouseDown={(event) => handleResizeMouseDown(event, "right")}
          />
          <div
            className="w-2 h-2 bg-white rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 cursor-ns-resize"
            onMouseDown={(event) => handleResizeMouseDown(event, "top")}
          />
          <div
            className="w-2 h-2 bg-white rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 cursor-ns-resize"
            onMouseDown={(event) => handleResizeMouseDown(event, "bottom")}
          />
          <div
            className="w-2 h-2 bg-white rounded-full absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 cursor-nwse-resize"
            onMouseDown={(event) => handleResizeMouseDown(event, "top-left")}
          />
          <div
            className="w-2 h-2 bg-white rounded-full absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 cursor-nesw-resize"
            onMouseDown={(event) => handleResizeMouseDown(event, "top-right")}
          />
          <div
            className="w-2 h-2 bg-white rounded-full absolute bottom-0 left-0 transform translate-y-1/2 -translate-x-1/2 cursor-nesw-resize"
            onMouseDown={(event) => handleResizeMouseDown(event, "bottom-left")}
          />
          <div
            className="w-2 h-2 bg-white rounded-full absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 cursor-nwse-resize"
            onMouseDown={(event) =>
              handleResizeMouseDown(event, "bottom-right")
            }
          />
        </>
      )}
    </div>
  );
};

export default MoveableComponent;
