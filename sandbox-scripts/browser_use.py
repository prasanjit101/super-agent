from langchain_openai import ChatOpenAI
from browser_use import Agent
import asyncio
import argparse
from browser_use.controller.service import Controller

controller = Controller()


async def main(task: str):
    agent = Agent(
        task=task,
        llm=ChatOpenAI(model="gpt-4o"),
    )
    result = await agent.run()
    print(result)

@controller.action('Ask user for information')
def ask_human(question: str, display_question: bool) -> str:
    return input(f'\n{question}\nInput: ')

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Run browser agent with a specific task')
    parser.add_argument('task', type=str, help='The task for the browser agent to perform')
    
    args = parser.parse_args()
    asyncio.run(main(args.task))

# example to use: 
# python browser_use.py "Find a one-way flight from Bali to Oman on 12 January 2025 on Google Flights. Return me the cheapest option."