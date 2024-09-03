"use client";
import Header from "@/commons/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResultPage = () => {
  const { makeId, year } = useParams();
  const [vehicleModels, setVehicleModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleModels = async () => {
      if (!makeId || !year) return;

      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        if (data.Results) {
          console.log(data);
          setVehicleModels(data.Results);
        } else {
          setError("No models found for this make ID and year.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleModels();
  }, [makeId, year]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />{" "}
      <div className="xl:w-4/5 w-[90%] mx-auto mt-8">
        <div className="xl:text-2xl text-xl mb-4 text-white flex gap-2 ">
          <b className="underline">Vehicle Models for ID:</b>
          <p className="font-normal underline-none">{makeId}</p>
        </div>
        <div className="xl:text-2xl text-xl mb-4 text-white flex gap-2 ">
          <b className="underline">Year:</b>
          <p className="font-normal underline-none">{year}</p>
        </div>

        <div className="flex flex-col gap-2">
          {vehicleModels.length > 0 ? (
            vehicleModels.map((model) => (
              <div key={model.Model_ID} className="flex gap-3 xl:w-[60%] w-full">
                <div className="bg-white xl:p-4 py-2 px-3 rounded-lg shadow-lg transition flex xl:flex-row flex-col w-[50%] items-center justify-center xl:gap-3 ">
                  <h2 className="xl:text-xl font-semibold">Model: </h2>
                  <h2 className="xl:text-lg text-sm">{model.Model_Name}</h2>
                </div>
                <div className="bg-white xl:p-4 py-2 px-3 rounded-lg shadow-lg transition flex xl:flex-row flex-col w-[50%] items-center justify-center xl:gap-3">
                  <h2 className="xl:text-xl font-semibold">Make name: </h2>
                  <h2 className="xl:text-lg text-sm">{model.Make_Name}</h2>
                </div>
              </div>
            ))
          ) : (
            <p>No models found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
