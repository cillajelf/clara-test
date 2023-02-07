import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [specific, setSpecific] = useState("");
  const [measurable, setMeasurable] = useState("");
  const [achievable, setAchievable] = useState("");
  const [relevant, setRelevant] = useState("");
  const [timely, setTimely] = useState("");
  const [result, setResult] = useState("")
  // const [result1, setResult1] = useState("");
  // const [result2, setResult2] = useState("");
  const [warCry, setWarCry] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate-tinder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ specific: specific, measurable: measurable, achievable: achievable, relevant: relevant, timely:timely}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

    //   console.log('data -------->', data)
      setResult(data.result);
      // if(result.length === 0 ){
      //   setResult(data.result);
      // }
      //   if(result.length > 0 && result1.length === 0 ){
      //   setResult1(data.result);
      //   }

      //   if(result.length > 0 && result1.length > 0 && result2.length === 0 ){ 
      //   setResult2(data.result);
      //    }


    } catch(error) {
      // Consider implementing your own error handling logic here
      // console.error(error);
      alert(error.message);
    }
  }

  async function onWarCry(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/generate-war-cry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal: result}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

    setWarCry(data.result);
    
     } catch(error) {
       alert(error.message);
     }
  }

  return (
    <div>
      <Head>
        <title>Clara</title>
        <link rel="icon" href="/superteam.png" />
      </Head>

      <main className={styles.main}>
        <img src="/superteam.png" className={styles.icon} />
        <h3>Clara</h3>
        <form onSubmit={onSubmit}>
          <label>Specific</label>
          <textarea
            type="text"
            rows={4}
            name="specific"
            value={specific}
            onChange={(e) => setSpecific(e.target.value)}
          />
          <label>Measurable</label>
          <textarea
            type="text"
            rows={2}
            name="measurable"
            value={measurable}
            onChange={(e) => setMeasurable(e.target.value)}
          />
          <label>Achievable</label>
           <textarea
            type="text"
            rows={4}
            name="achievable"
            value={achievable}
            onChange={(e) => setAchievable(e.target.value)}
          />
          <label>Relevant</label>
            <textarea
            type="text"
            rows={4}
            name="relevant"
            value={relevant}
            onChange={(e) => setRelevant(e.target.value)}
          />
          <label>Timely</label>
          <textarea
            type="text"
            rows={2}
            name="timely"
            value={timely}
            onChange={(e) => setTimely(e.target.value)}
          />   

          <input type="submit" value="Generate a goal" />
     
        </form>

        <div className={styles.goals} >
        <div className={styles.result}>{result}</div>
        <input type="submit" value="Generate a war cry" onClick={onWarCry}/>
        <div className={styles.result}>{warCry}</div>

        </div>
      </main>
    </div>
  );
}
