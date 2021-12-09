const presence = new Presence({
    clientId: "917567607543042078"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "nyaneelogo",
    };
    if (document.location.pathname.includes("/watch")) {
        presenceData.details = document.querySelector('div.main-container > div.showName >h1').textContent;
        presenceData.state = document.querySelector('div.main-container > div.showName >h2').textContent;
		if (document.querySelector('.plyr__controls__item.plyr__control.plyr__control--pressed')) {
			const startTime = Date.now() / 1000;
			const timeLeft = document.getElementById("player").duration - document.getElementById("player").currentTime;
            const endTime = startTime + timeLeft;
			presenceData.endTimestamp = endTime;
			presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
	   }
        else {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "Paused";
        }
    }
    else if (document.location.pathname.includes("/browse")) {
        presenceData.details = "Searching for an anime";
    }
	
	else if (document.location.pathname.includes("/catalog")) {
		let genreList = document.querySelector("#filter-box-content > div.genre-box > ul").children;
		for (let i = 0; i < genreList.length; i++) {
			const array = [];
			let currentGenre = genreList[i].firstElementChild;
			if (currentGenre.classList.contains('checkmark-checked')){
				array.push(currentGenre.getAttribute('aria-label'));
				const genres = array.join(', ');
				presenceData.details = "Browsing genres";
				presenceData.state = genres;
			}
		}
	}
	
    else if (document.location.pathname.includes("/users")) {
        presenceData.details = "Making friends";
		presenceData.state = ("Viewing profile of: " + document.querySelector("section.container > section.container > #banner-container-profile > #banner-contents-profile >#banner-contents-profile > div.profile-container > div.side-cont > div.userinfo-and-links > div.userinfo > div.username").textContent);
    }
	
	else if (document.location.pathname.includes("/anime")) {
		presenceData.details = "Viewing anime"
		presenceData.state = document.querySelector("#contents-holder > div > div.anime-info-data > div.title > h1").textContent
	}
    else {
        presenceData.details = "Viewing the home page";
    }
    presence.setActivity(presenceData);
});
