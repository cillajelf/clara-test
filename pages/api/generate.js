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

  const achievement = req.body.achievement || '';
  if (achievement.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid achievement",
      }
    });
    return;
  }
  
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(req.body.achievement, req.body.team, req.body.startDate, req.body.endDate),
      temperature: 0.9,
      max_tokens: 400,
      // stop: "\n"
    });

    // console.log('prompt---->', generatePrompt(req.body.achievement, req.body.team, req.body.startDate, req.body.endDate))

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
   
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(achievement, team, startDate, endDate) {
return `Create a goal, using the SMART goal setting framework, to ${achievement} for a team of ${team} from ${startDate} to ${endDate}.`
// return `Create an achievable goal improving team morale in a software developer team of 6 engineers, by the end of Q2 2023 using SMART goal framework.`
// return `Write a tagline for an ice cream shop?`
//return `Write a presentation of the character Frodo from the book Lord of the Rings`
}
