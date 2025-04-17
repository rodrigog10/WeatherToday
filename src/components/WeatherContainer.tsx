"use client";

import { useState } from "react";
import CityInfo from "./CityInfo";
import { Navigation, SearchIcon } from "lucide-react";
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
  sys: {
    country: string;
  };
}

export default function WeatherContainer() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const apiKey = "30b3ef9d7e3d33fb2dc154fb0cb1e6f4";

  const fetchWeatherByCity = async () => {
    if (!city.trim()) {
      setError("Digite o nome de uma cidade.");
      setWeather(null);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );

      if (!res.ok) {
        if (res.status === 404) {
          setError("Cidade não encontrada. Verifique o nome digitado.");
        } else if (res.status === 401) {
          setError("Chave de API inválida.");
        } else {
          setError("Erro ao buscar dados. Tente novamente.");
        }
        setWeather(null);
        return;
      }

      const data = await res.json();
      setWeather(data);
      setError("");
    } catch (err) {
      console.error("Erro ao buscar por cidade:", err);
      setError("Erro ao conectar com o servidor.");
      setWeather(null);
    }
  };

  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric&lang=pt_br`
          );

          if (!res.ok) {
            setError("Erro ao buscar dados por localização.");
            setWeather(null);
            return;
          }

          const data = await res.json();
          setWeather(data);
          setError("");
        } catch (err) {
          console.error("Erro ao buscar por localização:", err);
          setError("Erro ao buscar dados por localização.");
          setWeather(null);
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        setError("Erro ao obter sua localização.");
        setWeather(null);
      }
    );
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-4">
      {/* Linha com input + botão de buscar */}
      <div className="flex w-2/3 gap-2">
        <input
          type="text"
          placeholder="Digite a cidade"
          className="text-white flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeatherByCity();
          }}
        />
        <button
          onClick={fetchWeatherByCity}
          className="cursor-pointer font-bold flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          <SearchIcon size={20} />
          Buscar cidade
        </button>
      </div>

      <span className="text-white text-3xl font-bold">ou</span>

      {/* Botão localização embaixo */}
      <button
        onClick={fetchWeatherByLocation}
        className="cursor-pointer font-bold flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
      >
        <Navigation size={20} />
        Usar localização atual
      </button>

      {/* Erro */}
      {error && (
        <FadeInSection>
          <p className="text-2xl text-red-500 text-center mt-4">{error}</p>
        </FadeInSection>
      )}

      {/* Info clima */}
      {weather && <CityInfo weather={weather} />}
    </div>
  );
}
