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

  // const achievement = req.body.achievement || '';
  // if (achievement.trim().length === 0) {
  //   res.status(400).json({
  //     error: {
  //       message: "Please enter a valid achievement",
  //     }
  //   });
  //   return;
  // }
  
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(req.body.specific, req.body.measurable, req.body.achievable, req.body.relevant, req.body.timely),
      temperature: 0.9,
      max_tokens: 700,
     
    });

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
   
    // https://community.openai.com/t/api-504s-in-production-vercel-only/28795/6
    // if (error.response) {
    //   console.error(error.response.status, error.response.data);
    //   res.status(error.response.status).json(error.response.data);
    // } 
    if (response.status !== 200) {
      throw new Error(`yyy Request failed with status ${response.status}`);
    }
  
    // else {
    //  console.error(`Error with OpenAI API request: ${error.message}`);
    //   res.status(500).json({
    //     error: {
    //       // message: 'An error occurred during your request.',
    //       message: 'yyy tinder error',
    //     }
    //   });
    // }
  }
}

function generatePrompt(specific, measurable,  achievable,  relevant, timely) {
return `Create a suggestion for a goal, using the SMART goal setting framework, based on the following:

Specific: Marketing team will increase website traffic by producing more content to drive organic traffic.
Measurable: We will increase monthly visitors by 25%. Using Google Analytics we will measure the number of website visitors, baseline is currently 1000 visitors per month.
Achievable: With our expansion of the marketing team we can create 5 extra blog posts a week within the next three months.
Relevant: This is connected to our company’s goal of increasing revenue by 10% in 2023.
Timely: Feb 1 2023, to June 30, 2023

Suggestion Goal: We will increase organic traffic by 25% by the end of Q2. We will do this by creating 5 extra blog posts a week, starting now and continue until 6/30/2023. 
 

Specific: ${specific}
Measurable: ${measurable}
Achievable: ${achievable}
Relevant: ${relevant}
Timely: ${timely}

Suggestion Goal:
`


}
