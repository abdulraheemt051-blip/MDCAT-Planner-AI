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

async function askAI() {
    let input = document.getElementById("userInput");
    let text = input.value.trim();

    if (text === "") return;

    addMessage(text, "user");
    input.value = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await response.json();

        addMessage(data.reply, "bot");

    } catch (error) {
        console.error(error);
        addMessage("❌ Error connecting to AI.", "bot");
    }
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
