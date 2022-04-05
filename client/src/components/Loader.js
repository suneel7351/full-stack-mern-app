import React from "react";
import Skeleton from "@mui/material/Skeleton";
function Loader() {
  return (
    <div className="grid place-items-center mt-[25vh] md:mt-20">
      {" "}
      <Skeleton variant="text" width={210} height={100} />
      <Skeleton variant="circular" width={210} height={105} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </div>
  );
}

export default Loader;
