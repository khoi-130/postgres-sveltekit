// @ts-nocheck

import OpenAI from 'openai';
    
const openai = new OpenAI({apiKey: `${process.env.OPENAI_API_KEY}`});    

export const POST = async ({ request }) => {
    const reqData = await request.json();
    console.log("ReqData: ", reqData)


    // Initialize the prompt for the system message only if there's no existing conversation history
    let initialPrompt = "";

    // Make the API call with the current conversation history
    const completion = await openai.chat.completions.create({
        messages: reqData.conversationHistory,
        model: "chatgpt-4o-latest",
    });

    const botReply = completion.choices[0].message.content;

    // Prepare the response object
    const response = {
        botReply,
        conversationHistory: reqData.conversationHistory, // Send back the updated conversation history
    };

    // Sending the reply along with the updated conversation history
    return new Response(JSON.stringify(response));
};
