import React from "react";
import { CircleLoader } from "react-awesome-loaders";
function Loader() {
  return (
    <div className="grid place-items-center mt-[25vh] md:mt-20">
      {" "}
      <CircleLoader
        meshColor={"#6366F1"}
        lightColor={"#E0E7FF"}
        duration={1.5}
        desktopSize={"90px"}
        mobileSize={"64px"}
      />
    </div>
  );
}

export default Loader;
