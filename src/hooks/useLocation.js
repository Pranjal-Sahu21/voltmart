import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async (lat, lon) => {
      const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

      try {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`
        );
        const data = await res.json();

        if (data?.results?.length > 0) {
          const components = data.results[0].components;

          setLocation({
            city:
              components.city ||
              components.town ||
              components.village ||
              components.suburb ||
              components.county ||
              "",
            state: components.state || "",
            country: components.country || "",
            formatted: data.results[0].formatted,
          });
        }
      } catch (err) {
        console.error("Failed to fetch location:", err);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchLocation(pos.coords.latitude, pos.coords.longitude),
        (err) => console.error("Geolocation error:", err)
      );
    }
  }, []);

  return location;
};

export default useLocation;
