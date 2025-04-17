import { MapPin, Thermometer, CloudSun, Wind, Droplet } from "lucide-react";
import { FadeInSection } from "./FadeInSection";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

interface CityInfoProps {
  weather: WeatherData;
}

export default function CityInfo({ weather }: CityInfoProps) {
  return (
    
    <FadeInSection>
      <div>
        <h1 className="mt-6 mb-7 text-4xl font-bold text-white flex justify-center items-center text-center gap-2">
          Tempo em {weather.name} <MapPin />
        </h1>
      </div>

      <div className="flex justify-between p-4 gap-4 flex-wrap">
        {/* Temperatura */}
        <div className="text-black text-center font-semibold rounded-lg p-4 w-1/4 shadow">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Thermometer />
            <h2 className="text-xl">{weather.main.temp}°C</h2>
          </div>
          <p className="flex justify-center items-center gap-1">
            <CloudSun size={20} /> {weather.weather[0].description}
          </p>
        </div>

        {/* Vento */}
        <div className="text-black text-center font-semibold rounded-lg p-4 w-1/4 shadow">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Wind />
            <h2 className="text-xl">{weather.wind.speed} km/h</h2>
          </div>
          <p>Velocidade do vento</p>
        </div>

        {/* Umidade */}
        <div className="text-black text-center font-semibold rounded-lg p-4 w-1/4 shadow">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Droplet />
            <h2 className="text-xl">{weather.main.humidity}%</h2>
          </div>
          <p>Umidade do ar</p>
        </div>
      </div>
    </FadeInSection>
  );
}
