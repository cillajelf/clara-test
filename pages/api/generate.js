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
      max_tokens: 700,
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
return `Create a suggestion for a goal, using the SMARTER goal setting framework, to ${achievement} for a team of ${team} from ${startDate} to ${endDate}.
Achievement: Reduce employee turnover
Team: 6 software developers
Start Date: 1/1 2023
End Date: 3/31 2023
Suggestion: 
Specific: Which target area is most at risk and focus on this area. Maybe try and reduce the amount of employee turnover in employees who have been at the company for less than 2 years.
Measurable: Generate a more specific metric. For example, reduce turnover by 15%.
Achievable: It is time for a step back, consider if this target is realistic. If so, great! If not, have another think.
Relevant: Is the current rate of employee turnover damaging, do you want small or large improvements? Does your company have a specific problem with onboarding for example?
Timely: Q1 2023
Goal: We will reduce employee turnover by 15% in the next 3 months by addressing issues in the onboarding process. Constant evaluation is required with re-adjustment options available.'

Achievement: Increase website traffic
Team: Marketing team of 5 marketers
Start Date: Start of Q2 2023
End Date: End of Q2 2023
Suggestion: 
Specific: Increase organic traffic specifically, thereby removing all other traffic categories and focusing on one.
Measurable: 25% increase of unique site visits. Stimulated by producing 5 extra blogs per week.
Achievable: Again is this target a realistic goal within the rescources of the marketing team? If so, great! If not, have another think.
Relevant: Organic traffic has been identified as a key driver of new sales, so this is a relevant goal.
Timely : 4/1/2023 - 6/30/2023
Goal: Increase website traffic by 25% by creating 5 extra blog posts a week within the next three months. If the objective is a success, consider extending the process for another 3 months with new targets.

Achievement: Improve employee engagement
Team: A software development team of 6 engineers and 2 designers
Start Date: Start of Q2 2023
End Date: End of Q2 2023
Suggestion: 
Specific: Extract one topic/question from your employee engagement survey to focus on. For example, try and improve the score on the question: You feel the work you do is valued and appreciated.
Measurable: Responses on the employee engagement survey are based on a Likert scale (usually a 5- or 7-point scale). The desired target would be responses in the top two numbers (dependent on scale). Try and boost responses in this target area to 75%.
Achievable: A challenging goal, but one which has wide reaching benefits. The target needs to be realistic within the scope of your organization and resources.
Relevant: Improving employee engagement has a positive impact on productivity in a number of different facets.
Timely:  4/1/2023 - 6/30/2023
Goal: Improve the employees feeling of value with their work, by achieving a 75% target in the employee engagement survey topic during Q2 2023. Assess and evaluate progress with pulse surveys and ENPs.

Achievement: Develop better interpersonal relationships
Team: A software development team of 6 engineers and 2 designers
Start Date: Start of Q2 2023
End Date: End of Q2 2023
Suggestion: 
Specific: Interpersonal relationships are unbelievably important, and you cannot boil it down this simply. Choose a certain part of interpersonal relationships to focus on for example Develop better active listening skills.
Measurable: A slightly more difficult goal to measure. Feedback, and especially 360° feedback, is a good way to measure your interpersonal relationships with colleagues, superiors and subordinates. Try and achieve a 30% increase in responses compared to your last feedback review on this topic area.
Achievable: Is this achievable? The importance of developing strong interpersonal relationships should not be underestimated, and this goal should not be thought of as unachievable.
Relevant: Interpersonal skills are important. They help people build and foster strong working relationships.
Timely: 4/1/2023 - 6/30/2023
Goal: Improve the employees feeling of value with their work, by achieving a 75% target in the employee engagement survey topic during Q2 2023. Assess and evaluate progress with pulse surveys and ENPs.

Achievement: ${achievement}
Team: ${team}
Start Date: ${startDate}
End Date: ${endDate}
Suggestion:
`

}
