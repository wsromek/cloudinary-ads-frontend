const HTTP_STATUS_OK = 200;
const AD_SERVICE = 'https://ads-tracker-cldnry.herokuapp.com';

const trackAd = (id, type) => {
    if (navigator.sendBeacon) {
        navigator.sendBeacon(`${AD_SERVICE}/event`, JSON.stringify({
            ad: id,
            type: type
        }));
    }
}

const sendEventOnClick = anchor => {
    anchor.addEventListener('click', event => {
        event.preventDefault();

        if (anchor.dataset && anchor.dataset.loaded === "true") {
            trackAd(anchor.dataset.id,'click');
        }

        window.location.href = anchor.href;
    });
}

const trackClickEvents = anchors => {
    anchors.forEach(sendEventOnClick);
}

const loadAd = wrapper => {
    const anchor = wrapper.children[0];
    const adId = anchor.dataset.id;

    fetch(`${AD_SERVICE}/mock-ad/${adId}`)
        .then(response => response.status === HTTP_STATUS_OK && response.json())
        .catch(error => {
            console.log(`Failed to load ad: ${adId}`);
        })
        .then(json => {
            anchor.href = json.ad;
            anchor.innerText = adId.toUpperCase();

            anchor.dataset.loaded = 'true';
            wrapper.style.display = 'block';

            return adId;
        })
        .then(adId => trackAd(adId, 'load'))
        .catch(error => {
            console.log(`Failed to track ad loaded event: ${adId}`);
        });
}

const loadAds = (wrappers) => {
    wrappers.forEach(wrapper => {
        loadAd(wrapper);
    });
}

loadAds(document.querySelectorAll('.ad-wrapper'));
trackClickEvents(document.querySelectorAll('a'));
