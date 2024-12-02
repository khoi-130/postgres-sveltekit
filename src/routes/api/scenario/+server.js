
import { env } from '$env/dynamic/private';
import OpenAI from 'openai';
    
const openai = new OpenAI({apiKey: `${process.env.OPENAI_API_KEY}`});    

export const POST = async ({ request }) => {
    const reqData = await request.json();
    console.log("ReqData Scenario: ", reqData)

    var environmentScenario = ""
    switch(reqData.scenario){
        case 2:
            environmentScenario = "Library"
            console.log("Before", environmentScenario)
            break
        case 3:
            environmentScenario = "Cafe"
            console.log("Before", environmentScenario)
            break
        case 4:
            environmentScenario = "Park"
            console.log("Before", environmentScenario)
            break
        case 5:
            environmentScenario = "Pickle ball"
            console.log("Before", environmentScenario)
            break
        default:
            environmentScenario = reqData.scenario
            console.log("Before", environmentScenario)

            
    }
    //console.log("Scenario: ", environmentScenario)
    
    // Initialize the prompt for the system message only if there's no existing conversation history
    let initialPrompt = `You are going to create an descriptive scene of the ${environmentScenario} 
    where you meet someone you are interested in and want to start a conversation.
    When describing the scene, you will only use gender neutral pronouns they/them
    You will not create any dialogue. You will only use words to make a scene easy to visualize. Keep the message under 300 characters.
    `;
    //console.log(environmentScenario)
    // Make the API call with the current conversation history
    const completion = await openai.chat.completions.create({
        messages: [{
            role: "user", content: initialPrompt
        }],
        model: "gpt-4o-mini",
    });

    // Prepare the response object
    const creation = completion.choices[0].message.content

    console.log("Creation ", creation)
    const response = {
        scenario: environmentScenario,
        scene: creation
    };
    //console.log("Completion", creation)
    // Sending the reply along with the updated conversation history
    return new Response(JSON.stringify(response));
};
