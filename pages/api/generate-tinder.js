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
      prompt: generatePrompt(req.body.specific, req.body.measurable, req.body.achievable, req.body.relevant, req.body.timely, req.body.evaluation, req.body.readjust),
      temperature: 0.9,
      max_tokens: 700,
     
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

function generatePrompt(specific, measurable,  achievable,  relevant, timely, evaluation, readjust) {
return `Create a suggestion for a goal, using the SMARTER goal setting framework, based on the following:

Specific: Increase website traffic
Measurable: Using Google Analytics we will increase website traffic by 25%.
Achievable: We will increase website traffic by 25% by creating 5 extra blog posts a week within the next three months.
Relevant: This is connected to our company’s goal of increasing revenue by 20% in 2023.
Timely: Q1 and Q2 2023
Evaluation: We will evaluate the success of the objective by comparing the number of website visitors in Q1 and Q2 2023 to the same period in 2022, once per month.
Readjust: If the objective is a success, consider extending the process for another 3 months with new targets. If the team feel overwhelmed, consider reducing the number of blog posts to 3 per week.

Suggestion: 
Specific: Increase website traffic
Measurable: Using Google Analytics we will increase website traffic by 25%.
Achievable: We will increase website traffic by 25% by creating 5 extra blog posts a week within the next three months.
Relevant: This is connected to our company’s goal of increasing revenue by 20% in 2023.
Timely: Q1 and Q2 2023
Evaluation: We will evaluate the success of the objective by comparing the number of website visitors in Q1 and Q2 2023 to the same period in 2022, once per month.
Readjust: If the objective is a success, consider extending the process for another 3 months with new targets. If the team feel overwhelmed, consider reducing the number of blog posts to 3 per week.

Goal: Increase website traffic by 25% by creating 5 extra blog posts a week, starting now and continue until 6/30/2023. 
If the objective is a success, consider extending the process for another 3 months with new targets. 
If the marketing team feel overwhelmed, consider reducing the number of blog posts to 3 per week.


Specific: ${specific}
Measurable: ${measurable}
Achievable: ${achievable}
Timely: ${timely}
Evaluation: ${evaluation}
Relevant: ${relevant}
Evaluation: ${evaluation}
Readjust: ${readjust}

Suggestion:
`


}
