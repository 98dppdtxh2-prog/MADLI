let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY;
    let floatingButton = document.getElementById('floating-back-btn');
    
    if (!floatingButton) return; 

    // თუ მომხმარებელი სულ ზემოთაა (ანუ გვერდის თავში, მენიუში ან მთავარზე), ღილაკი დაიმალოს
    if (currentScroll < 150) {
        floatingButton.style.transform = 'translateY(100px)';
        floatingButton.style.opacity = '0';
    } 
    // თუ ქვემოთ სქროლავს (კითხულობს) - დაიმალოს
    else if (currentScroll > lastScrollTop) {
        floatingButton.style.transform = 'translateY(100px)';
        floatingButton.style.opacity = '0';
    } 
    // თუ ოდნავ მაინც ზემოთ ამოასქროლებს (მხოლოდ მაშინ, როცა უკვე ჩამოსულია დაბლა!) - გამოჩნდეს
    else {
        floatingButton.style.transform = 'translateY(0)';
        floatingButton.style.opacity = '1';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
}, { passive: true });
