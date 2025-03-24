/*
Community Page
*/


document.addEventListener("DOMContentLoaded", function () {
    const isLogined = localStorage.getItem("logined") === "true";

    function likeBtn(event) {

        if (!isLogined) {
            alert("Please Login First");
            window.location.href = "login.html";
            return;
        }

        let wasLiked = event.target.classList.contains("liked");
        event.target.classList.toggle("liked");

        if (!wasLiked) {
            event.target.classList.add("no-hover");

            setTimeout(() => {
                event.target.classList.remove("no-hover");
            }, 1000);
        } else {
            event.target.classList.add("no-hover-liked");

            setTimeout(() => {
                event.target.classList.remove("no-hover-liked");
            }, 1000);
        }
    }

    function replyBtn(event) {

        if (!isLogined) {
            alert("Please Login First");
            window.location.href = "login.html";
            return;
        }

        let post = event.target.closest(".post");
        let existingReplySection = document.querySelector(".separate-reply-div");

        if (existingReplySection) {
            existingReplySection.remove();
        }

        let separateReplyDiv = document.createElement("div");
        separateReplyDiv.setAttribute("class", "separate-reply-div");

        let replySection = document.createElement("div");
        replySection.setAttribute("class", "reply-section");

        let replyInput = document.createElement("input");
        replyInput.setAttribute("type", "text");
        replyInput.setAttribute("placeholder", "Reply");
        replyInput.setAttribute("class", "reply-input");

        let submitBtn = document.createElement("button");
        submitBtn.innerText = "Post Reply";
        submitBtn.setAttribute("class", "submit-reply-btn");

        replySection.appendChild(replyInput);
        replySection.appendChild(submitBtn);
        separateReplyDiv.appendChild(replySection);

        post.after(separateReplyDiv);

        submitBtn.addEventListener("click", submitReply);
    }

    function submitReply(event) {
        let replySection = event.target.closest(".reply-section");
        let replyInput = replySection.querySelector(".reply-input");
        let separateReplyDiv = event.target.closest(".separate-reply-div");

        let replyText = replyInput.value;
        if (replyText !== "") {
            let comment = document.createElement("div");
            comment.setAttribute("class", "comment");
            comment.innerHTML = "<p><strong>You:</strong> " + replyText + "</p>";

            separateReplyDiv.after(comment);
            
            replyInput.value = "";

            separateReplyDiv.remove();
        }
    }


    let likeBtnElements = document.getElementsByClassName("like-btn");
    for (let i = 0; i < likeBtnElements.length; i++) {
        likeBtnElements[i].addEventListener("click", likeBtn);
    }

    let replyBtnElements = document.getElementsByClassName("reply-btn");
    for (let i = 0; i < replyBtnElements.length; i++) {
        replyBtnElements[i].addEventListener("click", replyBtn);
    }
});

/*
Achievements
*/
document.addEventListener("DOMContentLoaded", function () {
    const achievementCards = document.querySelectorAll(".achv-card");
    const isLogined = localStorage.getItem("logined") === "true";

    achievementCards.forEach(card => {
        const progressBar = card.querySelector(".achv-progress");
        const button = card.querySelector("button");

        if (progressBar && button) {
            button.addEventListener("click", function () {

                if (!isLogined) {
                    alert("Please Login First");
                    window.location.href = "login.html";
                    return;
                }

                if (progressBar.value < progressBar.max) {
                    progressBar.value++;
                    updateMainProgress();
                }
            });
        }
    });

    function updateMainProgress() {
        const allAchievements = document.querySelectorAll(".achv-progress");
        const mainProgress = document.querySelector("main progress");
        let completed = [...allAchievements].filter(bar => bar.value >= bar.max).length;
        
        if (mainProgress) {
            mainProgress.value = completed;
            mainProgress.max = allAchievements.length;
        }
    }
});
/*
Eco-maps
*/
document.addEventListener("DOMContentLoaded", function () {
    const figures = document.querySelectorAll(".image-container figure");
    const iframes = document.querySelectorAll(".image-container iframe");
    function showOnly(element) {
        figures.forEach(fig => fig.style.display = "none");
        iframes.forEach(frame => frame.style.display = "none");

        if (element) {
            element.style.display = "block";
        }
    }
    document.querySelectorAll(".map-button").forEach(button => {
        button.addEventListener("click", function () {
            const target = this.getAttribute("data-target");
            const iframe = document.getElementById(target);
            if (iframe) {
                showOnly(iframe);
            } else {
                const img = document.querySelector(`.image-container img[alt='${target}']`);
                if (img) {
                    showOnly(img.parentElement);
                }
            }
        });
    });
});

/*
Profile
*/
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.todo input[type="checkbox"]');
    const progressBar = document.getElementById("progressBar");
  
    let completed = 0;
    const total = checkboxes.length;
    let counted = 0;

    const tasksCompleted = document.getElementById("tasksDone");
    if (tasksCompleted){
        tasksCompleted.textContent = counted;
    }

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          completed++;
          counted++;

            if (tasksCompleted){
            tasksCompleted.textContent = counted;
            }
          
          const taskDiv = checkbox.parentElement;
          taskDiv.style.display = "none";
  
          const percent = Math.min((completed / total) * 100, 100);
          progressBar.style.width = percent + "%";

          const percentDisplayed = document.getElementById("statusBar");

          if (percentDisplayed){
            percentDisplayed.textContent = percent + "%";
          }
        }
      });
    });
    if (document.getElementById("resetBtn")){
        document.getElementById("resetBtn").addEventListener("click", function(){
        const task = document.querySelectorAll(".todo div");
        const per = document.getElementById("statusBar");
        task.forEach(x =>{
            x.style.display = "flex";
            x.style.fontSize = "30px";
            x.style.padding = "3px";
            const checkbox = x.querySelector("input[type = 'checkbox']");
            if (checkbox){
            checkbox.checked = false;
            }

        })

        counted = 0;
        completed = 0

        document.getElementById("progressBar").style.width = "0%";
        document.getElementById("tasksDone").textContent = "0";
        document.getElementById("statusBar").textContent = "0%"


        })
    }
  });

document.addEventListener("DOMContentLoaded", function(){
    const isLogined = localStorage.getItem("logined") === "true";
    const profileID = document.getElementById("profileID");
    const loginID = document.getElementById("loginID");

    if (isLogined){
        profileID.style.display = "inline-block";
        loginID.style.display = "none";
    }
    else{
        profileID.style.display = "none";
        loginID.style.display = "inline-block";
    }

    const logOutBtn = document.getElementById("logOut");
    if (logOutBtn) {
        logOutBtn.addEventListener("click", function(){
            localStorage.setItem("logined", "false")
            window.location.href = "login.html";
        })
    }
    const loginForm = document.getElementById("loginForm");
    if (loginForm){
        loginForm.addEventListener("submit", function(e){
            e.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
        
            if (email === "Emily.Wilk3000@gmail.com" && password === "Emily3000") {
                localStorage.setItem("logined", "true");
                window.location.href = "profile.html"
            }
            else{
                alert("You have entered either an incorrect email or password. Please try again(Email: Emily.Wilk3000@gmail.com Password: Emily3000)");
            }
        })
    }
})

/*
Contact
*/

function validateForm(){
    var email = document.getElementById("email").value;
    var regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!regex.test(email)){
      alert("Please enter a valid email address (e.g. {name}@gmail.com");
      return false;
    }

    alert("you have sent a message to ECO-LIFE. Thank you for reaching out to us.");

    return true;
  }