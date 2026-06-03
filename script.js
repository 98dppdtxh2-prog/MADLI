let localReturnPage = 'prayers';
let lastScrollPosition = 0; 
let lastScrollTop = 0; 

function openSagalobeli(fromPageId) {
    localReturnPage = fromPageId; 
    lastScrollPosition = window.scrollY; 
    
    // როგორც კი საგალობელზე გადავალთ, ღილაკი გავააქტიუროთ
    let floatingButton = document.getElementById('floating-back-btn');
    if (floatingButton) {
        floatingButton.style.display = 'flex';
        floatingButton.style.opacity = '1';
    }

    showPage('prayer-ghirs-natsv'); 
}

function goBackToWhereIWas() {
    showPage(localReturnPage); 
    
    // უკან დაბრუნებისას ღილაკი ისევ სრულად დავმალოთ
    let floatingButton = document.getElementById('floating-back-btn');
    if (floatingButton) {
        floatingButton.style.opacity = '0';
        floatingButton.style.display = 'none';
    }

    setTimeout(() => {
        window.scrollTo(0, lastScrollPosition); 
    }, 50); 
}

window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY;
    let floatingButton = document.getElementById('floating-back-btn');
    
    // თუ ღილაკი საერთოდ დამალულია (none), სქროლვაზე აღარაფერი ქნას
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
