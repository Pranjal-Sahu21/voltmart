import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async (lat, lon) => {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const data = await res.json();
        if (data && data.name && data.sys) {
          setLocation({
            city: data.name,
            state: data.sys.country,
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
