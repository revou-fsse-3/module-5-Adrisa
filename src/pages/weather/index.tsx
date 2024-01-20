import { AppContext, PropCity } from "@/context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const Weather = () => {
  const [forcastDates, setForcastDates] = useState([]);
  const navigate = useRouter();

  const { currentCity } = useContext(AppContext);

  const cityName = currentCity?.name;
  const fetchWeather = async (curentCity: PropCity) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${curentCity}&appid=da66e1db80a12b4a568d7b697044e905`
      );
      const data = await response.json();
      const { city, list } = data;
      const cityName = city.name;
      const cityWeatherList = list;
      setForcastDates(cityWeatherList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather(cityName);
  }, []);
  const handleBack = () => {
    navigate.push("/");
  };

  console.log(forcastDates);
  useEffect(() => {
    const newCurrentDate = forcastDates?.filter((forecastDate: any) => {
      const forecastDateTag = dayjs(forecastDate.dt * 1000)
        .add(1, "day")
        .format("DDMMYY");
      return forecastDateTag === dayjs().format("DDMMYY");
    });
    // console.log(newCurrentDate);
  }, []);

  return (
    <>
      <div className="max-w-2xl mx-auto py-6">
        <button
          onClick={handleBack}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back
        </button>
        <div className="font-bold text-xl flex flex-row justify-center flex-wrap gap-5 ">
          {cityName}
        </div>
      </div>

      <div className="flex flex-row flex-wrap  justify-center gap-5 bg-white rounded p-4 ">
        {forcastDates?.map((forecastDate: any, id) => {
          const { dt, main, weather, wind } = forecastDate;
          const forecastDateTag = dayjs(dt * 1000).format("dddd, D MMMM YYYY");
          const forecastHour = dayjs(dt * 1000).format("HH:mm");
          const { humidity, temp, temp_max, temp_min } = main;
          const [contentWeather] = weather;
          const { icon } = contentWeather;
          const conclution = contentWeather.main;
          console.log(conclution);
          const { speed } = wind;
          const celciusTempConverter = (temp: number) => {
            return Math.ceil(temp - 273);
          };

          const tempCelcius = celciusTempConverter(temp);
          const tempCelciusMax = celciusTempConverter(temp_max);
          const tempCelciusMin = celciusTempConverter(temp_min);

          return (
            <>
              <div
                key={id}
                className="basis-64 bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs"
              >
                <div className="text-sm text-gray-500 ">{forecastDateTag}</div>
                <div className="text-sm text-gray-500 ">
                  {forecastHour} GMT+7
                </div>
                <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt=""
                  />
                </div>
                <div className="flex flex-row items-center justify-center mt-6">
                  <div className="font-medium text-6xl">{tempCelcius}°</div>
                  <div className="flex flex-col items-center ml-6">
                    <div>{conclution}</div>
                    <div className="mt-1">
                      <span className="text-sm">
                        <i className="far fa-long-arrow-up"></i>
                      </span>
                      <span className="text-sm font-light text-gray-500">
                        {tempCelciusMax}°C
                      </span>
                    </div>
                    <div>
                      <span className="text-sm">
                        <i className="far fa-long-arrow-down"></i>
                      </span>
                      <span className="text-sm font-light text-gray-500">
                        {tempCelciusMin}°C
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-6">
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-sm">Wind</div>
                    <div className="text-sm text-gray-500">{speed}k/h</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-sm">Humidity</div>
                    <div className="text-sm text-gray-500">{humidity}%</div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Weather;
