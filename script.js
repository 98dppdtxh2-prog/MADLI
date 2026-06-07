function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById('page-' + id).style.display = 'block';
}
const FEASTS = [
  { m: 1, d: 7, name: "ლოცვა ზიარების წინ" },
  { m: 1, d: 14, name: "ლოცვა აღსარებისთვის" },
  { m: 2, d: 2, name: "ლოცვა დილისთვის" }
];

// ---- NAVIGATION ----
function showPage(pageId) {
  if(pageId==='quiz-john') { showPage('_quiz-john'); initJohn(); return; }
  if(pageId==='calendar') { showPage('_calendar_internal'); initCalendar(); return; }
  if(pageId==='quiz-acts') { showPage('_quiz-acts'); initActs(); return; }
  const realId = pageId === '_calendar_internal' ? 'calendar' : pageId.startsWith('_') ? pageId.slice(1) : pageId;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + realId).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const map = { 'home':'nav-home','quiz-list':'nav-quiz','quiz-play':'nav-quiz','_quiz-john':'nav-quiz','_quiz-acts':'nav-quiz','stories-list':'nav-stories','story-1':'nav-stories','news-list':'nav-news','news-1':'nav-news','calendar':'nav-calendar','_calendar_internal':'nav-calendar','prayers':'nav-prayers','ghirts-natsv':'nav-prayers','prayer-morning':'nav-prayers','prayer-evening':'nav-prayers','prayer-confession-before':'nav-prayers','prayer-confession-after':'nav-prayers','prayer-communion-before':'nav-prayers','prayer-communion-after':'nav-prayers' };
  if (map[pageId]) document.getElementById(map[pageId]).classList.add('active');
  window.scrollTo(0, 0);
  if (pageId === 'quiz-play') { document.getElementById('quiz-intro-matthew').style.display='block'; document.getElementById('quiz-play-area').style.display='none'; document.getElementById('quiz-result-area').style.display='none'; }
  // Update URL hash
  const hashMap = {'home':'','quiz-list':'quiz','_quiz-john':'quiz-john','_quiz-acts':'quiz-acts','quiz-play':'quiz-matthew','stories-list':'stories','story-1':'story-1','news-list':'news','news-1':'news-1','_calendar_internal':'calendar','prayers':'prayers','ghirts-natsv':'ghirts-natsv','prayer-morning':'prayer-morning','prayer-evening':'prayer-evening','prayer-confession-before':'prayer-confession-before','prayer-confession-after':'prayer-confession-after','prayer-communion-before':'prayer-communion-before','prayer-communion-after':'prayer-communion-after'};
  const hash = hashMap[pageId] !== undefined ? hashMap[pageId] : pageId;
  history.replaceState(null, '', hash ? '#'+hash : window.location.pathname);
}

function startMatthew() {
  document.getElementById('quiz-intro-matthew').style.display = 'none';
  document.getElementById('quiz-play-area').style.display = 'block';
}

function handleHash() {
  const hash = window.location.hash.replace('#','');
  const hashToPage = {'quiz':'quiz-list','quiz-john':'quiz-john','quiz-acts':'quiz-acts','quiz-matthew':'quiz-play','stories':'stories-list','story-1':'story-1','news':'news-list','news-1':'news-1','calendar':'calendar','prayers':'prayers','ghirts-natsv':'ghirts-natsv','prayer-morning':'prayer-morning','prayer-evening':'prayer-evening','prayer-confession-before':'prayer-confession-before','prayer-confession-after':'prayer-confession-after','prayer-communion-before':'prayer-communion-before','prayer-communion-after':'prayer-communion-after'};
  if(hash && hashToPage[hash]) showPage(hashToPage[hash]);
  else showPage('home');
}
window.addEventListener('load', handleHash);

function nextQuestion() {
  console.log("next question");
}

function restartQuiz() {
  document.getElementById('quiz-result-area').style.display = 'none';
  document.getElementById('quiz-play-area').style.display = 'none';
  document.getElementById('quiz-intro-matthew').style.display = 'block';

  current = 0;
  score = 0;
}

// ---- QUIZ ----
const questions = [
  { q: "სად დაიბადა იესო ქრისტე?", options: ["ნაზარეთში","იერუსალიმში","კაპერნაუმში","ბეთლემში",], answer: 3, feedback: "სწორია! იესო დაიბადა ბეთლემში, დავითის ქალაქში (მათე 2:1)." },
  { q: "ვინ მოანათლა იესო ქრისტე?", options: ["მოციქული პეტრე","წინასწარმეტყველი ელია","იოანე ნათლისმცემელი","მღვდელმთავარი კაიაფა"], answer: 2, feedback: "სწორია! იოანე ნათლისმცემელმა მოანათლა იესო იორდანე მდინარეში (მათე 3:13-17)." },
  { q: "რამდენი დღე და ღამე იმარხულა იესომ უდაბნოში?", options: ["7","30","40","50"], answer: 2, feedback: "სწორია! იესომ 40 დღე და 40 ღამე იმარხულა უდაბნოში (მათე 4:2)." },
  { q: "რომელი ქალაქი იყო იესოს მეორე სახლი ქადაგების დროს?", options: ["ნაზარეთი","ბეთლემი","ბეთანია","კაპერნაუმი"], answer: 3, feedback: "სწორია! კაპერნაუმი გახდა იესოს მეორე სახლი (მათე 4:13)." },
  { q: "\"მთაზე ქადაგებაში\" რამდენი ნეტარება ახსენა იესომ?", options: ["9","5","7","12"], answer: 0, feedback: "სწორია! იესომ 9 ნეტარება წარმოთქვა მთაზე ქადაგებაში (მათე 5:3-11)." },
  { q: "რომელი ლოცვა ასწავლა იესომ მოწაფეებს?", options: ["ფსალმუნი 50","\"მამაო ჩვენო\"","\"წმინდა არს\"","\"გიხაროდენ\""], answer: 1, feedback: "სწორია! იესომ ასწავლა \"მამაო ჩვენო\" — უფლის ლოცვა (მათე 6:9-13)." },
  { q: "რამდენი მოციქული აირჩია იესომ?", options: ["7","10","12","70"], answer: 2, feedback: "სწორია! იესომ 12 მოციქული აირჩია (მათე 10:1-4)." },
  { q: "ვინ იყო პეტრეს ძმა, რომელიც ასევე მოციქული გახდა?", options: ["ანდრია","იაკობი","იოანე","ფილიპე"], answer: 2, feedback: "სწორია! ანდრია იყო პეტრეს ძმა, ორივე მეთევზე (მათე 4:18)." },
  { q: "რამდენი პური და თევზი გამოიყენა იესომ 5000 კაცის გამოსაკვებად?", options: ["2 პური და 5 თევზი","5 პური და 2 თევზი","7 პური და 3 თევზი","10 პური და 5 თევზი"], answer: 1, feedback: "სწორია! 5 პური და 2 თევზი — ამით გამოკვება 5000 კაცი (მათე 14:17-21)." },
  { q: "სად ილოცა იესომ ჯვარცმამდე ღამით?", options: ["ზეთისხილის მთაზე","გეთსემანიის ბაღში","სიონის მთაზე","იორდანე მდინარესთან"], answer: 1, feedback: "სწორია! იესომ გეთსემანიის ბაღში ილოცა (მათე 26:36-46)." }
];
let current = 0, score = 0, answered = false;

function startMatthew() {
  document.getElementById('quiz-intro-matthew').style.display='none';
  document.getElementById('quiz-play-area').style.display='block';
  initQuiz();
}
function startJohn() {
  johnCurrent=0; johnScore=0;
  document.getElementById('quiz-intro-john').style.display='none';
  document.getElementById('quiz-john-play-area').style.display='block';
  loadJohnQuestion();
}
function startActs() {
  actsCurrent=0; actsScore=0;
  document.getElementById('quiz-intro-acts').style.display='none';
  document.getElementById('quiz-acts-play-area').style.display='block';
  loadActsQuestion();
}
function initQuiz() {
  current = 0; score = 0;
  document.getElementById('quiz-play-area').style.display = 'block';
  document.getElementById('quiz-result-area').style.display = 'none';
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  const q = questions[current];
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('progress-text').textContent = 'კითხვა ' + (current+1) + ' / ' + questions.length;
  document.getElementById('progress-fill').style.width = (((current+1)/questions.length)*100) + '%';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('feedback-box').style.display = 'none';
  document.getElementById('feedback-box').className = 'feedback-box';
  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  const letters = ['ა','ბ','გ','დ'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = '<span class="option-letter">'+letters[i]+'</span>'+opt;
    btn.onclick = () => selectAnswer(i, btn);
    grid.appendChild(btn);
  });
}

function selectAnswer(index, btn) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);
  const feedback = document.getElementById('feedback-box');
  if (index === q.answer) { btn.classList.add('correct'); score++; feedback.className='feedback-box correct'; feedback.textContent='✓ '+q.feedback; }
  else { btn.classList.add('wrong'); allBtns[q.answer].classList.add('correct'); feedback.className='feedback-box wrong'; feedback.innerHTML='<strong>✗ სწორი პასუხია: '+q.options[q.answer]+'</strong><br><br>'+q.feedback.replace('სწორია! ',''); }
  feedback.style.display = 'block';
  const nb = document.getElementById('next-btn');
  nb.style.display = 'inline-block';
  nb.textContent = current === questions.length-1 ? 'შედეგის ნახვა →' : 'შემდეგი კითხვა →';
}

function nextQuestion() {
  current++;
  if (current >= questions.length) showResult();
  else loadQuestion();
}

function showResult() {
  document.getElementById('quiz-play-area').style.display = 'none';
  document.getElementById('quiz-result-area').style.display = 'block';

  document.getElementById('result-score').textContent = score;

  const title = document.getElementById("result-title");
  const stars = document.getElementById("result-stars");
  const msg = document.getElementById("result-message");

 if (score === 10) {
   launchConfetti();
    title.textContent = "☦ სრულყოფილი შედეგი ☦";
    msg.textContent = "შესანიშნავია! ღმერთმა განგამტკიცოს სიბრძნეში და რწმენაში.";
    stars.textContent = "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐";
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

const johnQuestions = [
  { q: "რომელი სიტყვებით იწყება იოანეს სახარება?", options: ["დასაბამიდან იყო სიტყვა","იესო ქრისტეს შობის წიგნი","დასაბამს შექმნა ღმერთმა","მადლი და მშვიდობა თქვენდა"], answer: 0, feedback: "სწორია! იოანეს სახარება იწყება: 'დასაბამიდან იყო სიტყვა, და სიტყვა იყო ღმერთთან' (იოანე 1:1)." },
  { q: "ვის ეწოდება 'ღვთის კრავი' იოანეს სახარებაში?", options: ["მოციქული პეტრე","იოანე ნათლისმცემელი","იესო ქრისტე","ლაზარე"], answer: 2, feedback: "სწორია! იოანე ნათლისმცემელმა იესოს შესახებ თქვა: 'აჰა ღვთის კრავი, რომელი აღხოცავს ცოდვასა სოფლისასა' (იოანე 1:29)." },
  { q: "სად მოახდინა იესომ პირველი სასწაული?", options: ["იერუსალიმში","კაპერნაუმში","ბეთანიაში","კანაში"], answer: 3, feedback: "სწორია! იესომ პირველი სასწაული კანაში მოახდინა — წყალი ღვინოდ აქცია (იოანე 2:1-11)." },
  { q: "ვინ მოვიდა იესოსთან ღამით სასაუბროდ?", options: ["იოსებ არიმათიელი","ნიკოდიმოსი","ლაზარე","კაიაფა"], answer: 1, feedback: "სწორია! ნიკოდიმოსი, ფარისეველი და იუდეველთა მთავარი, მოვიდა იესოსთან ღამით (იოანე 3:1-2)." },
  { q: "იოანეს სახარების მიხედვით, იესოს სამოსელი ჯვარცმისას რატომ არ გაიყვეს ჯარისკაცებმა?", options: ["იმიტომ, რომ მღვდლებს ეკუთვნოდა","იმიტომ, რომ თავიდან ბოლომდე უნაკეროდ ნაქსოვი იყო","იმიტომ, რომ სისხლით იყო დასვრილი","იმიტომ, რომ იოსებ არიმათიელმა ითხოვა"], answer: 1, feedback: "სწორია! იოანეს 19:23-24-ის მიხედვით, სამოსელი თავიდან ბოლომდე უნაკეროდ იყო ნაქსოვი, ამიტომ წილი უყარეს და არ დახიეს." },
  { q: "რამდენი წელი იყო ავადმყოფი კაცი ბეთზათის აუზთან?", options: ["12 წელი","25 წელი","38 წელი","40 წელი"], answer: 2, feedback: "სწორია! კაცი 38 წელი იყო ავადმყოფი, სანამ იესომ განკურნა (იოანე 5:5)." },
  { q: "იოანეს სახარების მიხედვით, რატომ მივიდა ნიკოდიმოსი იესოსთან ღამით?", options: ["რადგან დღისით ქალაქში არ იყო","რადგან ეშინოდა იუდეველთა და ფარულად სურდა იესოსთან საუბარი","რადგან იესომ თავად დაიბარა","რადგან ტაძარი ღამით იყო ღია" ], answer: 1, feedback: "სწორია! ნიკოდიმოსი ფარისეველი იყო და, სავარაუდოდ, იუდეველთა შიშითა და ფარული ინტერესის გამო ღამით მივიდა იესოსთან სასაუბროდ (იოანე 3)." },
  { q: "ვინ აღადგინა იესომ მკვდრეთით იოანეს სახარებაში?", options: ["იაიროსის ასული","ნაინელი ქვრივის ძე","ლაზარე","სტეფანე"], answer: 2, feedback: "სწორია! იესომ ლაზარე აღადგინა მკვდრეთით ბეთანიაში (იოანე 11)." },
  { q: "რა სიმბოლო გამოიყენა იესომ სახარებაში თავის აღსაწერად?", options: ["ლომი","სვეტი","ვარსკვლავი","კარი ცხვართა"], answer: 3, feedback: "სწორია! იესომ თქვა: 'მე ვარ კარი ცხვართა' (იოანე 10:7)." },
  { q: "რომელ ენაზე იყო დაწერილი იოანეს სახარება თავდაპირველად?", options: ["ბერძნულად","ებრაულად","არამეულად","ლათინურად"], answer: 0, feedback: "სწორია! ახალი აღთქმა, მათ შორის იოანეს სახარება, თავდაპირველად ბერძნულ ენაზე დაიწერა." }
];
const actsQuestions = [
  { q: "ვინ არის 'საქმე მოციქულთა'-ს ავტორი?", options: ["მოციქული პეტრე","მოციქული პავლე","ლუკა მახარებელი","მოციქული იოანე"], answer: 2, feedback: "სწორია! მოციქულთა საქმეები დაწერა ლუკა მახარებელმა, ისევე როგორც ლუკას სახარება (საქმე 1:1)." },
  { q: "სულიწმინდის გარდამოსვლა მოციქულებზე — რომელ დღესასწაულზე მოხდა?", options: ["პასექზე","ფერისცვალებაზე","პენტეკოსტეზე","შობაზე"], answer: 2, feedback: "სწორია! სულიწმინდა გარდამოვიდა პენტეკოსტეს (მიძინებიდან 50-ე დღეს) (საქმე 2:1-4)." },
  { q: "რამდენი ადამიანი მოინათლა პეტრეს პირველი ქადაგების შემდეგ?", options: ["100","500","3000","5000"], answer: 2, feedback: "სწორია! პეტრეს ქადაგების შემდეგ დაახლოებით 3000 სული მოინათლა (საქმე 2:41)." },
  { q: "ვინ იყო პირველი მოწამე ქრისტიანობის ისტორიაში?", options: ["მოციქული იაკობი","სტეფანე","ანანია","ფილიპე"], answer: 1, feedback: "სწორია! სტეფანე გახდა პირველი ქრისტიანი მოწამე — ჩაქოლეს (საქმე 7:54-60)." },
  { q: "ვინ იყო სავლე სანამ პავლედ გახდებოდა?", options: ["მეთევზე","ფარისეველი და ქრისტიანთა მდევნელი","მეზვერე","სამარიელი"], answer: 1, feedback: "სწორია! სავლე ფარისეველი იყო და ქრისტიანებს დევნიდა სანამ გზაზე იესო არ გამოეცხადა (საქმე 9)." },
  { q: "რომელ ქალაქთან გამოეცხადა იესო სავლეს?", options: ["იერუსალიმთან","ანტიოქიასთან","დამასკოსთან","კორინთოსთან"], answer: 2, feedback: "სწორია! იესო სავლეს გამოეცხადა დამასკოსისაკენ მიმავალ გზაზე (საქმე 9:3-6)." },
  { q: "სად დაიმალა პავლე დამასკოში მტრებისგან გაქცევისას?", options: ["ეკლესიაში","კალათაში გორაკზე","კედლის ნახვრეტში","მღვიმეში"], answer: 1, feedback: "სწორია! პავლე კალათაში ჩამოუშვეს კედლიდან ღამით და დამასკოდან გაიქცა (საქმე 9:25)." },
  { q: "რით დაისაჯნენ პავლე და სილა ფილიპეში?", options: ["გაძევებით","ქვებით ჩაქოლვით","მათრახით და საპყრობილეში გამოკეტვით","სიკვდილით"], answer: 2, feedback: "სწორია! პავლე და სილა მათრახით სცემეს და საპყრობილეში გამოკეტეს ფილიპეში (საქმე 16:23)." },
  { q: "ვინ აირჩიეს წილისყრით მეთორმეტე მოციქულად იუდა ისკარიოტელის ნაცვლად?", options: ["ბარნაბა","მათია","სტეფანე","სილა"], answer: 1, feedback: "სწორია! მათია აირჩიეს წილისყრით მეთორმეტე მოციქულად (საქმე 1:26)." },
  { q: "ვინ იყო ის რომაელი ასისთავი, რომელიც პირველი მოექცა ქრისტიანობაზე წარმართთაგან?", options: ["კორნელიოსი","ლონგინოზი","იულიუსი","ფილიპე"], answer: 0, feedback: "სწორია! კორნელიოსი, რომაელი ასისთავი, იყო პირველი წარმართი ვინც მოინათლა (საქმე 10)." }
];
const torahQuestions = [
```js
const torahQuestions = [
{
q:"რატომ ეწოდა იაკობს სახელი „ისრაელი“?",
options:["რადგან ქანაანში გადასახლდა","რადგან ღმერთთან იბრძოლა და გაიმარჯვა","რადგან ისააკმა აკურთხა","რადგან თორმეტი ძე შეეძინა"],
answer:1,
feedback:"სწორია! იაკობს ღმერთთან ბრძოლის შემდეგ ეწოდა „ისრაელი“ (დაბადება 32:28)."
},
{
q:"რომელი ნიშანი დაუდო ღმერთმა ნოესთან დადებულ აღთქმას?",
options:["ცეცხლი","ცისარტყელა","ქვის ფირფიტები","მანანა"],
answer:1,
feedback:"სწორია! ღმერთმა ნოესთან დადებული აღთქმის ნიშნად ცისარტყელა დაადგინა (დაბადება 9:13-17)."
},
{
q:"რატომ გაყიდეს იოსები მისმა ძმებმა?",
options:["შიმშილის გამო","ფარაონის ბრძანებით","შურისა და სიძულვილის გამო","რადგან იოსებმა თავად ითხოვა"],
answer:2,
feedback:"სწორია! იოსების ძმებს მისი შურდათ და სძულდათ, ამიტომ ის ისმაელელებს მიჰყიდეს (დაბადება 37:4, 28)."
},
{
q:"რა იყო პასექის მთავარი მნიშვნელობა გამოსვლის წიგნში?",
options:["ისრაელის ეგვიპტიდან გამოხსნის გახსენება","სინაის მთაზე ასვლის დღე","მანანის პირველი გამოჩენა","აღთქმის კიდობნის აგება"],
answer:0,
feedback:"სწორია! პასექი ისრაელის ეგვიპტიდან გამოხსნის მოსაგონებლად დაწესდა (გამოსვლა 12:13-14)."
},
{
q:"რატომ ვერ შევიდა მოსე აღთქმულ ქვეყანაში?",
options:["რადგან ფარაონთან დაბრუნდა","რადგან ხალხმა უარი თქვა მის წინამძღოლობაზე","რადგან მერიბასთან ღმერთის ბრძანება არ აღასრულა ზუსტად","რადგან აარონმა აუკრძალა"],
answer:2,
feedback:"სწორია! მოსემ მერიბასთან ღმერთის ბრძანება ზუსტად არ აღასრულა, ამიტომ აღთქმულ ქვეყანაში ვერ შევიდა (რიცხვნი 20:12; მეორე რჯული 32:51-52)."
},
{
q:"რა იყო მანანა?",
options:["საკურთხევლის ზეთი","ზეციდან მოცემული საკვები უდაბნოში","სინაის მთის ქვა","აარონის კვერთხი"],
answer:1,
feedback:"სწორია! მანანა იყო ზეციდან მოცემული საკვები, რომლითაც ღმერთი კვებავდა ისრაელს უდაბნოში (გამოსვლა 16:14-15)."
},
{
q:"რას გამოხატავდა აღთქმის კიდობანი ისრაელისთვის?",
options:["მეფის ძალაუფლებას","ეგვიპტის სიმდიდრეს","ღმერთის ყოფნასა და აღთქმას ხალხთან","მოსეს პირად საკუთრებას"],
answer:2,
feedback:"სწორია! აღთქმის კიდობანი ღმერთის ყოფნისა და აღთქმის სიმბოლო იყო (გამოსვლა 25:21-22)."
},
{
q:"რატომ იხეტიალა ისრაელმა 40 წელი უდაბნოში?",
options:["რადგან გზა დაკარგეს","რადგან ღმერთს არ ენდნენ და აღთქმულ ქვეყანაში შესვლის შეეშინდათ","რადგან მოსემ დააგვიანა","რადგან ეგვიპტეში დაბრუნება უნდოდათ"],
answer:1,
feedback:"სწორია! ხალხმა ღმერთს არ ენდო, ამიტომ 40 წელი იხეტიალა უდაბნოში (რიცხვნი 14:33-34)."
},
{
q:"რომელი ორი მზვერავი დარჩა ღმერთის ერთგული ქანაანის დაზვერვის შემდეგ?",
options:["მოსე და აარონი","იოშუა და ქალები","ელეაზარი და ფინეხასი","იუდა და ლევი"],
answer:1,
feedback:"სწორია! მხოლოდ იოშუამ და ქალებმა მოუწოდეს ხალხს ღმერთის ნდობისკენ (რიცხვნი 14:6-9)."
},
{
q:"რა იყო ოქროს ხბოს შექმნის მთავარი ცოდვა?",
options:["მოსეს დაუმორჩილებლობა","კერპთაყვანისმცემლობა","შაბათის დარღვევა","მარხვის დარღვევა"],
answer:1,
feedback:"სწორია! ხალხმა ღმერთის ნაცვლად ოქროს ხბოს სცა თაყვანი (გამოსვლა 32:4-8)."
},
{
q:"რომელი ტომიდან იყვნენ მოსე და აარონი?",
options:["იუდას","ლევის","ბენიამინის","ეფრემის"],
answer:1,
feedback:"სწორია! მოსე და აარონი ლევის ტომიდან იყვნენ (გამოსვლა 2:1; 6:20)."
},
{
q:"რატომ ითვლება აბრაამის მიერ ისააკის შეწირვის მზადყოფნა რწმენის უდიდეს მაგალითად?",
options:["რადგან მსხვერპლი უკვე შეწირული იყო","რადგან ღმერთს ყველაზე ძვირფასი დაუმორჩილებლად შესწირა","რადგან ღმერთის ნებას ბოლომდე დაემორჩილა","რადგან ანგელოზმა აიძულა"],
answer:2,
feedback:"სწორია! აბრაამმა ღმერთისადმი სრული მორჩილება და რწმენა გამოავლინა (დაბადება 22:10-12)."
},
{
q:"რა იყო ათი მცნების მთავარი დანიშნულება?",
options:["სამხედრო წესების დადგენა","ღმერთთან აღთქმისა და ზნეობრივი ცხოვრების საფუძვლის მიცემა","მხოლოდ მღვდლებისთვის კანონების დაწესება","სასამართლოს შექმნა"],
answer:1,
feedback:"სწორია! ათი მცნება ღმერთთან აღთქმისა და ზნეობრივი ცხოვრების საფუძველია (გამოსვლა 20:1-17)."
},
{
q:"რას გვასწავლის ბალაამის ისტორია?",
options:["ფულს ყველაფრის შეცვლა შეუძლია","ღმერთის ნებას ადამიანი ვერ შეცვლის","წყევლა ყოველთვის ძლიერია კურთხევაზე","ბალაკი მართალი იყო"],
answer:1,
feedback:"სწორია! ღმერთის ნებას ვერავინ შეცვლის, ამიტომ ბალაამმაც ისრაელი აკურთხა (რიცხვნი 23:19-20)."
},
{
q:"რას უსვამს ყველაზე მეტად ხაზს მეორე რჯული?",
options:["სამხედრო ძალას","ღმერთის სიყვარულს, მორჩილებასა და აღთქმის ერთგულებას","მსხვერპლშეწირვის რაოდენობას","მეფის ძალაუფლებას"],
answer:1,
feedback:"სწორია! მეორე რჯული განსაკუთრებულად უსვამს ხაზს ღმერთის სიყვარულსა და მისი მცნებების დაცვას (მეორე რჯული 6:4-9; 30:15-20)."
}
];
let torahCurrent = 0;
let torahScore = 0;
let torahAnswered = false;

function startTorah() {
  torahCurrent = 0;
  torahScore = 0;

  document.getElementById('quiz-intro-torah').style.display = 'none';
  document.getElementById('quiz-torah-result-area').style.display = 'none';
  document.getElementById('quiz-torah-play-area').style.display = 'block';

  loadTorahQuestion();
}

function loadTorahQuestion() {
  torahAnswered = false;

  const q = torahQuestions[torahCurrent];

  document.getElementById('torah-question-text').textContent = q.q;
  document.getElementById('torah-progress-text').textContent =
    'კითხვა ' + (torahCurrent + 1) + ' / ' + torahQuestions.length;

  document.getElementById('torah-progress-fill').style.width =
    (((torahCurrent + 1) / torahQuestions.length) * 100) + '%';

  document.getElementById('torah-next-btn').style.display = 'none';
  document.getElementById('torah-feedback-box').style.display = 'none';
  document.getElementById('torah-feedback-box').className = 'feedback-box';

  const grid = document.getElementById('torah-options-grid');
  grid.innerHTML = '';

  const letters = ['ა', 'ბ', 'გ', 'დ'];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = '<span class="option-letter">' + letters[i] + '</span>' + opt;
    btn.onclick = () => selectTorahAnswer(i, btn);
    grid.appendChild(btn);
  });
}

function selectTorahAnswer(index, btn) {
  if (torahAnswered) return;

  torahAnswered = true;

  const q = torahQuestions[torahCurrent];
  const allBtns = document.querySelectorAll('#torah-options-grid .option-btn');

  allBtns.forEach(b => b.disabled = true);

  const fb = document.getElementById('torah-feedback-box');

  if (index === q.answer) {
    btn.classList.add('correct');
    torahScore++;
    fb.className = 'feedback-box correct';
    fb.textContent = '✓ ' + q.feedback;
  } else {
    btn.classList.add('wrong');
    allBtns[q.answer].classList.add('correct');
    fb.className = 'feedback-box wrong';
    fb.innerHTML =
      '<strong>✗ სწორი პასუხია: ' + q.options[q.answer] + '</strong><br><br>' +
      q.feedback.replace('სწორია! ', '');
  }

  fb.style.display = 'block';

  const nb = document.getElementById('torah-next-btn');
  nb.style.display = 'inline-block';
  nb.textContent =
    torahCurrent === torahQuestions.length - 1 ? 'შედეგის ნახვა →' : 'შემდეგი კითხვა →';
}

function torahNext() {
  torahCurrent++;

  if (torahCurrent >= torahQuestions.length) {
    document.getElementById('quiz-torah-play-area').style.display = 'none';
    document.getElementById('quiz-torah-result-area').style.display = 'block';

    document.getElementById('torah-result-score').textContent = torahScore;

    const title = document.getElementById("result-title");
    const stars = document.getElementById("result-stars");
    const msg = document.getElementById("torah-result-message");

    if (torahScore === 15) {
      launchConfetti();
      title.textContent = "☦ სრულყოფილი შედეგი ☦";
      stars.textContent = "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐";
      msg.textContent = "შესანიშნავია! თორის შესახებ ცოდნა ძალიან ძლიერად გაქვს.";
    } else if (torahScore >= 12) {
      title.textContent = "🥇 დიდებული შედეგი";
      stars.textContent = "⭐⭐⭐⭐⭐⭐⭐⭐☆☆";
      msg.textContent = "ძალიან კარგი შედეგია! თორის ძირითადი თემები კარგად იცი.";
    } else if (torahScore >= 9) {
      title.textContent = "📖 კარგი შედეგი";
      stars.textContent = "⭐⭐⭐⭐⭐⭐☆☆☆☆";
      msg.textContent = "კარგი შედეგია. განაგრძე მოსეს ხუთწიგნეულის კითხვა.";
    } else if (torahScore >= 6) {
      title.textContent = "🙏 ნუ შეჩერდები";
      stars.textContent = "⭐⭐⭐⭐☆☆☆☆☆☆";
      msg.textContent = "კარგი დასაწყისია. თავიდან სცადე და ცოდნას გაიღრმავებ.";
    } else {
      title.textContent = "🌿 ჯერ კიდევ წინ ხარ";
      stars.textContent = "⭐⭐☆☆☆☆☆☆☆☆";
      msg.textContent = "არ დანებდე. თორა დიდი და ღრმა მასალაა.";
    }

  } else {
    loadTorahQuestion();
  }
}

let johnCurrent=0, johnScore=0, johnAnswered=false;
let actsCurrent=0, actsScore=0, actsAnswered=false;

function initJohn() {
  johnCurrent=0; johnScore=0;
  document.getElementById('quiz-intro-john').style.display='block';
  document.getElementById('quiz-john-play-area').style.display='none';
  document.getElementById('quiz-john-result-area').style.display='none';
}
function loadJohnQuestion() {
  johnAnswered=false;
  const q=johnQuestions[johnCurrent];
  document.getElementById('john-question-text').textContent=q.q;
  document.getElementById('john-progress-text').textContent='კითხვა '+(johnCurrent+1)+' / '+johnQuestions.length;
  document.getElementById('john-progress-fill').style.width=(((johnCurrent+1)/johnQuestions.length)*100)+'%';
  document.getElementById('john-next-btn').style.display='none';
  document.getElementById('john-feedback-box').style.display='none';
  document.getElementById('john-feedback-box').className='feedback-box';
  const grid=document.getElementById('john-options-grid');
  grid.innerHTML='';
  const letters=['ა','ბ','გ','დ'];
  q.options.forEach((opt,i)=>{
    const btn=document.createElement('button');
    btn.className='option-btn';
    btn.innerHTML='<span class="option-letter">'+letters[i]+'</span>'+opt;
    btn.onclick=()=>selectJohnAnswer(i,btn);
    grid.appendChild(btn);
  });
}
function selectJohnAnswer(index,btn) {
  if(johnAnswered) return;
  johnAnswered=true;
  const q=johnQuestions[johnCurrent];
  const allBtns=document.querySelectorAll('#john-options-grid .option-btn');
  allBtns.forEach(b=>b.disabled=true);
  const fb=document.getElementById('john-feedback-box');
  if(index===q.answer){btn.classList.add('correct');johnScore++;fb.className='feedback-box correct';fb.textContent='✓ '+q.feedback;}
  else{btn.classList.add('wrong');allBtns[q.answer].classList.add('correct');fb.className='feedback-box wrong';fb.innerHTML='<strong>✗ სწორი პასუხია: '+q.options[q.answer]+'</strong><br><br>'+q.feedback.replace('სწორია! ','');}
  fb.style.display='block';
  const nb=document.getElementById('john-next-btn');
  nb.style.display='inline-block';
  nb.textContent=johnCurrent===johnQuestions.length-1?'შედეგის ნახვა →':'შემდეგი კითხვა →';
}
function johnNext() {
  johnCurrent++;

  if (johnCurrent >= johnQuestions.length) {
    document.getElementById('quiz-john-play-area').style.display = 'none';
    document.getElementById('quiz-john-result-area').style.display = 'block';

    document.getElementById('john-result-score').textContent = johnScore;

    const title = document.getElementById("result-title");
    const stars = document.getElementById("result-stars");
    const msg = document.getElementById("john-result-message");

    if (johnScore === 10) {
      launchConfetti();
      title.textContent = "☦ სრულყოფილი შედეგი ☦";
      stars.textContent = "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐";
      msg.textContent = "შესანიშნავია! ღმერთმა განგამტკიცოს სიბრძნეში და რწმენაში.";
    } else if (johnScore >= 8) {
      title.textContent = "🥇 დიდებული შედეგი";
      stars.textContent = "⭐⭐⭐⭐⭐⭐⭐⭐☆☆";
      msg.textContent = "ძალიან კარგი ცოდნა გაქვს! კიდევ ცოტაც და სრულყოფილ შედეგს მიაღწევ.";
    } else if (johnScore >= 6) {
      title.textContent = "📖 კარგი შედეგი";
      stars.textContent = "⭐⭐⭐⭐⭐⭐☆☆☆☆";
      msg.textContent = "განაგრძე წმინდა წერილის კითხვა და ცოდნა კიდევ უფრო გაგიღრმავდება.";
    } else if (johnScore >= 4) {
      title.textContent = "🙏 ნუ შეჩერდები";
      stars.textContent = "⭐⭐⭐⭐☆☆☆☆☆☆";
      msg.textContent = "ყოველი კითხვა ახალი ცოდნის დასაწყისია. თავიდან სცადე.";
    } else {
      title.textContent = "🌿 ჯერ კიდევ წინ ხარ";
      stars.textContent = "⭐⭐☆☆☆☆☆☆☆☆";
      msg.textContent = "არ დანებდე. ღმერთმა მოგმადლოს სიბრძნე და შემეცნება.";
    }

  } else {
    loadJohnQuestion();
  }
}

function initActs() {
  actsCurrent=0; actsScore=0;
  document.getElementById('quiz-intro-acts').style.display='block';
  document.getElementById('quiz-acts-play-area').style.display='none';
  document.getElementById('quiz-acts-result-area').style.display='none';
}
function loadActsQuestion() {
  actsAnswered=false;
  const q=actsQuestions[actsCurrent];
  document.getElementById('acts-question-text').textContent=q.q;
  document.getElementById('acts-progress-text').textContent='კითხვა '+(actsCurrent+1)+' / '+actsQuestions.length;
  document.getElementById('acts-progress-fill').style.width=(((actsCurrent+1)/actsQuestions.length)*100)+'%';
  document.getElementById('acts-next-btn').style.display='none';
  document.getElementById('acts-feedback-box').style.display='none';
  document.getElementById('acts-feedback-box').className='feedback-box';
  const grid=document.getElementById('acts-options-grid');
  grid.innerHTML='';
  const letters=['ა','ბ','გ','დ'];
  q.options.forEach((opt,i)=>{
    const btn=document.createElement('button');
    btn.className='option-btn';
    btn.innerHTML='<span class="option-letter">'+letters[i]+'</span>'+opt;
    btn.onclick=()=>selectActsAnswer(i,btn);
    grid.appendChild(btn);
  });
}
function selectActsAnswer(index,btn) {
  if(actsAnswered) return;
  actsAnswered=true;
  const q=actsQuestions[actsCurrent];
  const allBtns=document.querySelectorAll('#acts-options-grid .option-btn');
  allBtns.forEach(b=>b.disabled=true);
  const fb=document.getElementById('acts-feedback-box');
  if(index===q.answer){btn.classList.add('correct');actsScore++;fb.className='feedback-box correct';fb.textContent='✓ '+q.feedback;}
  else{btn.classList.add('wrong');allBtns[q.answer].classList.add('correct');fb.className='feedback-box wrong';fb.innerHTML='<strong>✗ სწორი პასუხია: '+q.options[q.answer]+'</strong><br><br>'+q.feedback.replace('სწორია! ','');}
  fb.style.display='block';
  const nb=document.getElementById('acts-next-btn');
  nb.style.display='inline-block';
  nb.textContent=actsCurrent===actsQuestions.length-1?'შედეგის ნახვა →':'შემდეგი კითხვა →';
}
function actsNext() {
  actsCurrent++;

  if (actsCurrent >= actsQuestions.length) {
    document.getElementById('quiz-acts-play-area').style.display = 'none';
    document.getElementById('quiz-acts-result-area').style.display = 'block';

    document.getElementById('acts-result-score').textContent = actsScore;

    const title = document.getElementById("result-title");
    const stars = document.getElementById("result-stars");
    const msg = document.getElementById("acts-result-message");

    if (actsScore === 10) {
      launchConfetti();
      title.textContent = "☦ სრულყოფილი შედეგი ☦";
      stars.textContent = "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐";
      msg.textContent = "შესანიშნავია! ღმერთმა განგამტკიცოს სიბრძნეში და რწმენაში.";
    } else if (actsScore >= 8) {
      title.textContent = "🥇 დიდებული შედეგი";
      stars.textContent = "⭐⭐⭐⭐⭐⭐⭐⭐☆☆";
      msg.textContent = "ძალიან კარგი ცოდნა გაქვს! კიდევ ცოტაც და სრულყოფილ შედეგს მიაღწევ.";
    } else if (actsScore >= 6) {
      title.textContent = "📖 კარგი შედეგი";
      stars.textContent = "⭐⭐⭐⭐⭐⭐☆☆☆☆";
      msg.textContent = "განაგრძე წმინდა წერილის კითხვა და ცოდნა კიდევ უფრო გაგიღრმავდება.";
    } else if (actsScore >= 4) {
      title.textContent = "🙏 ნუ შეჩერდები";
      stars.textContent = "⭐⭐⭐⭐☆☆☆☆☆☆";
      msg.textContent = "ყოველი კითხვა ახალი ცოდნის დასაწყისია. თავიდან სცადე.";
    } else {
      title.textContent = "🌿 ჯერ კიდევ წინ ხარ";
      stars.textContent = "⭐⭐☆☆☆☆☆☆☆☆";
      msg.textContent = "არ დანებდე. ღმერთმა მოგმადლოს სიბრძნე და შემეცნება.";
    }

  } else {
    loadActsQuestion();
  }
}
// ===== CALENDAR =====
const GEO_MONTHS = ["იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი","ივლისი","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი"];
const GEO_DAYS = ["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"];


function initCalendar() {
  const today = new Date();
  const m = today.getMonth()+1;
  const d = today.getDate();
  const dayName = GEO_DAYS[today.getDay()];
  const monthName = GEO_MONTHS[m-1];

  const oldStyle = new Date(today);
  oldStyle.setDate(today.getDate()-13);
  const oldD = oldStyle.getDate();
  const oldM = GEO_MONTHS[oldStyle.getMonth()];
  const oldY = oldStyle.getFullYear();
  document.getElementById('today-date').textContent = dayName+", "+d+" "+monthName+" "+today.getFullYear();
  document.getElementById('today-date-old').textContent = "ძველი სტილი: "+oldD+" "+oldM+" "+oldY;

  // Month tabs
  const tabsDiv = document.getElementById('month-tabs');
  tabsDiv.innerHTML = GEO_MONTHS.map((mn,i)=>`
    <button onclick="showMonth(${i+1})" id="tab-${i+1}" style="padding:8px 14px;font-family:'Cinzel',serif;font-size:0.65rem;letter-spacing:0.1em;border-radius:2px;cursor:pointer;transition:all 0.3s;background:${i+1===m?'linear-gradient(135deg,#8a6f2e,#c9a84c)':'transparent'};color:${i+1===m?'#0d0a07':'#8a6f2e'};border:1px solid ${i+1===m?'transparent':'rgba(201,168,76,0.2)'};">${mn}</button>
  `).join('');

  showMonth(m);
}

function showMonth(m) {
  // Update tab styles
  for(let i=1;i<=12;i++){
    const tab = document.getElementById('tab-'+i);
    if(!tab) continue;
    if(i===m){tab.style.background='linear-gradient(135deg,#8a6f2e,#c9a84c)';tab.style.color='#0d0a07';tab.style.borderColor='transparent';}
    else{tab.style.background='transparent';tab.style.color='#8a6f2e';tab.style.borderColor='rgba(201,168,76,0.2)';}
  }

const events = FEASTS
  .filter(f => f.m == m)
  .sort((a, b) => a.d - b.d);
  const div = document.getElementById('month-events');
  if(events.length===0){
    div.innerHTML='<p style="color:#8a6f2e;font-style:italic;text-align:center;padding:24px;">ამ თვეში ჩანაწერი არ არის</p>';
    return;
  }
  div.innerHTML = `
    <p style="font-family:'Cinzel',serif;font-size:0.7rem;letter-spacing:0.3em;color:#8a6f2e;margin-bottom:16px;">${GEO_MONTHS[m-1].toUpperCase()}</p>
    ${events.map(f=>`
      <div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid rgba(201,168,76,0.1);">
        <div style="font-family:'Cinzel',serif;font-size:1rem;color:#c9a84c;min-width:36px;text-align:center;">${f.d}</div>
        <div style="font-size:1rem;color:#f5edd8;line-height:1.5;"><span style="color:${TYPE_STYLE[f.type].color}">${f.name}</span></div>
      </div>
    `).join('')}
  `;
}

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

function launchConfetti() {

    for(let i=0;i<120;i++){

        const piece=document.createElement("div");

        piece.className="confetti";

        piece.style.left=Math.random()*100+"vw";

        piece.style.animationDelay=Math.random()*2+"s";

        piece.style.background=[
            "#c9a84c",
            "#f5edd8",
            "#b8860b",
            "#ffd700"
        ][Math.floor(Math.random()*4)];

        document.body.appendChild(piece);

        setTimeout(()=>{
            piece.remove();
        },5000);

    }

}
