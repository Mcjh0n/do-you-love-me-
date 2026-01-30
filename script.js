const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const mainText = document.getElementById("main-text");
const subText = document.getElementById("sub-text");
const gifImg = document.getElementById("gif-img");

// 3 Different GIFs for the 3 rejection steps
const rejectionSteps = [
    {
        text: "Are you sure?",
        sub: "Think about it... 🥺",
        imgSrc: "https://media.tenor.com/tsFBHGxponYAAAAj/bubu-dudu.gif" 
    },
    {
        text: "Really sure?",
        sub: "Don't break my heart... 💔",
        imgSrc: "https://media.tenor.com/Wcu9oaorv8kAAAAi/tramell-tillman.gif"
    },
    {
        text: "Last chance!",
        sub: "Please don't do this! 😭",
        imgSrc: "https://media.tenor.com/SFy5Za0DyMEAAAAj/erm-fingers.gif"
    }
];

let step = 0;
let yesBtnSize = 1;

noBtn.addEventListener("click", () => {
    
    // If we are still within the steps (0, 1, 2)
    if (step < rejectionSteps.length) {
        const currentData = rejectionSteps[step];
        
        mainText.innerText = currentData.text;
        subText.innerText = currentData.sub;
        gifImg.src = currentData.imgSrc;
        
        // Mobile Safety: Stop growing if it gets too big (Max 2.5x size)
        if (yesBtnSize < 2.5) {
            yesBtnSize += 0.3;
            yesBtn.style.transform = `scale(${yesBtnSize})`;
        }
        
        step++;
    } 
    // FIX: If they click "No" AFTER the steps are done, move the button immediately
    else {
        moveNoButton();
    }
    
    // If we just finished the last step, enable the "Run Away" mode
    if (step === rejectionSteps.length) {
        // Add Mouse Hover (Desktop)
        noBtn.addEventListener("mouseover", moveNoButton);
        
        // Add Touch (Mobile) - This fixes the mobile issue
        noBtn.addEventListener("touchstart", moveNoButton);

        noBtn.innerText = "No";
        noBtn.style.backgroundColor = "#ffccd5"; 
    }
});

// Function to move the button randomly
function moveNoButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = "fixed"; // Use fixed to ensure it can go anywhere on screen
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

yesBtn.addEventListener("click", () => {
    document.body.innerHTML = `
        <div class="container">
            <img src="https://media.tenor.com/ECATiSXWwm8AAAAi/dancing-cat-cat.gif" alt="Success" style="max-width: 200px; border-radius: 15px;">
            <h1 style="margin-top: 20px; color: #e63946;">Hehehehe! ❤️</h1>
            <p style="color: #666;">I knew you'd say yes!</p>
        </div>
    `;
    document.body.style.background = "#fff0f3";

    // Confetti Explosion Logic
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});
