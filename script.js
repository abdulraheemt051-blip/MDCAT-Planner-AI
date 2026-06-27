console.log("JS connected successfully!");

// Feature buttons
function sendToAI(topic) {
    let output = document.getElementById("output");

    let reply = "";

    if (topic === "mcq") {
        reply = "📝 MCQs:\n1) Sample MCQ 1\n2) Sample MCQ 2";
    }
    else if (topic === "planner") {
        reply = "📅 Today Plan:\n- Biology: 3 hours\n- Chemistry: 2 hours";
    }
    else if (topic === "ai") {
        reply = "🤖 AI Assistant:\nStudy help + MCQs + Planner";
    }

    output.innerHTML = reply.replace(/\n/g, "<br>");
}


// Chat function
function askAI() {
    let input = document.getElementById("userInput");
    let chat = document.getElementById("chat");

    let text = input.value.trim();
    if (text === "") return;

    addMessage(text, "user");

    let reply = "";

    if (text.toLowerCase().includes("photosynthesis")) {
        reply = "🌿 Plants make food using sunlight.";
    }
    else if (text.toLowerCase().includes("mcq")) {
        reply = "📝 MCQs available in MCQ section.";
    }
    else {
        reply = "🤖 I am still learning...";
    }

    setTimeout(() => {
        addMessage(reply, "bot");
    }, 500);

    input.value = "";
}


// Add message
function addMessage(text, type) {
    let chat = document.getElementById("chat");

    let msg = document.createElement("div");
    msg.innerText = text;
    msg.classList.add(type);

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}


// Enter key support (SAFE version)
document.addEventListener("DOMContentLoaded", function () {
    let input = document.getElementById("userInput");

    if (input) {
        input.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                askAI();
            }
        });
    }
});
