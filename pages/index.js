import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [achievement, setAchievement] = useState("");
  const [team, setTeam] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ achievement: achievement, team: team, startDate: startDate, endDate: endDate}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
// console.log('data.result',data)

      setResult(data.result);

     //  setAchievement("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      // console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/superteam.png" />
      </Head>

      <main className={styles.main}>
        <img src="/superteam.png" className={styles.icon} />
        <h3>Clara</h3>
        <form onSubmit={onSubmit}>
          
          <input
            type="text"
            name="achievement"
            placeholder="What do you want to achieve?"
            value={achievement}
            onChange={(e) => setAchievement(e.target.value)}
          />
            <input
            type="text"
            name="team"
            placeholder="Describe your team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
           <input
            type="text"
            name="staredDate"
            placeholder="Start date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
            <input
            type="text"
            name="endDate"
            placeholder="End date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input type="submit" value="Generate a goal" />
       
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
