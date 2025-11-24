const adviceIdSpan = document.querySelector('.advice-id');
const adviceText = document.querySelector('.advice-text');
const diceBtn = document.querySelector('.dice-btn');

diceBtn.addEventListener('click', getAdvice);

// Fetch advice on load
window.addEventListener('DOMContentLoaded', getAdvice);

function getAdvice() {
    // Prevent multiple clicks while loading
    if (diceBtn.classList.contains('loading')) return;

    diceBtn.classList.add('loading');
    diceBtn.disabled = true;

    // Add timestamp to prevent caching
    const url = `https://api.adviceslip.com/advice?t=${new Date().getTime()}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            adviceIdSpan.innerText = data.slip.id;
            adviceText.innerText = data.slip.advice;
        })
        .catch(err => {
            console.error(`Error fetching advice: ${err}`);
            adviceText.innerText = "Could not fetch advice. Please try again.";
        })
        .finally(() => {
            // Add a small delay so the animation is visible and feels responsive
            setTimeout(() => {
                diceBtn.classList.remove('loading');
                diceBtn.disabled = false;
            }, 500);
        });
}

