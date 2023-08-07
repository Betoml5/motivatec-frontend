import { useQuery } from "react-query";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { getResultsAPI } from "../../services/statistics";

// const data = [
//   {
//     subject: "Bajo",
//     A: 120,
//     B: 110,
//     fullMark: 150,
//   },
//   {
//     subject: "Medio Bajo",
//     A: 98,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     subject: "Medio",
//     A: 86,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     subject: "Medio Alto",
//     A: 99,
//     B: 100,
//     fullMark: 150,
//   },
//   {
//     subject: "Alto",
//     A: 85,
//     B: 90,
//     fullMark: 150,
//   },
// ];

const subjects = ["Desmotivación", "Motivación interna", "Motivación externa"];

const Statistics = () => {
  const { data: results, isLoading } = useQuery("results", getResultsAPI);
  const getData = (item) => {
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

  return (
    <div className="grid grid-cols-1  gap-4 m-4 md:grid-cols-2 md:p-10 lg:grid-cols-3 ">
      {results.map((item, index) => {
        const data = getData(item);
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
    </div>
  );
};

export default Statistics;
