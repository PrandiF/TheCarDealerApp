"use client";
import React, { useEffect, useState } from "react";
import Header from "@/commons/Header";
import InputSelect from "@/commons/InputSelect";
import CancelSearchButton from "@/commons/cancelButton";
import CarsTable from "./CarsTable";

function HomePage() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedMakeId, setSelectedMakeId] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    new Array(currentYear - 2014),
    (val, index) => 2015 + index
  );

  const fetchVehicleTypes = async () => {
    try {
      const response = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      const data = await response.json();
      setVehicleTypes(data.Results);
    } catch (error) {
      console.error("Error fetching vehicle types:", error);
    }
  };

  const fetchMakes = async () => {
    try {
      const response = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      const data = await response.json();
      console.log(data.Results);
      setMakes(data.Results);
    } catch (error) {
      console.error("Error fetching makes:", error);
    }
  };

  const fetchModels = async (makeId) => {
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${selectedYear}?format=json`
      );
      const data = await response.json();
      setModels(data.Results);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  useEffect(() => {
    fetchVehicleTypes();
    fetchMakes();
  }, []);

  useEffect(() => {
    if (selectedVehicleType && selectedMakeId) {
      fetchModels(selectedMakeId);
    }
  }, [selectedVehicleType, selectedMakeId]);

  const handleCancelButton = () => {
    setSelectedVehicleType("");
    setSelectedModel("");
    setSelectedMakeId("");
  };

  return (
    <div>
      <Header />
      <div className="flex w-[80%] mx-auto items-center justify-center gap-6 xl:flex-row flex-col">
        <InputSelect
          placeholder="Type"
          options={vehicleTypes.map((type) => ({
            value: type.VehicleTypeName,
            label: type.VehicleTypeName,
          }))}
          value={selectedVehicleType}
          onChange={(e) => setSelectedVehicleType(e.target.value)}
        />
        <InputSelect
          placeholder="Model"
          options={makes.map((make) => ({
            value: make.MakeName,
            label: make.MakeName,
          }))}
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        />
        <InputSelect
          placeholder="Year"
          options={years.map((year) => ({
            value: year,
            label: year,
          }))}
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
        <InputSelect
          placeholder="MakeId"
          options={makes.map((make) => ({
            value: make.MakeId,
            label: make.MakeId,
          }))}
          value={selectedMakeId}
          onChange={(e) => setSelectedMakeId(e.target.value)}
        />

        <div className="pb-3" onClick={handleCancelButton}>
          <CancelSearchButton />
        </div>
      </div>

      <div className="pb-4">
        <CarsTable
          vehicleType={selectedVehicleType}
          model={selectedModel}
          makeId={selectedMakeId}
          year={selectedYear}
          vehiclesData={vehicleTypes}
        />
      </div>
    </div>
  );
}

export default HomePage;
