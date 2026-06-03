let lastScrollTop = 0;

// ეს არის შენი საიტის მთავარი ფუნქცია, რომელიც გვერდებს ცვლის
function changePage(pageId) {
    let elements = document.querySelectorAll('.page, section, div[id^="prayer-"], div[id="prayers"], div[id="calendar"], div[id="home"]');
    elements.forEach(el => {
        if (el.id === pageId) {
            el.style.display = 'block';
        } else if (el.id) {
            el.style.display = 'none';
        }
    });

    // აი აქ არის მკაცრი კონტროლი:
    let floatingButton = document.getElementById('floating-back-btn');
    if (floatingButton) {
        // თუ ვართ მთავარზე (home), კალენდარში (calendar) ან ლოცვების მენიუში (prayers)
        if (pageId === 'home' || pageId === 'calendar' || pageId === 'prayers') {
            floatingButton.setAttribute('data-disabled', 'true'); // ღილაკს ვთიშავთ
            floatingButton.style.transform = 'translateY(100px)';
            floatingButton.style.opacity = '0';
        } else {
            // მხოლოდ კონკრეტულ ლოცვაში შესვლისას ირთვება მზადყოფნა
            floatingButton.removeAttribute('data-disabled'); 
            floatingButton.style.transform = 'translateY(100px)';
            floatingButton.style.opacity = '0';
        }
    }
}

// "უკან" ღილაკზე დაჭერისას ყოველთვის ლოცვების მენიუში ('prayers') დაგვაბრუნოს უსაფრთხოდ
function goBackToWhereIWas() {
    changePage('prayers');
}

// სქროლის კონტროლი
window.addEventListener('scroll', function() {
    let floatingButton = document.getElementById('floating-back-btn');
    if (!floatingButton) return;

    // თუ ზემოთ კოდმა ღილაკი დაატერორა და გათიშა, სქროლზე საერთოდ არაფერი ქნას
    if (floatingButton.getAttribute('data-disabled') === 'true') return;

    let currentScroll = window.scrollY;

    if (currentScroll < 90) {
        floatingButton.style.transform = 'translateY(100px)';
        floatingButton.style.opacity = '0';
    } 
    else if (currentScroll > lastScrollTop) {
        // ქვემოთ სქროლვისას იმალება
        floatingButton.style.transform = 'translateY(100px)';
        floatingButton.style.opacity = '0';
    } 
    else {
        // ზემოთ ასქროლვისას ამოდის
        floatingButton.style.transform = 'translateY(0)';
        floatingButton.style.opacity = '1';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
}, { passive: true });
