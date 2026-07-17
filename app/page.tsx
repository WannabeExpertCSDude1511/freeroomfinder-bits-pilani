import DaySelector from "./components/DaySelector";
import HourSelector from "./components/HourSelector";

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <h3>
        {" "}
        Pick a Day, and then an Hour, to choose the timeslot for which you seek
        a free room. Then, click on the Results button{" "}
      </h3>
      <h3>Day:</h3>
      <DaySelector></DaySelector>
      <h3>Hour: </h3>
      <HourSelector></HourSelector>
    </main>
  );
}
