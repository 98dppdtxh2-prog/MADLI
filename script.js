let localReturnPage = 'prayers';

function openSagalobeli(fromPageId) {
    localReturnPage = fromPageId; // იმახსოვრებს გვერდს (მაგ. 'page-prayer-evening')
    showPage('page-prayer-ghirs-natsv'); // ხსნის საგალობლებს შენივე ფუნქციით
}

function goBackToWhereIWas() {
    showPage(localReturnPage); // აბრუნებს იქ, საიდანაც მოვიდა
}
