const APIKEY = "8cea579f8fad0df7e5871801e6341c95";
const IMG = "https://image.tmdb.org/t/p/original";


const titulo = document.getElementById('titulo');
const nota = document.getElementById('nota');
const descricao  = document.getElementById('descricao');
const poster  = document.getElementById('poster');
const genres  = document.getElementById('genres');
const btn_trailer  = document.getElementById('btn-trailer');
const link  = document.getElementById('link');
const trailer  = document.getElementById('trailer');
const close  = document.getElementById('close');
const video  = document.getElementById('video');
const iframe = document.getElementById('iframe');


getmovie();

async function getVideo(id){
    const video = await fetch ('https://api.themoviedb.org/3/movie/'+ id +'/videos?api_key='+ APIKEY +'&language=en-US');
    const respV = await video.json();
    const allVideo = respV.results[0].key;
    return allVideo;
}

async function getmovie(){
    const page = Math.floor(Math.random() * 500 + 1);
    const selector = Math.floor(Math.random() * 20);
    const getTitle = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + APIKEY + '&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + page);
    var resp = await getTitle.json();
    addMovie(resp.results[selector]);
}

async function getGenres(id){
    const getGenres= await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key='+ APIKEY +'&language=pt-BR');
    var resp = await getGenres.json();
    let arr = [];
    resp.genres.forEach(genre => {
        arr[genre.id] = genre.name
    });
    return (arr[id]);
}

async function addMovie(movie) {
    if (movie.overview == ''){
        descricao.innerText = 'Sem descrição disponivel';
    }else{
        descricao.innerText = movie.overview;
    }
    const generos = [];
    movie.genre_ids.forEach(genre => {
        generos.push(genre);
    });
    
    for (let index = 0 ; index < generos.length; index++) {
        genres.innerHTML += '<span>' + await getGenres(generos[index]) + "</span>"
        
    }

    titulo.innerHTML = movie.title;
    nota.innerText= movie.vote_average;
    poster.src = IMG + movie.poster_path;

    const videoTag = await getVideo(movie.id);

    btn_trailer.addEventListener('click', () => {
        iframe.style.display = 'block';
        video.innerHTML = `
        <iframe width="600" height="400" src="https://www.youtube.com/embed/${videoTag}"></iframe>
        `;
    })
    close.addEventListener('click', () => {
        iframe.style.display = 'none';
    })












    
}
