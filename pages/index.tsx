import type { NextPage } from "next";
import { useState } from "react";
import { useCharactersQuery, useLocationsQuery } from "../src/graphql/generated";

const Home = () => {
  const { data, isError, isLoading } = useLocationsQuery();
  if (isLoading) return "Loading...";
  if (isError) return "Error...";
  console.log(data?.locations);
  return (
    <>
      {
        data?.locations?.results?.map((data) => (
          <div><p>{data?.id}<span> {data?.name}</span><span></span></p></div>
        ))
      }
    </>
  );
};

export default Home;
