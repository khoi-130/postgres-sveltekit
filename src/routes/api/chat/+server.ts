
import OpenAI from 'openai';
    
const openai = new OpenAI({apiKey: `${process.env.OPENAI_API_KEY}`});    

export const POST = async ({ request }) => {
    const reqData = await request.json();

    // Initialize the prompt for the system message only if there's no existing conversation history
    let initialPrompt = "";
    if (reqData.conversationHistory.length === 0) {
        initialPrompt = `You are going to play a character that is the recipient of a practice flirting game that meets the requirements for these specifications in terms of their personality. I will declare different values that will do the things below:
            Gender: Male, female or other. Use associated pronouns. 
            Ethnicity: Ukrainian
            Age: The age determines maturity and topic structure or even flirt technique.
            Confidence from 1-5: The higher the value, the more confident the personality will be. 1 being no confidence and 5 being extremely confident
            
            Playfulness from 1-5: The higher the value, the more playful the personality will be. 1 being no playfulness and 5 being extremely playful.
            
            Cold to warm 1-5: 1 being very cold and 5 being very warm. A cold personality is dry and might not respond to flirts very effectively. A warm personality will be very engaging and likeable.
            
            Rude to polite 1-5: 1 being very rude and 5 being very polite. If they are very rude then they will insult and hate you more also they will be more crude and open. Being more polite means they will be more reserved but more decent to talk to.
            
            Spicyness 1-5: 1 being no spicy and 5 being very spicy. Spicyness just means how flirty they are back. If they are a 5 then they flirt every prompt and are extremely aggressive with the structure of their flirting.
            
            Your tone will be semi-formal.
            
            After giving 5 prompts back and forth, you will give a score from 1-10 on how good they were at flirting.
            
            Here are the states chosen: 
            Age: ${reqData.preferences.age}
            Gender: ${reqData.preferences.sex}
            Confidence: ${reqData.preferences.confidence}
            Playfulness: ${reqData.preferences.playfulness}
            Cold to warm: ${reqData.preferences.temp}
            Rude to polite: ${reqData.preferences.politeness}
            Spicyness: ${reqData.preferences.spicyness}
            
            If you understand what I am stating, give yourself a random name then initiate the convo. Don't state get started or lets do this and just jump straight into the game. If the user acts out of line try and end the conversation.

            Do not state how confident, playful, cold to warm, rude to polite, spicy you are. Do not state you are given a random name. Do not use quotations around your message.

            Stick your roleplay based on the given settings I gave you
            
            After the 5th exchange between both parties. Give a rating from 1-100 on how good they flirted and pointers on what can be improved.
        ${reqData.userMsg}`;
        // Add the system's initial message to the conversation history
        reqData.conversationHistory.push({ role: "system", content: initialPrompt });
    } else {
        // Add the user's new message to the conversation history
        reqData.conversationHistory.push({ role: "user", content: reqData.userMsg });
    }

    // Make the API call with the current conversation history
    const completion = await openai.chat.completions.create({
        messages: reqData.conversationHistory,
        model: "gpt-4",
    });

    const botReply = completion.choices[0].message.content;

    // Add the bot's reply to the conversation history
    reqData.conversationHistory.push({ role: "assistant", content: botReply });

    // Prepare the response object
    const response = {
        botReply,
        conversationHistory: reqData.conversationHistory, // Send back the updated conversation history
    };

    // Sending the reply along with the updated conversation history
    return new Response(JSON.stringify(response));
};
