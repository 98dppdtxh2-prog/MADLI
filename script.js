let localReturnPage = 'prayers';
let lastScrollPosition = 0; 
let lastScrollTop = 0; 

function openSagalobeli(fromPageId) {
    localReturnPage = fromPageId; 
    lastScrollPosition = window.scrollY; 
    
    // თუ ფუნქცია სხვა სახელით გაქვს, ბრაუზერი ამას მაინც გაუშვებს
    if (typeof showPage === "function") showPage('prayer-ghirs-natsv');
    else if (typeof changePage === "function") changePage('prayer-ghirs-natsv');
}

function goBackToWhereIWas() {
    if (localReturnPage && localReturnPage !== 'prayers' && localReturnPage !== 'home') {
        if (typeof showPage === "function") showPage(localReturnPage);
        else if (typeof changePage === "function") changePage(localReturnPage);
        
        setTimeout(() => {
            window.scrollTo(0, lastScrollPosition); 
        }, 50);
        localReturnPage = 'prayers';
    } else {
        if (typeof showPage === "function") showPage('prayers');
        else if (typeof changePage === "function") changePage('prayers');
    }
}

// სქროლის კონტროლი, რომელიც თავად ხვდება სად გამოჩნდეს
window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY;
    let floatingButton = document.getElementById('floating-back-btn');
    
    if (!floatingButton) return; 

    // თუ მომხმარებელი სულ ზემოთ არის (საწყის პოზიციაზე), ღილაკი დავმალოთ
    if (currentScroll < 80) {
        floatingButton.style.transform = 'translateY(100px)';
        floatingButton.style.opacity = '0';
    } 
    // თუ ქვემოთ სქროლავს - ვმალავთ
    else if (currentScroll > lastScrollTop) {
        floatingButton.style.transform = 'translateY(100px)';
        floatingButton.style.opacity = '0';
    } 
    // თუ ზემოთ ამოასქროლებს - ვაჩენთ
    else {
        floatingButton.style.transform = 'translateY(0)';
        floatingButton.style.opacity = '1';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
}, { passive: true });
