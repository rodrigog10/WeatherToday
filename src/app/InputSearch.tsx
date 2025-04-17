"use client";
import CityInfo from "@/components/CityInfo";

import { FadeToInput } from "@/components/FadeToInput";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

// Defina a interface para o tipo de dados retornado pela API
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

export default function InputSearch() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null); // Use a interface aqui

  const fetchWeather = async () => {
    try {
      const apiKey = "30b3ef9d7e3d33fb2dc154fb0cb1e6f4";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );
      const data: WeatherData = await response.json(); // Tipagem explícita
      setWeather(data);
    } catch (error) {
      console.error("Erro ao buscar clima:", error);
    }
  };

  return (
    <FadeToInput>
      <div className="flex justify-center items-center mt-10">
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          className="text-white w-full sm:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>

        <button
          onClick={fetchWeather}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeather();
            }
          }}
          className=" cursor-pointer ml-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-200"
        >
          <SearchIcon />
        </button>
      </div>
      {weather && weather.main && <CityInfo weather={weather} />}
    </FadeToInput>
  );
}
