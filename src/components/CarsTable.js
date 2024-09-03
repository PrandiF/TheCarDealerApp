import Link from "next/link";

function CarsTable({ vehicleType, model, year, vehiclesData, makeId }) {
  const filteredVehicles = vehiclesData.filter((vehicle) => {
    return (
      (vehicleType === "" || vehicle.VehicleTypeName === vehicleType) &&
      (model === "" || vehicle.MakeName === model)
    );
  });

  const isNextButtonEnabled = makeId !== "" && year !== "";

  return (
    <div className="xl:w-4/5 w-[90%] xl:max-h-[500px] max-h-[400px] flex flex-col mx-auto xl:mt-8 mt-4 overflow-y-auto rounded-lg">
      <div className="flex flex-col overflow-y-auto rounded-lg">
        <table className="w-full rounded-lg">
          <thead className="bg-black text-white rounded-t-xl">
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Make Name</th>
              <th className="p-3 text-left">MakeId</th>
              {/* <th className="p-3 text-left">MakeYear</th> */}

            </tr>
          </thead>
          <tbody className="bg-white rounded-lg">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="p-3 xl:text-xl text-sm">{vehicle.VehicleTypeName}</td>
                  <td className="p-3 text-left xl:text-xl text-sm">{vehicle.MakeName}</td>
                  <td className="p-3 text-left xl:text-xl text-sm">{vehicle.MakeId}</td>
                  {/* <td className="p-3 text-left">{vehicle.Year}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-3 text-center">
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-start mt-4">
        {filteredVehicles.length > 0 && (
          <Link href={`/result/${makeId}/${year}`}>
          <button
            className={`px-4 py-2 rounded ${
              isNextButtonEnabled
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isNextButtonEnabled}
          >
            Next
          </button>
        </Link>
        )}
      </div>
    </div>
  );
}
export default CarsTable;
