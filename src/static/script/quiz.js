"use strict";



let question_list = [];

function get_questions_from_local_storage() {
    // Retrieve the string from localStorage
    const storedQuestions = localStorage.getItem('question_list');
    // Convert the string back into a JSON object
    question_list = storedQuestions ? JSON.parse(storedQuestions) : null;
};

get_questions_from_local_storage();


let current_question = 0;

function rotate_question() {
    document.getElementById("quest-text").textContent = question_list[current_question].questionText;
    document.getElementById("answ-1").textContent = question_list[current_question].answers[0];
    document.getElementById("answ-2").textContent = question_list[current_question].answers[1];
    document.getElementById("answ-3").textContent = question_list[current_question].answers[2];
    document.getElementById("answ-4").textContent = question_list[current_question].answers[3];
};

rotate_question();


async function process_quiz_result() {
    let results = [];
    const game_mode = localStorage.getItem("game_mode");
    const username = localStorage.getItem("username");
    const category_id = localStorage.getItem("category_id");
    const topic_id = localStorage.getItem("topic_id");

    return fetch(`${api_url}process-quiz-result`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question_list, game_mode, username, category_id, topic_id })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.removeItem("question_list");
        results = data;
        return results;
        
    })
};


function process_user_answer(user_answer) {
    question_list[current_question].answerUser = user_answer;
    current_question++;
    
    if (current_question >= (question_list.length)) {
        process_quiz_result().then(results => {
            localStorage.setItem("question_list", JSON.stringify(results.question_list));
            localStorage.setItem("result", JSON.stringify(results.result));
            window.location.href = "/quizresult";
        });
    } else {
        rotate_question();
    }
};


document.getElementById("answ-1").addEventListener("click", e => {
    e.preventDefault();
    process_user_answer(1);
});

document.getElementById("answ-2").addEventListener("click", e => {
    e.preventDefault();
    process_user_answer(2);
});

document.getElementById("answ-3").addEventListener("click", e => {
    e.preventDefault();
    process_user_answer(3);
});

document.getElementById("answ-4").addEventListener("click", e => {
    e.preventDefault();
    process_user_answer(4);
});

// function fetchImage(imageId) {
//     const imageUrl = `/serve-image/${imageId}`;  // Flask route URL
    
//     // Use fetch to get the image
//     fetch(imageUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.blob();  // Convert the response to a Blob (binary data)
//       })
//       .then(blob => {
//         // Create a URL for the Blob and set it as the src of the <img> tag
//         const imgUrl = URL.createObjectURL(blob);
//         document.getElementById('image').src = imgUrl;
//       })
//       .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
// };

