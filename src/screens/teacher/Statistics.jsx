import { useQuery } from "react-query";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getDailyByMonthAPI, getResultsAPI } from "../../services/statistics";
import { MOTIVATION_TYPES } from "../../utils/consts";
import { getStudentsAPI } from "../../services/student";
import { getTotalResultsAPI } from "../../services/result";
import Spinner from "../../screens/loading/Spinner";
import { useState } from "react";
import useGroups from "../../hooks/useGroup";

const Statistics = () => {
  const [filter, setFilter] = useState("");
  const {
    data: results,
    isLoading: isResultsLoading,
    isError: isResultsError,
  } = useQuery(["results", filter], () => getResultsAPI({ group: filter }));
  const { groups } = useGroups();
  const { data: resultsLength } = useQuery("resultsLength", getTotalResultsAPI);
  const { data: students } = useQuery("students", getStudentsAPI);
  const {
    data: dailyResults,
    isLoading: isDailyLoading,
    isError: isDailyError,
  } = useQuery("dailyByMonth", getDailyByMonthAPI);

  const getResultsData = (item) => {
    const data = Object.entries(item).map((item) => {
      return {
        subject: item[0],
        A: item[1],
        fullMark: 150,
      };
    });
    return data;
  };

  if (isResultsLoading || isDailyLoading) return <Spinner />;
  if (isResultsError && isDailyError)
    return <div>Ocurrio un error inesperado</div>;

  return (
    <div className="grid grid-cols-1 auto-cols-fr gap-4 m-4 md:grid-cols-2 md:p-10 lg:grid-cols-3 ">
      <div className="flex flex-wrap gap-4 mt-4 col-span-full">
        <div className="px-6 py-8 rounded-md bg-white flex-grow  h-40 shadow-md ">
          <p className="font-semibold text-xl mb-6">Alumnos </p>
          <p className="text-3xl font-bold ">{students.length}</p>
        </div>
        <div className="px-6 py-8 rounded-md bg-white flex-grow  h-40 shadow-md ">
          <p className="font-semibold text-xl mb-6">Encuestas contestadas </p>
          <p className="text-3xl font-bold ">{resultsLength.length}</p>
        </div>
      </div>
      <div className="flex flex-col col-span-full max-w-md">
        <label htmlFor="group" className="label">
          Filtrar por grupo
        </label>
        <select className="input" onChange={(e) => setFilter(e.target.value)}>
          <option value="" disabled selected>
            Selecciona un grupo
          </option>
          <option value="">Todos</option>
          {groups?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {results.map((item, index) => {
        const data = getResultsData(item);
        return (
          <div key={index} className="bg-white rounded-md py-4 shadow-md ">
            <h1 className="text-2xl text-center ">{MOTIVATION_TYPES[index]}</h1>
            <ResponsiveContainer width="100%" height="100%" aspect={2}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Mike"
                  dataKey="A"
                  stroke="#6aa6f9"
                  fill="#6aa6f9"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        );
      })}
      {dailyResults.map((item) => {
        return (
          <div
            key={item.emotion.value}
            className="lg:col-span-1 bg-white rounded-md py-4 shadow-md max-w-4xl"
          >
            <h1 className="text-2xl text-center ">{item.emotion.name}</h1>
            <ResponsiveContainer width="100%" aspect={2}>
              <AreaChart
                data={item.results.map((item) => {
                  return {
                    name: item.month.name, // Mes en el eje X
                    total: item.total, // Valor del eje Y
                  };
                })}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#6aa6f9"
                  fill="#6aa6f9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};

export default Statistics;
