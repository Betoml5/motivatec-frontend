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

const subjects = ["Amotivación", "Motivación interna", "Motivación externa"];
const Statistics = () => {
  const { data: results, isLoading } = useQuery("results", getResultsAPI);
  const { data: dailyResults, isLoading: isDailyLoading } = useQuery(
    "dailyByMonth",
    getDailyByMonthAPI
  );

  const getResultsData = (item) => {
    const data = Object.entries(item).map((item) => {
      return {
        subject: item[0],
        A: item[1],
        fullMark: 150,
      };
    });
    delete item.key;
    return data;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isDailyLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1  gap-4 m-4 md:grid-cols-2 md:p-10 lg:grid-cols-3 ">
      {results.map((item, index) => {
        const data = getResultsData(item);
        return (
          <div key={index} className="bg-white rounded-md py-4 shadow-md ">
            <h1 className="text-2xl text-center ">{subjects[index]}</h1>
            <ResponsiveContainer
              width="100%"
              height="100%"
              aspect={2}

              // className="row-start-2"
            >
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
            key={item.emotion}
            className="lg:col-span-1 bg-white rounded-md py-4 shadow-md max-w-4xl"
          >
            <h1 className="text-2xl text-center ">{item.emotion}</h1>
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
