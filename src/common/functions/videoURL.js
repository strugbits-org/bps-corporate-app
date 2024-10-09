function getFullVideoURL(videoSRC) {
    if (videoSRC && videoSRC.startsWith("wix:video://v1/")) {
        const videoID = videoSRC.replace('wix:video://v1/', '').split('/')[0];
        return `https://video.wixstatic.com/video/${videoID}/file`;
    } else {
        return videoSRC;
    }
}

export default getFullVideoURL;



// "wix:video://v1/547143_9cead2c912214ac59599cc4a967d83e0/video.mp4#posterUri=547143_9cead2c912214ac59599cc4a967d83e0f000.jpg&posterWidth=1920&posterHeight=1080"
// https://video.wixstatic.com/video/547143_9cead2c912214ac59599cc4a967d83e0/480p/mp4/file.mp4