document.getElementById("search").addEventListener("click", searchLyrics);
document.getElementById('song-name').addEventListener("keypress", function(event){

    if(event.keyCode == 13){
        searchLyrics();
    }
})

function searchLyrics(){

    const songName = document.getElementById("song-name").value;
    const api = "https://api.lyrics.ovh/suggest/";
    const url = `${api}${songName}`;

    fetch(url)
    .then(response => response.json())
    .then(data =>{

        const simpleResults = document.getElementById("simple-results");
        simpleResults.innerHTML = "";
        const fencyResults = document.getElementById("fancy-results");
        fencyResults.innerHTML = "";

        for (let i = 0; i < 10; i++) {
            const element = data.data[i];
            const title = element.title;
            const artist = element.artist.name;
            const id = element.id;
            const image = element.album.cover;
            const audio = element.link;
            const preview = element.preview;
            
            simpleResults.innerHTML +=   `
                                        <div class="simple-result single-padding">
                                            <div class="row align-items-center single-padding">
                                                <div class="col-md-9">
                                                    <p class="author lead">
                                                        <strong id="title">${title}</strong> - Album by <span id="artist">${artist}</span>
                                                    </p>
                                                </div>
                                                <div class="col-md-3 text-md-right text-center">
                                                    <button class="btn btn-success" data-toggle="collapse" data-target="#simpleCollapse${id}">Get Lyrics</button>
                                                </div>
                                            </div>
                                            <div id="simpleCollapse${id}" class="collapse row">
                                                <div class="card-body">
                                                    <h3 class="lyrics-name text-center">${title}</h3>
                                                    <p class="author lead text-center"> - Album by <span>${artist}</span></p>
                                                    <p class="text-center" id="simple-lyrics${id}"></p>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        `;
            fencyResults.innerHTML +=  `
                                        <div class="fancy-result single-padding">
                                            <div class="single-result row align-items-center single-padding">
                                                <div class="col-md-7">
                                                    <img src="${image}" alt="">
                                                    <h3 class="lyrics-name">${title}</h3>
                                                    <p class="author lead"> - Album by <span>${artist}</span></p>
                                                    <audio controls>
                                                        <source src="${preview}" type="audio/mp3">
                                                    </audio>
                                                </div>
                                                <div class="col-md-5 text-md-right text-center">
                                                    <a href="${audio}" class="btn btn-success">Full Audio</a>
                                                    <button class="btn btn-success" data-toggle="collapse" data-target="#collapse${id}">Get Lyrics</button>
                                                </div>
                                            </div>
                                            <div id="collapse${id}" class="collapse row">
                                                <div class="card-body fancy-style">
                                                    <h3 class="lyrics-name text-center">${title}</h3>
                                                    <p class="author lead text-center"> - Album by <span>${artist}</span></p>
                                                    <p class="text-center" id="fency-lyrics${id}"></p>
                                                </div>
                                            </div>
                                        </div>
                                        `;
    
            const secondUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    
            fetch(secondUrl)
            .then(secondRes => secondRes.json())
            .then(lyricsData => {

                const simpleLyrics = document.getElementById(`simple-lyrics${id}`);
                const fencyLyrics = document.getElementById(`fency-lyrics${id}`);
                const lyrics = lyricsData.lyrics;

                if(lyrics == undefined){
                    
                    simpleLyrics.innerText = `This Songs Lyrics not found.Feel comfort listen audio !!!!.....`;
                    fencyLyrics.innerText = `This Songs Lyrics not found.Feel comfort listen audio !!!!.....`;
                }
                else {

                    simpleLyrics.innerText += `${lyrics}`;
                    fencyLyrics.innerText += `${lyrics}`;
                }
    
            })

        }
        
        document.getElementById("song-name").value = "";  
    })

}






