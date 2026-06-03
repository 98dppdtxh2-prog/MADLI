let localReturnPage = 'prayers';
let lastScrollPosition = 0; 
let lastScrollTop = 0; 

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
        // თუ გვერდის ID იწყება "prayer-"-ით, ესე იგი 100%-ით ლოცვაში ვართ და ვრთავთ ღილაკს!
        if (pageId.startsWith('prayer-')) {
            floatingButton.style.display = 'flex';
            floatingButton.style.opacity = '0'; // თავიდან დამალულია სქროლვამდე
        } else {
            // თუ მთავარზე, კალენდარში ან მენიუშია - სრულად ვმალავთ
            floatingButton.style.display = 'none';
            floatingButton.style.opacity = '0';
        }
    }
}

function openSagalobeli(fromPageId) {
    localReturnPage = fromPageId; 
    lastScrollPosition = window.scrollY; 
    showPage('prayer-ghirs-natsv'); 
}

function goBackToWhereIWas() {
    // თუ სხვა ლოცვიდან გადავედით საგალობელზე, დაგვაბრუნოს იქ და ჩამოასქროლოს
    if (localReturnPage && localReturnPage !== 'prayers' && localReturnPage !== 'home') {
        showPage(localReturnPage);
        setTimeout(() => {
            window.scrollTo(0, lastScrollPosition); 
        }, 50);
        localReturnPage = 'prayers'; // განულება
    } else {
        // თუ პირდაპირ მენიუდან შევედით ნებისმიერ ლოცვაში, უკან დაჭერით გავიდეთ ლოცვების სიაში
        showPage('prayers');
    }
}

// სქროლის კონტროლი
window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY;
    let floatingButton = document.getElementById('floating-back-btn');
    
    if (!floatingButton || floatingButton.style.display === 'none') return; 

    if (currentScroll > lastScrollTop) {
        floatingButton.style.transform = 'translateY(100px)';
        floatingButton.style.opacity = '0';
    } else {
        floatingButton.style.transform = 'translateY(0)';
        floatingButton.style.opacity = '1';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
}, { passive: true });
