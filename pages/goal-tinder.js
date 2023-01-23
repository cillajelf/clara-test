import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [specific, setSpecific] = useState("");
  const [measurable, setMeasurable] = useState("");
  const [achievable, setAchievable] = useState("");
  const [relevant, setRelevant] = useState("");
  const [timely, setTimely] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [readjust, setReadjust] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate-tinder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ specific: specific, measurable: measurable, achievable: achievable, relevant: relevant, timely:timely, evaluation:evaluation, readjust:readjust}),
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
        <h3>Clara Goal tinder</h3>
        <form onSubmit={onSubmit}>
          
          <input
            type="text"
            name="specific"
            placeholder="Specific"
            value={specific}
            onChange={(e) => setSpecific(e.target.value)}
          />
            <input
            type="text"
            name="measurable"
            placeholder="Measurable"
            value={measurable}
            onChange={(e) => setMeasurable(e.target.value)}
          />
           <input
            type="text"
            name="achievable"
            placeholder="Achievable"
            value={achievable}
            onChange={(e) => setAchievable(e.target.value)}
          />
            <input
            type="text"
            name="relevant"
            placeholder="Relevant"
            value={relevant}
            onChange={(e) => setRelevant(e.target.value)}
          />
   <input
            type="text"
            name="timely"
            placeholder="Timely"
            value={timely}
            onChange={(e) => setTimely(e.target.value)}
          />   
          <input
          type="text"
          name="evaluation"
          placeholder="Evaluation"
          value={evaluation}
          onChange={(e) => setEvaluation(e.target.value)}
        />

<input
          type="text"
          name="readjust"
          placeholder="Re-adjust"
          value={readjust}
          onChange={(e) => setReadjust(e.target.value)}
        />


          <input type="submit" value="Generate a goal" />
       
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
