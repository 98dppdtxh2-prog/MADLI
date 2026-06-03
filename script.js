let localReturnPage = 'prayers';
let lastScrollPosition = 0; // აქ შევინახავთ სკროლის ადგილს

function openSagalobeli(fromPageId) {
    localReturnPage = fromPageId; 
    lastScrollPosition = window.scrollY; // ვიმახსოვრებთ ზუსტად სად იდგა მომხმარებელი
    
    showPage('prayer-ghirs-natsv'); 
}

function goBackToWhereIWas() {
    showPage(localReturnPage); 
    
    // პატარა თაიმაუთი გვჭირდება, რომ გვერდმა ჯერ ჩატვირთვა მოასწროს და მერე ჩამოსკროლოს
    setTimeout(() => {
        window.scrollTo(0, lastScrollPosition); // აბრუნებს მომხმარებელს ზუსტად იმავე ადგილას
    }, 50); 
}
