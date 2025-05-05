import * as Location from 'expo-location';

/**
 * Calcula la distancia entre dos puntos geográficos usando la fórmula de Haversine.
 * @param lat1 Latitud del primer punto.
 * @param lon1 Longitud del primer punto.
 * @param lat2 Latitud del segundo punto.
 * @param lon2 Longitud del segundo punto.
 * @returns Distancia en metros entre los dos puntos.
 */
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const R = 6371000;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
};

/**
 * Verifica si las coordenadas actuales están dentro de un radio en metros de las coordenadas objetivo.
 * @param targetLat Latitud de la ubicación objetivo.
 * @param targetLon Longitud de la ubicación objetivo.
 * @param currentLat Latitud actual.
 * @param currentLon Longitud actual.
 * @param radius Radio en metros.
 * @returns `true` si está dentro del radio, de lo contrario `false`.
 */
const isWithinRadius = (
  targetLat: number,
  targetLon: number,
  currentLat: number,
  currentLon: number,
  radius: number
): {withinRadius: boolean, distance: number, radius:number} => {
  const distance = calculateDistance(targetLat, targetLon, currentLat, currentLon);
  return {
    withinRadius: distance <= radius,
    distance: distance,
    radius: radius
  };
};

/**
 * Obtiene las coordenadas actuales del dispositivo.
 * @returns Objeto con latitud y longitud actuales.
 */
const getCurrentLocation = async (): Promise<{ latitude: number; longitude: number }> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permiso de ubicación no concedido');
  }
  
  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

export const LocationService = {
  calculateDistance,
  isWithinRadius,
  getCurrentLocation,
};