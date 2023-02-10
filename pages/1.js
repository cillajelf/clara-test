import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [goal, setGoal] = useState("");
  const [warCry, setWarCry] = useState("");

  
  async function onWarCry(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/generate-war-cry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal: goal}),
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
        <h3>War cry generator</h3>
        <form >
        <label>Your goal</label>
          <textarea
            type="text"
            rows={10}
            name="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />   
        </form>
       
        <div className={styles.goals}>
        <input type="submit" value="Generate a war cry" onClick={onWarCry}/>
        {goal.length ? <div className={styles.result}>{warCry}</div>  
        : null}
        </div>
      </main>
    </div>
  );
}
