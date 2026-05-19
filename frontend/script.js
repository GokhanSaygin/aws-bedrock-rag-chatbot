const API_URL = "https://vczzlfdpm2.execute-api.us-east-1.amazonaws.com/chat";

const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const answerText = document.getElementById("answerText");
const loading = document.getElementById("loading");

askButton.addEventListener("click", async () => {
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
});
