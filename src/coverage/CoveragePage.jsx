import React from "react";
import { useLoaderData } from "react-router";
import Coverage from "./Coverage";
import SearchArea from "./SearchArea";

const CoveragePage = () => {
  const serviceCenters = useLoaderData(); // fetched once here

  return (
    <div className="space-y-6">
      <Coverage serviceCenters={serviceCenters} />
      
    </div>
  );
};

export default CoveragePage;
