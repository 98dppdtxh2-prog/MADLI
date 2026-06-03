let localReturnPage = 'prayers';
let lastScrollPosition = 0; 
let lastScrollTop = 0; 

// ამ ფუნქციას შენს კოდში უკვე უწერია გვერდების გადართვა
function showPage(pageId) {
    let elements = document.querySelectorAll('.page, section, div[id^="prayer-"], div[id="prayers"], div[id="calendar"], div[id="home"]');
    elements.forEach(el => {
        if (el.id === pageId) {
            el.style.display = 'block';
        } else if (el.id) {
            el.style.display = 'none';
        }
    });

    let floatingButton = document.getElementById('floating-back-btn');
    if (floatingButton) {
        // თუ მომხმარებელი არის მთავარ გვერდზე (home), კალენდარში (calendar) ან ლოცვების მენიუში (prayers) - ღილაკი სრულად გაქრეს
        if (pageId === 'home' || pageId === 'calendar' || pageId === 'prayers') {
            floatingButton.style.display = 'none';
            floatingButton.style.opacity = '0';
        } else {
            // ნებისმიერ სხვა გვერდზე (ანუ ყველა ლოცვაში!) ღილაკი ჩაირთოს და გააქტიურდეს
            floatingButton.style.display = 'flex';
            floatingButton.style.opacity = '0'; // თავიდან დამალულია, სანამ არ ამოასქროლებს
        }
    }
}

function openSagalobeli(fromPageId) {
    localReturnPage = fromPageId; 
    lastScrollPosition = window.scrollY; 
    showPage('prayer-ghirs-natsv'); 
}

function goBackToWhereIWas() {
    // თუ მომხმარებელი პირდაპირ რომელიმე ლოცვაში შევიდა და არა საგალობლიდან, 
    // უკან დაჭერისას დავაბრუნოთ ლოცვების მთავარ სექციაში ('prayers')
    if (localReturnPage === 'prayers' || !localReturnPage) {
        showPage('prayers');
    } else {
        showPage(localReturnPage);
        setTimeout(() => {
            window.scrollTo(0, lastScrollPosition); 
        }, 50);
        localReturnPage = 'prayers'; // ჩამოვყაროთ საწყისზე
    }
}

// სქროლის ჯადოსნური ფუნქცია
window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY;
    let floatingButton = document.getElementById('floating-back-btn');
    
    if (!floatingButton || floatingButton.style.display === 'none') return; 

    if (currentScroll > lastScrollTop) {
        // ქვემოთ სქროლვისას იმალება
        floatingButton.style.transform = 'translateY(100px)';
        floatingButton.style.opacity = '0';
    } else {
        // ოდნავ ზემოთ ამოძრავებისას ეგრევე ამოდის
        floatingButton.style.transform = 'translateY(0)';
        floatingButton.style.opacity = '1';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
}, { passive: true });
