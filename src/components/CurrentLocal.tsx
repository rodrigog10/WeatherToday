"use client";
import { useState } from "react";
import { MapPin, Thermometer, CloudSun, Wind, Droplet, Navigation } from "lucide-react";
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

export default function CurrentLocal() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const pegarLocalizacao = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (posicao) => {
        const { latitude, longitude } = posicao.coords;

        // Chamando a API do OpenWeather com as coordenadas
        const resposta = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=30b3ef9d7e3d33fb2dc154fb0cb1e6f4&units=metric&lang=pt_br`
        );

        const dados = await resposta.json();
        console.log("Resposta da API:", dados);

        if (dados && dados.name) {
          setWeather(dados);
        } else {
          alert("Não foi possível identificar sua cidade.");
        }
      },
      (erro) => {
        console.error("Erro ao pegar localização:", erro);
        alert("Erro ao obter sua localização.");
      }
    );
  };

  return (
    <div className="mt-4">
      <div className="flex justify-center items-center">
        <button
          onClick={pegarLocalizacao}
          className="flex items-center justify-center gap-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        >
          <Navigation size={20} /> Utilizar minha localização
        </button>
      </div>

      {weather && (
        <FadeInSection>
          <div>
            <h1 className="mt-6 mb-7 text-3xl font-bold text-white flex justify-center items-center text-center gap-2">
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
      )}
    </div>
  );
}