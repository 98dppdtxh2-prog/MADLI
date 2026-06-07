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
  { q: "სად დაიბადა იესო ქრისტე?", options: ["ნაზარეთში","იერუსალიმში","ბეთლემში","კაპერნაუმში"], answer: 2, feedback: "სწორია! იესო დაიბადა ბეთლემში, დავითის ქალაქში (მათე 2:1)." },
  { q: "ვინ მოანათლა იესო ქრისტე?", options: ["მოციქული პეტრე","წინასწარმეტყველი ელია","იოანე ნათლისმცემელი","მღვდელმთავარი კაიაფა"], answer: 2, feedback: "სწორია! იოანე ნათლისმცემელმა მოანათლა იესო იორდანე მდინარეში (მათე 3:13-17)." },
  { q: "რამდენი დღე და ღამე იმარხულა იესომ უდაბნოში?", options: ["7","30","40","50"], answer: 2, feedback: "სწორია! იესომ 40 დღე და 40 ღამე იმარხულა უდაბნოში (მათე 4:2)." },
  { q: "რომელი ქალაქი იყო იესოს მეორე სახლი ქადაგების დროს?", options: ["ნაზარეთი","კაპერნაუმი","ბეთლემი","ბეთანია"], answer: 1, feedback: "სწორია! კაპერნაუმი გახდა იესოს მეორე სახლი (მათე 4:13)." },
  { q: "\"მთაზე ქადაგებაში\" რამდენი ნეტარება ახსენა იესომ?", options: ["5","7","9","12"], answer: 2, feedback: "სწორია! იესომ 9 ნეტარება წარმოთქვა მთაზე ქადაგებაში (მათე 5:3-11)." },
  { q: "რომელი ლოცვა ასწავლა იესომ მოწაფეებს?", options: ["ფსალმუნი 50","\"მამაო ჩვენო\"","\"წმინდა არს\"","\"გიხაროდენ\""], answer: 1, feedback: "სწორია! იესომ ასწავლა \"მამაო ჩვენო\" — უფლის ლოცვა (მათე 6:9-13)." },
  { q: "რამდენი მოციქული აირჩია იესომ?", options: ["7","10","12","70"], answer: 2, feedback: "სწორია! იესომ 12 მოციქული აირჩია (მათე 10:1-4)." },
  { q: "ვინ იყო პეტრეს ძმა, რომელიც ასევე მოციქული გახდა?", options: ["იაკობი","იოანე","ანდრია","ფილიპე"], answer: 2, feedback: "სწორია! ანდრია იყო პეტრეს ძმა, ორივე მეთევზე (მათე 4:18)." },
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

const johnQuestions = [
  { q: "რომელი სიტყვებით იწყება იოანეს სახარება?", options: ["იესო ქრისტეს შობის წიგნი","დასაბამიდან იყო სიტყვა","დასაბამს შექმნა ღმერთმა","მადლი და მშვიდობა თქვენდა"], answer: 1, feedback: "სწორია! იოანეს სახარება იწყება: 'დასაბამიდან იყო სიტყვა, და სიტყვა იყო ღმერთთან' (იოანე 1:1)." },
  { q: "ვის ეწოდება 'ღვთის კრავი' იოანეს სახარებაში?", options: ["მოციქული პეტრე","იოანე ნათლისმცემელი","იესო ქრისტე","ლაზარე"], answer: 2, feedback: "სწორია! იოანე ნათლისმცემელმა იესოს შესახებ თქვა: 'აჰა ღვთის კრავი, რომელი აღხოცავს ცოდვასა სოფლისასა' (იოანე 1:29)." },
  { q: "სად მოახდინა იესომ პირველი სასწაული?", options: ["იერუსალიმში","კაპერნაუმში","კანაში","ბეთანიაში"], answer: 2, feedback: "სწორია! იესომ პირველი სასწაული კანაში მოახდინა — წყალი ღვინოდ აქცია (იოანე 2:1-11)." },
  { q: "ვინ მოვიდა იესოსთან ღამით საუბრად?", options: ["იოსებ არიმათიელი","ნიკოდიმოსი","ლაზარე","კაიაფა"], answer: 1, feedback: "სწორია! ნიკოდიმოსი, ფარისეველი და იუდეველთა მთავარი, მოვიდა იესოსთან ღამით (იოანე 3:1-2)." },
  { q: "რა უთხრა იესომ სამარიელ დედაკაცს ჭასთან?", options: ["წადი და მოიბრუნე ქმარი","მე ვარ მკვდრეთით აღდგომა","ვინც ამ წყალს დალევს, კვლავ მოწყურდება","მე ვარ სამყაროს ნათელი"], answer: 2, feedback: "სწორია! იესომ უთხრა: 'ვინც ამ წყალს დალევს, კვლავ მოწყურდება, ხოლო ვინც ჩემი წყლიდან დალევს, აღარ მოწყურდება' (იოანე 4:13-14)." },
  { q: "რამდენი წელი იყო ავადმყოფი კაცი ბეთზათის აუზთან?", options: ["12 წელი","25 წელი","38 წელი","40 წელი"], answer: 2, feedback: "სწორია! კაცი 38 წელი იყო ავადმყოფი, სანამ იესომ განკურნა (იოანე 5:5)." },
  { q: "რა თქვა იესომ: 'მე ვარ...' სახარებაში? (ერთ-ერთი)", options: ["მე ვარ სიბრძნე","მე ვარ სიცოცხლის პური","მე ვარ კანონი","მე ვარ ზეცა"], answer: 1, feedback: "სწორია! იესომ თქვა: 'მე ვარ სიცოცხლის პური; ვინც ჩემთან მოვა, არ შეიწყინოს' (იოანე 6:35)." },
  { q: "ვინ აღადგინა იესომ მკვდრეთით იოანეს სახარებაში?", options: ["იაიროსის ასული","ნაინელი ქვრივის ძე","ლაზარე","სტეფანე"], answer: 2, feedback: "სწორია! იესომ ლაზარე აღადგინა მკვდრეთით ბეთანიაში (იოანე 11)." },
  { q: "რა სიმბოლო გამოიყენა იესომ სახარებაში თავის აღსაწერად?", options: ["ლომი","კარი ცხვართა","სვეტი","ვარსკვლავი"], answer: 1, feedback: "სწორია! იესომ თქვა: 'მე ვარ კარი ცხვართა' (იოანე 10:7)." },
  { q: "რომელ ენაზე იყო დაწერილი იოანეს სახარება თავდაპირველად?", options: ["ებრაულად","არამეულად","ბერძნულად","ლათინურად"], answer: 2, feedback: "სწორია! ახალი აღთქმა, მათ შორის იოანეს სახარება, თავდაპირველად ბერძნულ ენაზე დაიწერა." }
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
  if(johnCurrent>=johnQuestions.length){
    document.getElementById('quiz-john-play-area').style.display='none';
    document.getElementById('quiz-john-result-area').style.display='block';
    document.getElementById('john-result-score').textContent=johnScore;
    const msgs=['სრულყოფილი! ☦️','შესანიშნავი!','კარგი შედეგი!','გააგრძელე კითხვა.','სცადე თავიდან!'];
    document.getElementById('john-result-message').textContent=johnScore===10?msgs[0]:johnScore>=8?msgs[1]:johnScore>=6?msgs[2]:johnScore>=4?msgs[3]:msgs[4];
  } else { loadJohnQuestion(); }
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
  if(actsCurrent>=actsQuestions.length){
    document.getElementById('quiz-acts-play-area').style.display='none';
    document.getElementById('quiz-acts-result-area').style.display='block';
    document.getElementById('acts-result-score').textContent=actsScore;
    const msgs=['სრულყოფილი! ☦️','შესანიშნავი!','კარგი შედეგი!','გააგრძელე კითხვა.','სცადე თავიდან!'];
    document.getElementById('acts-result-message').textContent=actsScore===10?msgs[0]:actsScore>=8?msgs[1]:actsScore>=6?msgs[2]:actsScore>=4?msgs[3]:msgs[4];
  } else { loadActsQuestion(); }
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

```css
.result-stars{
    font-size:30px;
    margin:20px 0;
    letter-spacing:4px;
}

.result-score-big{
    font-family:'Cinzel',serif;
    font-size:70px;
    color:#c9a84c;
    margin:15px 0;
}

#result-title{
    color:#c9a84c;
    margin-bottom:20px;
}

.result-message{
    font-size:1.1rem;
    line-height:1.8;
    color:#f5edd8;
    margin:30px 0;
}
```
