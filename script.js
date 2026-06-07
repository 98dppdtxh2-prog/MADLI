const FEASTS = [
  { m: 1, d: 7, name: "ლოცვა ზიარების წინ" },
  { m: 1, d: 14, name: "ლოცვა აღსარებისთვის" },
  { m: 2, d: 2, name: "ლოცვა დილისთვის" }
];

// ===== MATTHEW QUIZ =====

const questions = [
  {
    q: "სად დაიბადა იესო ქრისტე?",
    options: ["ნაზარეთში", "იერუსალიმში", "კაპერნაუმში", "ბეთლემში"],
    answer: 3,
    feedback: "სწორია! იესო დაიბადა ბეთლემში, დავითის ქალაქში (მათე 2:1)."
  },
  {
    q: "ვინ მოანათლა იესო ქრისტე?",
    options: ["მოციქული პეტრე", "წინასწარმეტყველი ელია", "იოანე ნათლისმცემელი", "მღვდელმთავარი კაიაფა"],
    answer: 2,
    feedback: "სწორია! იოანე ნათლისმცემელმა მოანათლა იესო იორდანე მდინარეში (მათე 3:13-17)."
  },
  {
    q: "რამდენი დღე და ღამე იმარხულა იესომ უდაბნოში?",
    options: ["7", "30", "40", "50"],
    answer: 2,
    feedback: "სწორია! იესომ 40 დღე და 40 ღამე იმარხულა უდაბნოში (მათე 4:2)."
  },
  {
    q: "რომელი ქალაქი იყო იესოს მეორე სახლი ქადაგების დროს?",
    options: ["ნაზარეთი", "ბეთლემი", "ბეთანია", "კაპერნაუმი"],
    answer: 3,
    feedback: "სწორია! კაპერნაუმი გახდა იესოს მეორე სახლი (მათე 4:13)."
  },
  {
    q: "„მთაზე ქადაგებაში“ რამდენი ნეტარება ახსენა იესომ?",
    options: ["9", "5", "7", "12"],
    answer: 0,
    feedback: "სწორია! იესომ 9 ნეტარება წარმოთქვა მთაზე ქადაგებაში (მათე 5:3-11)."
  },
  {
    q: "რომელი ლოცვა ასწავლა იესომ მოწაფეებს?",
    options: ["ფსალმუნი 50", "„მამაო ჩვენო“", "„წმინდა არს“", "„გიხაროდენ“"],
    answer: 1,
    feedback: "სწორია! იესომ ასწავლა „მამაო ჩვენო“ — უფლის ლოცვა (მათე 6:9-13)."
  },
  {
    q: "რამდენი მოციქული აირჩია იესომ?",
    options: ["7", "10", "12", "70"],
    answer: 2,
    feedback: "სწორია! იესომ 12 მოციქული აირჩია (მათე 10:1-4)."
  },
  {
    q: "ვინ იყო პეტრეს ძმა, რომელიც ასევე მოციქული გახდა?",
    options: ["ანდრია", "იაკობი", "იოანე", "ფილიპე"],
    answer: 0,
    feedback: "სწორია! ანდრია იყო პეტრეს ძმა, ორივე მეთევზე (მათე 4:18)."
  },
  {
    q: "რამდენი პური და თევზი გამოიყენა იესომ 5000 კაცის გამოსაკვებად?",
    options: ["2 პური და 5 თევზი", "5 პური და 2 თევზი", "7 პური და 3 თევზი", "10 პური და 5 თევზი"],
    answer: 1,
    feedback: "სწორია! 5 პური და 2 თევზი — ამით გამოკვება 5000 კაცი (მათე 14:17-21)."
  },
  {
    q: "სად ილოცა იესომ ჯვარცმამდე ღამით?",
    options: ["ზეთისხილის მთაზე", "გეთსემანიის ბაღში", "სიონის მთაზე", "იორდანე მდინარესთან"],
    answer: 1,
    feedback: "სწორია! იესომ გეთსემანიის ბაღში ილოცა (მათე 26:36-46)."
  }
];

let current = 0;
let score = 0;
let answered = false;

function startMatthew() {
  current = 0;
  score = 0;

  document.getElementById("quiz-intro-matthew").style.display = "none";
  document.getElementById("quiz-result-area").style.display = "none";
  document.getElementById("quiz-play-area").style.display = "block";

  loadQuestion();
}

function loadQuestion() {
  answered = false;

  const q = questions[current];

  document.getElementById("question-text").textContent = q.q;
  document.getElementById("progress-text").textContent =
    "კითხვა " + (current + 1) + " / " + questions.length;

  document.getElementById("progress-fill").style.width =
    (((current + 1) / questions.length) * 100) + "%";

  document.getElementById("next-btn").style.display = "none";
  document.getElementById("feedback-box").style.display = "none";
  document.getElementById("feedback-box").className = "feedback-box";

  const grid = document.getElementById("options-grid");
  grid.innerHTML = "";

  const letters = ["ა", "ბ", "გ", "დ"];

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = '<span class="option-letter">' + letters[i] + "</span>" + opt;
    btn.onclick = () => selectAnswer(i, btn);
    grid.appendChild(btn);
  });
}

function selectAnswer(index, btn) {
  if (answered) return;

  answered = true;

  const q = questions[current];
  const allBtns = document.querySelectorAll("#options-grid .option-btn");
  const feedback = document.getElementById("feedback-box");

  allBtns.forEach(b => b.disabled = true);

  if (index === q.answer) {
    btn.classList.add("correct");
    score++;
    feedback.className = "feedback-box correct";
    feedback.textContent = "✓ " + q.feedback;
  } else {
    btn.classList.add("wrong");
    allBtns[q.answer].classList.add("correct");
    feedback.className = "feedback-box wrong";
    feedback.innerHTML =
      "<strong>✗ სწორი პასუხია: " + q.options[q.answer] + "</strong><br><br>" +
      q.feedback.replace("სწორია! ", "");
  }

  feedback.style.display = "block";

  const nb = document.getElementById("next-btn");
  nb.style.display = "inline-block";
  nb.textContent =
    current === questions.length - 1 ? "შედეგის ნახვა →" : "შემდეგი კითხვა →";
}

function nextQuestion() {
  current++;

  if (current >= questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

function showResult() {
  document.getElementById("quiz-play-area").style.display = "none";
  document.getElementById("quiz-result-area").style.display = "block";

  document.getElementById("result-score").textContent = score;

  const title = document.getElementById("result-title");
  const stars = document.getElementById("result-stars");
  const msg = document.getElementById("result-message");

  if (score === 10) {
    launchConfetti();
    title.textContent = "☦ სრულყოფილი შედეგი ☦";
    stars.textContent = "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐";
    msg.textContent = "შესანიშნავია! ღმერთმა განგამტკიცოს სიბრძნეში და რწმენაში.";
  } else if (score >= 8) {
    title.textContent = "🥇 დიდებული შედეგი";
    stars.textContent = "⭐⭐⭐⭐⭐⭐⭐⭐☆☆";
    msg.textContent = "ძალიან კარგი ცოდნა გაქვს! კიდევ ცოტაც და სრულყოფილ შედეგს მიაღწევ.";
  } else if (score >= 6) {
    title.textContent = "📖 კარგი შედეგი";
    stars.textContent = "⭐⭐⭐⭐⭐⭐☆☆☆☆";
    msg.textContent = "განაგრძე წმინდა წერილის კითხვა და ცოდნა კიდევ უფრო გაგიღრმავდება.";
  } else if (score >= 4) {
    title.textContent = "🙏 ნუ შეჩერდები";
    stars.textContent = "⭐⭐⭐⭐☆☆☆☆☆☆";
    msg.textContent = "ყოველი კითხვა ახალი ცოდნის დასაწყისია. თავიდან სცადე.";
  } else {
    title.textContent = "🌿 ჯერ კიდევ წინ ხარ";
    stars.textContent = "⭐⭐☆☆☆☆☆☆☆☆";
    msg.textContent = "არ დანებდე. ღმერთმა მოგმადლოს სიბრძნე და შემეცნება.";
  }
}

// ===== JOHN QUIZ =====

const johnQuestions = [
  {
    q: "რომელი სიტყვებით იწყება იოანეს სახარება?",
    options: ["დასაბამიდან იყო სიტყვა", "იესო ქრისტეს შობის წიგნი", "დასაბამს შექმნა ღმერთმა", "მადლი და მშვიდობა თქვენდა"],
    answer: 0,
    feedback: "სწორია! იოანეს სახარება იწყება: „დასაბამიდან იყო სიტყვა...“ (იოანე 1:1)."
  },
  {
    q: "ვის ეწოდება „ღვთის კრავი“ იოანეს სახარებაში?",
    options: ["მოციქული პეტრე", "იოანე ნათლისმცემელი", "იესო ქრისტე", "ლაზარე"],
    answer: 2,
    feedback: "სწორია! იოანე ნათლისმცემელმა იესოს უწოდა „ღვთის კრავი“ (იოანე 1:29)."
  },
  {
    q: "სად მოახდინა იესომ პირველი სასწაული?",
    options: ["იერუსალიმში", "კაპერნაუმში", "ბეთანიაში", "კანაში"],
    answer: 3,
    feedback: "სწორია! პირველი სასწაული იესომ კანაში მოახდინა — წყალი ღვინოდ აქცია (იოანე 2:1-11)."
  },
  {
    q: "ვინ მივიდა იესოსთან ღამით სასაუბროდ?",
    options: ["იოსებ არიმათიელი", "ნიკოდიმოსი", "ლაზარე", "კაიაფა"],
    answer: 1,
    feedback: "სწორია! ნიკოდიმოსი მივიდა იესოსთან ღამით (იოანე 3:1-2)."
  },
  {
    q: "რატომ არ გაიყვეს ჯარისკაცებმა იესოს სამოსელი ჯვარცმისას?",
    options: ["მღვდლებს ეკუთვნოდა", "თავიდან ბოლომდე უნაკეროდ იყო ნაქსოვი", "სისხლით იყო დასვრილი", "იოსებ არიმათიელმა ითხოვა"],
    answer: 1,
    feedback: "სწორია! სამოსელი უნაკეროდ იყო ნაქსოვი, ამიტომ არ დახიეს და წილი უყარეს (იოანე 19:23-24)."
  },
  {
    q: "რამდენი წელი იყო ავადმყოფი კაცი ბეთზათის აუზთან?",
    options: ["12 წელი", "25 წელი", "38 წელი", "40 წელი"],
    answer: 2,
    feedback: "სწორია! კაცი 38 წელი იყო ავადმყოფი (იოანე 5:5)."
  },
  {
    q: "რატომ მივიდა ნიკოდიმოსი იესოსთან ღამით?",
    options: ["დღისით ქალაქში არ იყო", "ფარულად სურდა იესოსთან საუბარი", "იესომ თავად დაიბარა", "ტაძარი ღამით იყო ღია"],
    answer: 1,
    feedback: "სწორია! ნიკოდიმოსი იესოსთან ღამით მივიდა, რაც მის ფარულ ინტერესს აჩვენებს (იოანე 3:1-2)."
  },
  {
    q: "ვინ აღადგინა იესომ მკვდრეთით იოანეს სახარებაში?",
    options: ["იაიროსის ასული", "ნაინელი ქვრივის ძე", "ლაზარე", "სტეფანე"],
    answer: 2,
    feedback: "სწორია! იესომ ლაზარე აღადგინა მკვდრეთით (იოანე 11:43-44)."
  },
  {
    q: "რომელი სიმბოლო გამოიყენა იესომ თავის აღსაწერად?",
    options: ["ლომი", "სვეტი", "ვარსკვლავი", "კარი ცხვართა"],
    answer: 3,
    feedback: "სწორია! იესომ თქვა: „მე ვარ კარი ცხვართა“ (იოანე 10:7)."
  },
  {
    q: "რომელ ენაზე დაიწერა იოანეს სახარება თავდაპირველად?",
    options: ["ბერძნულად", "ებრაულად", "არამეულად", "ლათინურად"],
    answer: 0,
    feedback: "სწორია! ახალი აღთქმის წიგნები, მათ შორის იოანეს სახარება, ბერძნულად დაიწერა."
  }
];

let johnCurrent = 0;
let johnScore = 0;
let johnAnswered = false;

function startJohn() {
  johnCurrent = 0;
  johnScore = 0;

  document.getElementById("quiz-intro-john").style.display = "none";
  document.getElementById("quiz-john-result-area").style.display = "none";
  document.getElementById("quiz-john-play-area").style.display = "block";

  loadJohnQuestion();
}

function loadJohnQuestion() {
  johnAnswered = false;

  const q = johnQuestions[johnCurrent];

  document.getElementById("john-question-text").textContent = q.q;
  document.getElementById("john-progress-text").textContent =
    "კითხვა " + (johnCurrent + 1) + " / " + johnQuestions.length;

  document.getElementById("john-progress-fill").style.width =
    (((johnCurrent + 1) / johnQuestions.length) * 100) + "%";

  document.getElementById("john-next-btn").style.display = "none";
  document.getElementById("john-feedback-box").style.display = "none";
  document.getElementById("john-feedback-box").className = "feedback-box";

  const grid = document.getElementById("john-options-grid");
  grid.innerHTML = "";

  const letters = ["ა", "ბ", "გ", "დ"];

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = '<span class="option-letter">' + letters[i] + "</span>" + opt;
    btn.onclick = () => selectJohnAnswer(i, btn);
    grid.appendChild(btn);
  });
}

function selectJohnAnswer(index, btn) {
  if (johnAnswered) return;

  johnAnswered = true;

  const q = johnQuestions[johnCurrent];
  const allBtns = document.querySelectorAll("#john-options-grid .option-btn");
  const fb = document.getElementById("john-feedback-box");

  allBtns.forEach(b => b.disabled = true);

  if (index === q.answer) {
    btn.classList.add("correct");
    johnScore++;
    fb.className = "feedback-box correct";
    fb.textContent = "✓ " + q.feedback;
  } else {
    btn.classList.add("wrong");
    allBtns[q.answer].classList.add("correct");
    fb.className = "feedback-box wrong";
    fb.innerHTML =
      "<strong>✗ სწორი პასუხია: " + q.options[q.answer] + "</strong><br><br>" +
      q.feedback.replace("სწორია! ", "");
  }

  fb.style.display = "block";

  const nb = document.getElementById("john-next-btn");
  nb.style.display = "inline-block";
  nb.textContent =
    johnCurrent === johnQuestions.length - 1 ? "შედეგის ნახვა →" : "შემდეგი კითხვა →";
}

function johnNext() {
  johnCurrent++;

  if (johnCurrent >= johnQuestions.length) {
    document.getElementById("quiz-john-play-area").style.display = "none";
    document.getElementById("quiz-john-result-area").style.display = "block";

    document.getElementById("john-result-score").textContent = johnScore;

    const title = document.getElementById("result-title");
    const stars = document.getElementById("result-stars");
    const msg = document.getElementById("john-result-message");

    showQuizResult(johnScore, johnQuestions.length, title, stars, msg);
  } else {
    loadJohnQuestion();
  }
}

// ===== ACTS QUIZ =====

const actsQuestions = [
  {
    q: "ვინ არის „საქმე მოციქულთა“-ს ავტორი?",
    options: ["მოციქული პეტრე", "მოციქული პავლე", "ლუკა მახარებელი", "მოციქული იოანე"],
    answer: 2,
    feedback: "სწორია! მოციქულთა საქმეები დაწერა ლუკა მახარებელმა (საქმე 1:1)."
  },
  {
    q: "რომელ დღესასწაულზე გარდამოვიდა სულიწმინდა მოციქულებზე?",
    options: ["პასექზე", "ფერისცვალებაზე", "პენტეკოსტეზე", "შობაზე"],
    answer: 2,
    feedback: "სწორია! სულიწმინდა მოციქულებზე პენტეკოსტეს დღეს გარდამოვიდა (საქმე 2:1-4)."
  },
  {
    q: "რამდენი ადამიანი მოინათლა პეტრეს პირველი ქადაგების შემდეგ?",
    options: ["100", "500", "3000", "5000"],
    answer: 2,
    feedback: "სწორია! დაახლოებით 3000 სული მოინათლა (საქმე 2:41)."
  },
  {
    q: "ვინ იყო პირველი ქრისტიანი მოწამე?",
    options: ["მოციქული იაკობი", "სტეფანე", "ანანია", "ფილიპე"],
    answer: 1,
    feedback: "სწორია! პირველი ქრისტიანი მოწამე იყო სტეფანე (საქმე 7:54-60)."
  },
  {
    q: "ვინ იყო სავლე პავლედ მოქცევამდე?",
    options: ["მეთევზე", "ფარისეველი და ქრისტიანთა მდევნელი", "მეზვერე", "სამარიელი"],
    answer: 1,
    feedback: "სწორია! სავლე ქრისტიანებს დევნიდა, სანამ დამასკოს გზაზე ქრისტე არ გამოეცხადა (საქმე 9:1-6)."
  },
  {
    q: "რომელ ქალაქთან გამოეცხადა იესო სავლეს?",
    options: ["იერუსალიმთან", "ანტიოქიასთან", "დამასკოსთან", "კორინთოსთან"],
    answer: 2,
    feedback: "სწორია! იესო სავლეს დამასკოს გზაზე გამოეცხადა (საქმე 9:3-6)."
  },
  {
    q: "როგორ გაიქცა პავლე დამასკოდან?",
    options: ["ეკლესიაში დაიმალა", "კალათით ჩამოუშვეს კედლიდან", "მღვიმეში დაიმალა", "რომაელებმა გააპარეს"],
    answer: 1,
    feedback: "სწორია! პავლე კალათით ჩამოუშვეს კედლიდან (საქმე 9:25)."
  },
  {
    q: "რით დაისაჯნენ პავლე და სილა ფილიპეში?",
    options: ["გაძევებით", "ქვებით ჩაქოლვით", "მათრახით ცემით და საპყრობილეში ჩასმით", "სიკვდილით"],
    answer: 2,
    feedback: "სწორია! პავლე და სილა სცემეს და საპყრობილეში ჩასვეს (საქმე 16:22-24)."
  },
  {
    q: "ვინ აირჩიეს იუდა ისკარიოტელის ნაცვლად მეთორმეტე მოციქულად?",
    options: ["ბარნაბა", "მათია", "სტეფანე", "სილა"],
    answer: 1,
    feedback: "სწორია! იუდას ნაცვლად მოციქულად მათია აირჩიეს (საქმე 1:26)."
  },
  {
    q: "ვინ იყო პირველი წარმართი, რომელიც ქრისტიანობაზე მოექცა?",
    options: ["კორნელიოსი", "ლონგინოზი", "იულიუსი", "ფილიპე"],
    answer: 0,
    feedback: "სწორია! კორნელიოსი იყო რომაელი ასისთავი, რომელიც მოინათლა (საქმე 10)."
  }
];

let actsCurrent = 0;
let actsScore = 0;
let actsAnswered = false;

function startActs() {
  actsCurrent = 0;
  actsScore = 0;

  document.getElementById("quiz-intro-acts").style.display = "none";
  document.getElementById("quiz-acts-result-area").style.display = "none";
  document.getElementById("quiz-acts-play-area").style.display = "block";

  loadActsQuestion();
}

function loadActsQuestion() {
  actsAnswered = false;

  const q = actsQuestions[actsCurrent];

  document.getElementById("acts-question-text").textContent = q.q;
  document.getElementById("acts-progress-text").textContent =
    "კითხვა " + (actsCurrent + 1) + " / " + actsQuestions.length;

  document.getElementById("acts-progress-fill").style.width =
    (((actsCurrent + 1) / actsQuestions.length) * 100) + "%";

  document.getElementById("acts-next-btn").style.display = "none";
  document.getElementById("acts-feedback-box").style.display = "none";
  document.getElementById("acts-feedback-box").className = "feedback-box";

  const grid = document.getElementById("acts-options-grid");
  grid.innerHTML = "";

  const letters = ["ა", "ბ", "გ", "დ"];

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = '<span class="option-letter">' + letters[i] + "</span>" + opt;
    btn.onclick = () => selectActsAnswer(i, btn);
    grid.appendChild(btn);
  });
}

function selectActsAnswer(index, btn) {
  if (actsAnswered) return;

  actsAnswered = true;

  const q = actsQuestions[actsCurrent];
  const allBtns = document.querySelectorAll("#acts-options-grid .option-btn");
  const fb = document.getElementById("acts-feedback-box");

  allBtns.forEach(b => b.disabled = true);

  if (index === q.answer) {
    btn.classList.add("correct");
    actsScore++;
    fb.className = "feedback-box correct";
    fb.textContent = "✓ " + q.feedback;
  } else {
    btn.classList.add("wrong");
    allBtns[q.answer].classList.add("correct");
    fb.className = "feedback-box wrong";
    fb.innerHTML =
      "<strong>✗ სწორი პასუხია: " + q.options[q.answer] + "</strong><br><br>" +
      q.feedback.replace("სწორია! ", "");
  }

  fb.style.display = "block";

  const nb = document.getElementById("acts-next-btn");
  nb.style.display = "inline-block";
  nb.textContent =
    actsCurrent === actsQuestions.length - 1 ? "შედეგის ნახვა →" : "შემდეგი კითხვა →";
}

function actsNext() {
  actsCurrent++;

  if (actsCurrent >= actsQuestions.length) {
    document.getElementById("quiz-acts-play-area").style.display = "none";
    document.getElementById("quiz-acts-result-area").style.display = "block";

    document.getElementById("acts-result-score").textContent = actsScore;

    const title = document.getElementById("result-title");
    const stars = document.getElementById("result-stars");
    const msg = document.getElementById("acts-result-message");

    showQuizResult(actsScore, actsQuestions.length, title, stars, msg);
  } else {
    loadActsQuestion();
  }
}

// ===== TORAH QUIZ =====

const torahQuestions = [
  {
    q: "რატომ ეწოდა იაკობს სახელი „ისრაელი“?",
    options: ["რადგან ქანაანში გადასახლდა", "რადგან ღმერთთან იბრძოლა და გაიმარჯვა", "რადგან ისააკმა აკურთხა", "რადგან თორმეტი ძე შეეძინა"],
    answer: 1,
    feedback: "სწორია! იაკობს ღმერთთან ბრძოლის შემდეგ ეწოდა „ისრაელი“ (დაბადება 32:28)."
  },
  {
    q: "რომელი ნიშანი დაუდო ღმერთმა ნოესთან დადებულ აღთქმას?",
    options: ["ცეცხლი", "ცისარტყელა", "ქვის ფირფიტები", "მანანა"],
    answer: 1,
    feedback: "სწორია! ღმერთმა ნოესთან დადებული აღთქმის ნიშნად ცისარტყელა დაადგინა (დაბადება 9:13-17)."
  },
  {
    q: "რატომ გაყიდეს იოსები მისმა ძმებმა?",
    options: ["შიმშილის გამო", "ფარაონის ბრძანებით", "შურისა და სიძულვილის გამო", "რადგან იოსებმა თავად ითხოვა"],
    answer: 2,
    feedback: "სწორია! იოსების ძმებს მისი შურდათ და სძულდათ, ამიტომ ის ისმაელელებს მიჰყიდეს (დაბადება 37:4, 28)."
  },
  {
    q: "რა იყო პასექის მთავარი მნიშვნელობა გამოსვლის წიგნში?",
    options: ["ისრაელის ეგვიპტიდან გამოხსნის გახსენება", "სინაის მთაზე ასვლის დღე", "მანანის პირველი გამოჩენა", "აღთქმის კიდობნის აგება"],
    answer: 0,
    feedback: "სწორია! პასექი ისრაელის ეგვიპტიდან გამოხსნის მოსაგონებლად დაწესდა (გამოსვლა 12:13-14)."
  },
  {
    q: "რატომ ვერ შევიდა მოსე აღთქმულ ქვეყანაში?",
    options: ["რადგან ფარაონთან დაბრუნდა", "რადგან ხალხმა უარი თქვა მის წინამძღოლობაზე", "რადგან მერიბასთან ღმერთის ბრძანება არ აღასრულა ზუსტად", "რადგან აარონმა აუკრძალა"],
    answer: 2,
    feedback: "სწორია! მოსემ მერიბასთან ღმერთის ბრძანება ზუსტად არ აღასრულა, ამიტომ აღთქმულ ქვეყანაში ვერ შევიდა (რიცხვნი 20:12; მეორე რჯული 32:51-52)."
  },
  {
    q: "რა იყო მანანა?",
    options: ["საკურთხევლის ზეთი", "ზეციდან მოცემული საკვები უდაბნოში", "სინაის მთის ქვა", "აარონის კვერთხი"],
    answer: 1,
    feedback: "სწორია! მანანა იყო ზეციდან მოცემული საკვები, რომლითაც ღმერთი კვებავდა ისრაელს უდაბნოში (გამოსვლა 16:14-15)."
  },
  {
    q: "რას გამოხატავდა აღთქმის კიდობანი ისრაელისთვის?",
    options: ["მეფის ძალაუფლებას", "ეგვიპტის სიმდიდრეს", "ღმერთის ყოფნასა და აღთქმას ხალხთან", "მოსეს პირად საკუთრებას"],
    answer: 2,
    feedback: "სწორია! აღთქმის კიდობანი ღმერთის ყოფნისა და აღთქმის სიმბოლო იყო (გამოსვლა 25:21-22)."
  },
  {
    q: "რატომ იხეტიალა ისრაელმა 40 წელი უდაბნოში?",
    options: ["რადგან გზა დაკარგეს", "რადგან ღმერთს არ ენდნენ და აღთქმულ ქვეყანაში შესვლის შეეშინდათ", "რადგან მოსემ დააგვიანა", "რადგან ეგვიპტეში დაბრუნება უნდოდათ"],
    answer: 1,
    feedback: "სწორია! ხალხმა ღმერთს არ ენდო, ამიტომ 40 წელი იხეტიალა უდაბნოში (რიცხვნი 14:33-34)."
  },
  {
    q: "რომელი ორი მზვერავი დარჩა ღმერთის ერთგული ქანაანის დაზვერვის შემდეგ?",
    options: ["მოსე და აარონი", "იოშუა და ქალები", "ელეაზარი და ფინეხასი", "იუდა და ლევი"],
    answer: 1,
    feedback: "სწორია! მხოლოდ იოშუამ და ქალებმა მოუწოდეს ხალხს ღმერთის ნდობისკენ (რიცხვნი 14:6-9)."
  },
  {
    q: "რა იყო ოქროს ხბოს შექმნის მთავარი ცოდვა?",
    options: ["მოსეს დაუმორჩილებლობა", "კერპთაყვანისმცემლობა", "შაბათის დარღვევა", "მარხვის დარღვევა"],
    answer: 1,
    feedback: "სწორია! ხალხმა ღმერთის ნაცვლად ოქროს ხბოს სცა თაყვანი (გამოსვლა 32:4-8)."
  },
  {
    q: "რომელი ტომიდან იყვნენ მოსე და აარონი?",
    options: ["იუდას", "ლევის", "ბენიამინის", "ეფრემის"],
    answer: 1,
    feedback: "სწორია! მოსე და აარონი ლევის ტომიდან იყვნენ (გამოსვლა 2:1; 6:20)."
  },
  {
    q: "რატომ ითვლება აბრაამის მიერ ისააკის შეწირვის მზადყოფნა რწმენის უდიდეს მაგალითად?",
    options: ["რადგან მსხვერპლი უკვე შეწირული იყო", "რადგან ღმერთს ყველაზე ძვირფასი დაუმორჩილებლად შესწირა", "რადგან ღმერთის ნებას ბოლომდე დაემორჩილა", "რადგან ანგელოზმა აიძულა"],
    answer: 2,
    feedback: "სწორია! აბრაამმა ღმერთისადმი სრული მორჩილება და რწმენა გამოავლინა (დაბადება 22:10-12)."
  },
  {
    q: "რა იყო ათი მცნების მთავარი დანიშნულება?",
    options: ["სამხედრო წესების დადგენა", "ღმერთთან აღთქმისა და ზნეობრივი ცხოვრების საფუძვლის მიცემა", "მხოლოდ მღვდლებისთვის კანონების დაწესება", "სასამართლოს შექმნა"],
    answer: 1,
    feedback: "სწორია! ათი მცნება ღმერთთან აღთქმისა და ზნეობრივი ცხოვრების საფუძველია (გამოსვლა 20:1-17)."
  },
  {
    q: "რას გვასწავლის ბალაამის ისტორია?",
    options: ["ფულს ყველაფრის შეცვლა შეუძლია", "ღმერთის ნებას ადამიანი ვერ შეცვლის", "წყევლა ყოველთვის ძლიერია კურთხევაზე", "ბალაკი მართალი იყო"],
    answer: 1,
    feedback: "სწორია! ღმერთის ნებას ვერავინ შეცვლის, ამიტომ ბალაამმაც ისრაელი აკურთხა (რიცხვნი 23:19-20)."
  },
  {
    q: "რას უსვამს ყველაზე მეტად ხაზს მეორე რჯული?",
    options: ["სამხედრო ძალას", "ღმერთის სიყვარულს, მორჩილებასა და აღთქმის ერთგულებას", "მსხვერპლშეწირვის რაოდენობას", "მეფის ძალაუფლებას"],
    answer: 1,
    feedback: "სწორია! მეორე რჯული განსაკუთრებულად უსვამს ხაზს ღმერთის სიყვარულსა და მისი მცნებების დაცვას (მეორე რჯული 6:4-9; 30:15-20)."
  }
];

let torahCurrent = 0;
let torahScore = 0;
let torahAnswered = false;

function startTorah() {
  torahCurrent = 0;
  torahScore = 0;

  document.getElementById("quiz-intro-torah").style.display = "none";
  document.getElementById("quiz-torah-result-area").style.display = "none";
  document.getElementById("quiz-torah-play-area").style.display = "block";

  loadTorahQuestion();
}

function loadTorahQuestion() {
  torahAnswered = false;

  const q = torahQuestions[torahCurrent];

  document.getElementById("torah-question-text").textContent = q.q;
  document.getElementById("torah-progress-text").textContent =
    "კითხვა " + (torahCurrent + 1) + " / " + torahQuestions.length;

  document.getElementById("torah-progress-fill").style.width =
    (((torahCurrent + 1) / torahQuestions.length) * 100) + "%";

  document.getElementById("torah-next-btn").style.display = "none";
  document.getElementById("torah-feedback-box").style.display = "none";
  document.getElementById("torah-feedback-box").className = "feedback-box";

  const grid = document.getElementById("torah-options-grid");
  grid.innerHTML = "";

  const letters = ["ა", "ბ", "გ", "დ"];

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = '<span class="option-letter">' + letters[i] + "</span>" + opt;
    btn.onclick = () => selectTorahAnswer(i, btn);
    grid.appendChild(btn);
  });
}

function selectTorahAnswer(index, btn) {
  if (torahAnswered) return;

  torahAnswered = true;

  const q = torahQuestions[torahCurrent];
  const allBtns = document.querySelectorAll("#torah-options-grid .option-btn");
  const fb = document.getElementById("torah-feedback-box");

  allBtns.forEach(b => b.disabled = true);

  if (index === q.answer) {
    btn.classList.add("correct");
    torahScore++;
    fb.className = "feedback-box correct";
    fb.textContent = "✓ " + q.feedback;
  } else {
    btn.classList.add("wrong");
    allBtns[q.answer].classList.add("correct");
    fb.className = "feedback-box wrong";
    fb.innerHTML =
      "<strong>✗ სწორი პასუხია: " + q.options[q.answer] + "</strong><br><br>" +
      q.feedback.replace("სწორია! ", "");
  }

  fb.style.display = "block";

  const nb = document.getElementById("torah-next-btn");
  nb.style.display = "inline-block";
  nb.textContent =
    torahCurrent === torahQuestions.length - 1 ? "შედეგის ნახვა →" : "შემდეგი კითხვა →";
}

function torahNext() {
  torahCurrent++;

  if (torahCurrent >= torahQuestions.length) {
    document.getElementById("quiz-torah-play-area").style.display = "none";
    document.getElementById("quiz-torah-result-area").style.display = "block";

    document.getElementById("torah-result-score").textContent = torahScore;

    const title = document.getElementById("result-title");
    const stars = document.getElementById("result-stars");
    const msg = document.getElementById("torah-result-message");

    showQuizResult(torahScore, torahQuestions.length, title, stars, msg);
  } else {
    loadTorahQuestion();
  }
}

// ===== SHARED RESULT FUNCTION =====

function showQuizResult(scoreValue, total, title, stars, msg) {
  if (scoreValue === total) {
    launchConfetti();
    title.textContent = "☦ სრულყოფილი შედეგი ☦";
    stars.textContent = "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐";
    msg.textContent = "შესანიშნავია! ღმერთმა განგამტკიცოს სიბრძნეში და რწმენაში.";
  } else if (scoreValue >= total * 0.8) {
    title.textContent = "🥇 დიდებული შედეგი";
    stars.textContent = "⭐⭐⭐⭐⭐⭐⭐⭐☆☆";
    msg.textContent = "ძალიან კარგი შედეგია! კიდევ ცოტაც და სრულყოფილ შედეგს მიაღწევ.";
  } else if (scoreValue >= total * 0.6) {
    title.textContent = "📖 კარგი შედეგი";
    stars.textContent = "⭐⭐⭐⭐⭐⭐☆☆☆☆";
    msg.textContent = "კარგი შედეგია. განაგრძე წმინდა წერილის კითხვა.";
  } else if (scoreValue >= total * 0.4) {
    title.textContent = "🙏 ნუ შეჩერდები";
    stars.textContent = "⭐⭐⭐⭐☆☆☆☆☆☆";
    msg.textContent = "ყოველი კითხვა ახალი ცოდნის დასაწყისია. თავიდან სცადე.";
  } else {
    title.textContent = "🌿 ჯერ კიდევ წინ ხარ";
    stars.textContent = "⭐⭐☆☆☆☆☆☆☆☆";
    msg.textContent = "არ დანებდე. ღმერთმა მოგმადლოს სიბრძნე და შემეცნება.";
  }
}

// ===== CALENDAR =====

const GEO_MONTHS = [
  "იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი",
  "ივლისი","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი"
];

const GEO_DAYS = [
  "კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"
];

function initCalendar() {
  const today = new Date();
  const m = today.getMonth() + 1;
  const d = today.getDate();

  const dayName = GEO_DAYS[today.getDay()];
  const monthName = GEO_MONTHS[m - 1];

  const oldStyle = new Date(today);
  oldStyle.setDate(today.getDate() - 13);

  const todayDate = document.getElementById("today-date");
  const todayOld = document.getElementById("today-date-old");

  if (todayDate) {
    todayDate.textContent = dayName + ", " + d + " " + monthName + " " + today.getFullYear();
  }

  if (todayOld) {
    todayOld.textContent =
      "ძველი სტილი: " +
      oldStyle.getDate() + " " +
      GEO_MONTHS[oldStyle.getMonth()] + " " +
      oldStyle.getFullYear();
  }

  const tabsDiv = document.getElementById("month-tabs");
  if (!tabsDiv) return;

  tabsDiv.innerHTML = "";

  GEO_MONTHS.forEach((mn, i) => {
    const btn = document.createElement("button");
    btn.textContent = mn;
    btn.id = "tab-" + (i + 1);
    btn.onclick = () => showMonth(i + 1);

    btn.style.padding = "8px 14px";
    btn.style.fontFamily = "'Cinzel', serif";
    btn.style.fontSize = "0.65rem";
    btn.style.letterSpacing = "0.1em";
    btn.style.borderRadius = "2px";
    btn.style.cursor = "pointer";
    btn.style.transition = "all 0.3s";

    tabsDiv.appendChild(btn);
  });

  showMonth(m);
}

function showMonth(m) {
  for (let i = 1; i <= 12; i++) {
    const tab = document.getElementById("tab-" + i);
    if (!tab) continue;

    if (i === m) {
      tab.style.background = "linear-gradient(135deg,#8a6f2e,#c9a84c)";
      tab.style.color = "#0d0a07";
      tab.style.border = "1px solid transparent";
    } else {
      tab.style.background = "transparent";
      tab.style.color = "#8a6f2e";
      tab.style.border = "1px solid rgba(201,168,76,0.2)";
    }
  }

  const div = document.getElementById("month-events");
  if (!div) return;

  const events = FEASTS
    .filter(f => f.m == m)
    .sort((a, b) => a.d - b.d);

  div.innerHTML = "";

  if (events.length === 0) {
    div.innerHTML =
      '<p style="color:#8a6f2e;font-style:italic;text-align:center;padding:24px;">ამ თვეში ჩანაწერი არ არის</p>';
    return;
  }

  const title = document.createElement("p");
  title.textContent = GEO_MONTHS[m - 1].toUpperCase();
  title.style.fontFamily = "'Cinzel', serif";
  title.style.fontSize = "0.7rem";
  title.style.letterSpacing = "0.3em";
  title.style.color = "#8a6f2e";
  title.style.marginBottom = "16px";
  div.appendChild(title);

  events.forEach(f => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "16px";
    row.style.padding = "14px 0";
    row.style.borderBottom = "1px solid rgba(201,168,76,0.1)";

    const day = document.createElement("div");
    day.textContent = f.d;
    day.style.fontFamily = "'Cinzel', serif";
    day.style.fontSize = "1rem";
    day.style.color = "#c9a84c";
    day.style.minWidth = "36px";
    day.style.textAlign = "center";

    const name = document.createElement("div");
    name.textContent = f.name;
    name.style.fontSize = "1rem";
    name.style.color = "#f5edd8";
    name.style.lineHeight = "1.5";

    row.appendChild(day);
    row.appendChild(name);
    div.appendChild(row);
  });
}

// ===== BACK TO TOP =====

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.id = "backToTop";
  btn.textContent = "↑";
  document.body.appendChild(btn);

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY && currentScrollY > 300) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }

    lastScrollY = currentScrollY;
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

// ===== CONFETTI =====

function launchConfetti() {
  for (let i = 0; i < 120; i++) {
    const piece = document.createElement("div");

    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDelay = Math.random() * 2 + "s";

    piece.style.background = [
      "#c9a84c",
      "#f5edd8",
      "#b8860b",
      "#ffd700"
    ][Math.floor(Math.random() * 4)];

    document.body.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 5000);
  }
}