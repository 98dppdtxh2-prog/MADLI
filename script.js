let localReturnPage = 'prayers';

function openSagalobeli(fromPageId) {
    localReturnPage = fromPageId; 
    window.location.hash = 'page-prayer-ghirs-natsv'; 
}

function goBackToWhereIWas() {
    window.location.hash = localReturnPage; 
}
