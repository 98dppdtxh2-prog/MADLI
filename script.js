let localReturnPage = 'prayers';
let lastScrollPosition = 0; 
let lastScrollTop = 0; 

function openSagalobeli(fromPageId) {
    localReturnPage = fromPageId; 
    lastScrollPosition = window.scrollY; 
    showPage('prayer-ghirs-natsv'); 
}

function goBackToWhereIWas() {
    showPage(localReturnPage); 
    setTimeout(() => {
        window.scrollTo(0, lastScrollPosition); 
    }, 50); 
}

window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY;
    let floatingButton = document.getElementById('floating-back-btn');
    
    if (!floatingButton) return; 

    if (currentScroll > lastScrollTop) {
        floatingButton.style.transform = 'translateY(100px)';
        floatingButton.style.opacity = '0';
    } else {
        floatingButton.style.transform = 'translateY(0)';
        floatingButton.style.opacity = '1';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
}, { passive: true });
