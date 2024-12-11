const axios = require('axios')

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/';


const getVideos = async(query)=>{

    const api = process.env.NEXT_PUBLIC_YOUTUBE_KEY;

    const params={
        part:'snippet',
        q:query,
        maxResults:1,
        type:'video',
        key: api,
    }

    console.log(YOUTUBE_BASE_URL+'search',{params})

    const resp = await axios.get(YOUTUBE_BASE_URL+'search',{params});

    return resp?.data.items;
}

export default{
    getVideos
}