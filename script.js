let localReturnPage = 'prayers';

function openSagalobeli(fromPageId) {
    localReturnPage = fromPageId; 
    // ვცადოთ page-ს გარეშე, რადგან showPage-ს შეიძლება ასე უნდა
    showPage('prayer-ghirs-natsv'); 
}

function goBackToWhereIWas() {
    showPage(localReturnPage); 
}
