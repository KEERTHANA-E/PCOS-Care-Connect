from langchain.prompts.prompt import PromptTemplate
from langchain_community.chat_models import ChatOpenAI
from langchain_openai import OpenAI
from langchain import LLMChain
from tqdm import tqdm

OPENAI_KEY = "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"


def OpenAIChatCompletion(question):
    template = """
    YOU ARE A Professional fitness trainer FOR people who are suffering with PCOS. YOUR WORK IS TO HELP Victims to give one week itinerary exercises which includes cardio and strength training  THROUGH THE WEBSITE,
    . The answers must contain only contains 2 exercises with no description for each day.Dont give extra information.

    MORE WEBSITE DETAILS:
    Human: {human_input}
    Chatbot ANSWER JSON FORMAT:
    ```json
    (
        "day-1": string,
        "day-2": string,
        "day-3": string,
        "day-4": string,
        "day-5": string,
        "day-6": string 
    )
    ```
    """
    prompt = PromptTemplate(
        input_variables=["human_input"], 
        template=template
    )
    
    llm_chain = LLMChain(
        llm=OpenAI(openai_api_key=OPENAI_KEY,max_retries=10), 
        prompt=prompt, 
        verbose=False
    )
    
    result = llm_chain.predict(human_input=question)
    print(result)
    return result