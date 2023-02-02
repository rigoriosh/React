export const getGifs = async(category) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=xh9JgbcHKpATZShErWJU7q9h2gXqoAxl&q=${category}&limit=10`
    const response = await fetch(url);
    console.log(response);
    const {data} = await response.json();
    console.log(data);
    const gifs = data.map(img => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url
    }))
    // console.log(gifs)
    return gifs
}