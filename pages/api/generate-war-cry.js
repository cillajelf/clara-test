import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(req.body.goal),
      temperature: 0.9,
      max_tokens: 700,
    });

   
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
   

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  }
}


function generatePrompt(goal) {
return `Create a funny war cry for a knowlegeworker team for the following goal: ${goal} Use one word from the goal in the war cry.

 Goal: We will reduce employee turnover by 15% in the next 3 months by addressing issues in the onboarding process. Constant evaluation is required with re-adjustment options available.
  Suggestion: Terminate turnover. Onwards together.

  Goal: Increase website traffic by 25% by creating 5 extra blog posts a week within the next three months. If the objective is a success, consider extending the process for another 3 months with new targets.
  Suggestion: Five posts. Five wins. Long live the blog!
  
  Goal: Improve the employees feeling of value with their work, by achieving a 75% target in the employee engagement survey topic during Q2 2023. Assess and evaluate progress with pulse surveys and ENPs.
  Suggestion: Forever valued. Engagment and love.
  
  Goal: We will decrease reported bugs on the check out page of our app by 20% by the end of Q2. We will achieve this by collaborating with customer support to get intel and making the necessary fixes to the page now and until 6/30/2023.
  Suggestion: Bugs be gone.

Goal: ${goal}
Suggestion:
`

}

