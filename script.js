let localReturnPage = 'prayers';

function openSagalobeli(fromPageId) {
    localReturnPage = fromPageId; 
    window.location.hash = 'prayer-ghirs-natsv'; 
}

function goBackToWhereIWas() {
    window.location.hash = localReturnPage; 
}
