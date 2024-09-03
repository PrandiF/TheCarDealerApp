export const getVehicles = async () => {
  try {
    const response = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );

    if (!response.ok) {
      throw new Error("No se ha podido obtener los vehículos");
    }

    const vehicles = await response.json(); // Llamar a json() en la respuesta
    return vehicles; // Devuelve los datos JSON directamente
  } catch (error) {
    console.error("Error al obtener los vehículos:", error);
    throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
  }
};

export const getYearVehicles = async () => {
  try {
    const response = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json"
    );

    if (!response.ok) {
      throw new Error("No se ha podido obtener los vehículos");
    }

    const vehicles = await response.json(); // Llamar a json() en la respuesta
    return vehicles; // Devuelve los datos JSON directamente
  } catch (error) {
    console.error("Error al obtener los vehículos:", error);
    throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
  }
};
