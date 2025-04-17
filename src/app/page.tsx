import { FadeToInput } from "@/components/FadeToInput";
import WeatherContainer from "@/components/WeatherContainer";

export default function Home() {
  return (
    <main>
      <FadeToInput>
        <div>
          <h1 className="mt-8 flex justify-center text-center text-5xl text-white font-bold">
            Como está o Clima hoje?
          </h1>
          <WeatherContainer />
        </div>
      </FadeToInput>
    </main>
  );
}
