const API_URL = "https://7btfo41hu6.execute-api.us-east-1.amazonaws.com/chat";

const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const answerText = document.getElementById("answerText");
const loading = document.getElementById("loading");
const quickQuestionButtons = document.querySelectorAll(".quick-question");

quickQuestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    questionInput.value = button.textContent;
    askChatbot();
  });
});

askButton.addEventListener("click", askChatbot);

questionInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    askChatbot();
  }
});

async function askChatbot() {
  const question = questionInput.value.trim();

  if (!question) {
    answerText.textContent = "Please enter a question first.";
    return;
  }

  askButton.disabled = true;
  loading.classList.remove("hidden");
  answerText.textContent = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    answerText.textContent = data.answer || "No answer returned.";
  } catch (error) {
    answerText.textContent = "Error: " + error.message;
  } finally {
    askButton.disabled = false;
    loading.classList.add("hidden");
  }
}