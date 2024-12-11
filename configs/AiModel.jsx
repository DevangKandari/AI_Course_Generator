const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_Ai = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate A Course Tutorial on Following Detail With fiel as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level:Basic , Duration:1 hours, NoOfChapters:5, in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "courseName": "Fiel",\n  "description": "A beginner-friendly introduction to Python programming. This course covers fundamental concepts and techniques, providing a solid foundation for further learning.",\n  "category": "Programming",\n  "topic": "Python",\n  "level": "Basic",\n  "duration": "1 hour",\n  "chapters": [\n    {\n      "chapterName": "Introduction to Python",\n      "about": "This chapter introduces Python, its applications, and setting up the development environment.  We\'ll cover basic syntax and data types.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapterName": "Variables and Data Types",\n      "about": "Learn about different variable types in Python (integers, floats, strings, booleans) and how to work with them.  We\'ll cover type conversion and basic operators.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapterName": "Control Flow (if-else statements)",\n      "about": "Understand conditional statements and how to control the flow of your program using if, elif, and else statements.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapterName": "Loops (for and while loops)",\n      "about": "Master iteration with for and while loops. Learn how to iterate through lists and other data structures.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapterName": "Basic Input/Output",\n      "about": "Learn how to take user input using the `input()` function and display output using the `print()` function. We\'ll also cover basic string formatting.",\n      "duration": "10 minutes"\n    }\n  ],\n  "noOfChapters": 5\n}\n```\n',
        },
      ],
    },
  ],
});

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in detail on Topic : Python Basics, Chapter: Variables and Data Types, in JSON Format with list of array with fields title, explanation on the given chapter in detail , Code Example(Code field in <precode> format) if applicable.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "topic": "Python Basics",\n  "chapter": "Variables and Data Types",\n  "sections": [\n    {\n      "title": "What are Variables?",\n      "explanation": "Variables are named storage locations in a computer\'s memory that hold data.  Think of them as containers that you can use to store information your program needs to work with.  In Python, you don\'t need to explicitly declare the type of a variable; Python infers the type based on the value assigned to it. This is known as dynamic typing.",\n      "codeExample": "<precode>\\n# Assigning values to variables\\nname = \\"Alice\\"\\nage = 30\\nheight = 5.8\\nis_student = True\\n</precode>"\n    },\n    {\n      "title": "Data Types",\n      "explanation": "Python has several built-in data types.  The most common are:\\n\\n* **Integers (int):** Whole numbers (e.g., 10, -5, 0).\\n* **Floating-Point Numbers (float):** Numbers with decimal points (e.g., 3.14, -2.5, 0.0).\\n* **Strings (str):** Sequences of characters enclosed in single (\' \') or double (\\" \\") quotes (e.g., \\"Hello\\", \'Python\').\\n* **Booleans (bool):** Represent truth values; either True or False.\\n* **NoneType (None):** Represents the absence of a value.",\n      "codeExample": "<precode>\\n# Examples of different data types\\nx = 10          # Integer\\ny = 3.14159     # Float\\nz = \\"Python\\"   # String\\nb = True        # Boolean\\nc = None        # NoneType\\n</precode>"\n    },\n    {\n      "title": "Type Checking",\n      "explanation": "You can check the data type of a variable using the `type()` function.",\n      "codeExample": "<precode>\\nx = 10\\nprint(type(x))  # Output: <class \'int\'>\\ny = 3.14\\nprint(type(y))  # Output: <class \'float\'>\\nz = \\"Hello\\"\\nprint(type(z))  # Output: <class \'str\'>\\n</precode>"\n    },\n    {\n      "title": "Variable Naming Conventions",\n      "explanation": "Follow these guidelines when naming variables:\\n\\n* Use descriptive names that clearly indicate the variable\'s purpose.\\n* Start with a letter (a-z, A-Z) or an underscore (_).\\n* Use lowercase letters, separating words with underscores (snake_case).\\n* Avoid using Python keywords (e.g., if, else, for, while, etc.).",\n      "codeExample": "<precode>\\n# Good variable names\\nstudent_name = \\"Bob\\"\\nstudent_age = 20\\n\\n# Bad variable names\\n1studentname = \\"Alice\\" #Starts with a number\\nstudent Age = 25 #Contains space\\n</precode>"\n    },\n    {\n      "title": "Type Conversion (Casting)",\n      "explanation": "You can convert a variable from one data type to another using type casting functions like `int()`, `float()`, `str()`, and `bool()`.  However, not all conversions are possible (e.g., converting a string like \\"hello\\" to an integer will raise an error).",\n      "codeExample": "<precode>\\nx = 10\\ny = float(x)  # Convert integer to float\\nprint(y)  # Output: 10.0\\nz = str(x)   # Convert integer to string\\nprint(z)  # Output: 10\\na = \\"15\\"\\nb = int(a)  #Convert string to integer (only if string represents a valid number)\\nprint(b) #Output: 15\\n</precode>"\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
