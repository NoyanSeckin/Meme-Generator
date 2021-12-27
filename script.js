// Creating variables to refer html elements
const meme_img = document.querySelector("#meme-img");
const button = document.getElementById("generator-btn");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".fa-arrow-right");
const spinner = document.querySelector(".spinner");
let counter = 0;
let imgArr = [
  "https://previews.123rf.com/images/roxanabalint/roxanabalint1911/roxanabalint191100066/134226729-let-s-have-fun-sign-or-stamp-on-white-background-vector-illustration.jpg",
];
meme_img.setAttribute("src", imgArr[counter]);

// A function which fetches meme apis
const getMemes = async () => {
  const response = await fetch("https://meme-api.herokuapp.com/gimme");
  if (response.status !== 200) {
    throw new Error("Rejected: Could not fetch data");
  }
  const data = await response.json();
  return data;
};

// Goes forward and makes requests
rightArrow.addEventListener("click", function () {
  counter++;
  meme_img.setAttribute("src", imgArr[counter]);

  console.log("right arrow clicked");
  if (imgArr.length === counter) {
    spinner.classList.remove("d-none");
    meme_img.classList.add("d-none");
    getMemes()
      .then((data) => imgArr.push(data.url))
      .then(() => {
        meme_img.setAttribute("src", imgArr[counter]);
        meme_img.classList.remove("d-none");
        spinner.classList.add("d-none");
      });
  }
  counter > 0 ? (leftArrow.disabled = false) : (leftArrow.disabled = true);
  console.log(counter);
});

// Goes backwards
leftArrow.addEventListener("click", function () {
  counter--;
  meme_img.setAttribute("src", imgArr[counter]);
  counter > 0 ? (leftArrow.disabled = false) : (leftArrow.disabled = true);
});

leftArrow.disabled = true;
