import React, { useReducer } from "react";
import { Image, ImageProps, Loader } from "semantic-ui-react";

export const SafeImage = (props: ImageProps) => {
  const [loaded, toggleLoaded] = useReducer((s) => !s, false);

  return (
    <>
      {!loaded ? <Loader /> : null}
      <Image
        {...props}
        style={!loaded ? { visibility: "hidden" } : props.style}
        onLoad={toggleLoaded}
      />
    </>
  );
};
