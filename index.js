const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const modeBtn = document.getElementById("mode-btn");
const body = document.body;
const commentsList = document.getElementById("comments-list");
const commentInput = document.getElementById("comment-input");
const postCommentBtn = document.getElementById("post-comment-btn");

btn.addEventListener("click", searchWord);
document.addEventListener("keydown", handleKeyDown);
modeBtn.addEventListener("click", toggleMode);
postCommentBtn.addEventListener("click", postComment);

function searchWord() {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
            <p class="word-example">${data[0].meanings[0].definitions[0].example || ""}</p>`;
        sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Could not find the word</h3>`;
    });
}

function playSound() {
    sound.play();
}

function handleKeyDown(event) {
    if (event.key === "Enter") {
        searchWord();
    }
}

function toggleMode() {
    body.classList.toggle("dark-mode");
}

function postComment() {
    const commentText = commentInput.value.trim();
    if (commentText !== "") {
        const commentItem = document.createElement("li");
        commentItem.innerText = commentText;
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            commentItem.remove();
        });
        commentItem.appendChild(deleteBtn);
        commentsList.appendChild(commentItem);
        commentInput.value = "";
    }
}
