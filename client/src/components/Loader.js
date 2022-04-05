import React from "react";
import Skeleton from "@mui/material/Skeleton";
function Loader() {
  return (
    <div className="grid place-items-center mt-[25vh] md:mt-20">
      {" "}
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </div>
  );
}

export default Loader;
