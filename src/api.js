async function fetchImage(development = true) {
   
    // in dev mode, return a random one of the three cat images
    if (development) {
        const index = Math.floor(Math.random() * 3);
        return Promise.resolve(`/tmp-images/cat${index+1}.jpg`);
    }

    const tag = 'cat';
    const apiKey = import.meta.env.VITE_GIPHY_KEY; // import.meta.env.GIPHY_KEY;

    const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${tag}&rating=g`;

    try {
        const response = await fetch(url, {mode: "cors"});
        if (!response.ok) {
            throw new Error(`HTTP error code ${response.status}`)
        }
        const data = await response.json();
        const imageUrl = data.data.images.original_still.url;
        return imageUrl;
    } catch(error) {
        console.log(error);
        return false
    }
}

function fetchDummy() {
    return "https://media.licdn.com/dms/image/v2/D4E03AQFkEM_vVeSA7w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720516866447?e=2147483647&v=beta&t=EH-YmEK7fEEbwoPS_lU5eutyRxuI7o3l3J6VxJHfX_c";
}

export {fetchImage, fetchDummy};