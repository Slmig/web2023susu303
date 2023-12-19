import {useState,useEffect} from 'react';
import './App.css';

/*
function App() {
  return (
    <div className="App">
      <MovieSearchMenu movieList={[{name:"1",year:2,genres:["1","2"]},{name:"2",year:2,genres:["1","2"]}]}/>
    </div>
  );
}
*/

function App() {
  const [movies, setMovies] = useState([]);
  const [targetMovie, setTargetMovie] = useState({});
  const [mode,setMode] = useState(false);
  useEffect(()=>{
    fetch('http://localhost:3000/movies').then((response) =>response.json()).then(result=>setMovies(result));
  },[]);
  return (
    <div className="App">
      <Header />
      <div className="HorContainer">
        <MovieSearchMenu movieList={movies} setMovies={setMovies} setTargetMovie={setTargetMovie} setMode={setMode}/>
        <MovieInfo movie={targetMovie} setMode={setMode}/>
        <EditMovieForm movie={targetMovie} setMovie={setTargetMovie} mode={mode}/>
      </div>
    </div>
  );
}
function Header(){
  return(
    <div className="Header">
      <h1>Админка фильмотеки</h1>
      <button>Выполнил Дубровский Григорий</button>
    </div>
  );
}

function MovieInfo({movie,setMode}){
  if(movie.title==undefined){
    movie = {
      "id": 0,
      "title": "",
      "year": "",
      "runtime": "",
      "genres": [],
      "director": "",
      "actors": "",
      "plot": "",
      "posterUrl": "#"
    }
  }
  let actors = [];
  let actorsStr = movie.actors.split(',');
  for(let actor of actorsStr){
    actors.push(<p>{actor.trim()}</p>)
  }
  return(
    <div className="InfoWrapper">
      <div className="IdAndButton">
        <h2>Id: {movie.id}</h2>
        <a onClick={()=>{
          let editMovieForm = document.querySelector(".EditMovieForm")
          let infoWrapper = document.querySelector(".InfoWrapper");
          editMovieForm.style.display = 'block';
          infoWrapper.style.display = 'none';
          document.querySelector(".MovieNameInput").value = movie.title;
          document.querySelector(".YearInput").value = movie.year;
          document.querySelector(".DescriptionInput").value = movie.plot;
          document.querySelector(".ImageInput").value = movie.posterUrl;
          document.querySelector(".ActorsInput").value = movie.actors;
          document.querySelector(".RuntimeInput").value = movie.runtime;
          document.querySelector(".GenresInput").value = movie.genres.join(", ");
          document.getElementById("DeveloperInput").value = movie.director;
          setMode(false);
        }}>Редактировать</a>
      </div>
      <div className="FirstICont">
        <img src={movie.posterUrl}></img>
        <div className="SecondICont">
          <h1>{movie.title}</h1>
          <h2>{movie.director}</h2>
          <div className="ThirdICont">
            <div className="FCont">
              <h2 id="Params">Параметры</h2>
              <div className="InfoRow">
                <h3>Год производства</h3>
                <p>{movie.year}</p>
              </div>
              <div className="InfoRow">
                <h3>Длительность</h3>
                <p>{movie.runtime}</p>
              </div>
              <div className="InfoRow">
                <h3>Жанры</h3>
                <p>{movie.genres.join(", ")}</p>
              </div>
            </div>
            <div className="ActorsInfo">
              <h3>В главных ролях</h3>
              {actors}
            </div>
          </div>
        </div>
      </div>
      <h1 id="description">Описание</h1>
      <p id="descContent">{movie.plot}</p>
    </div>
  );
}

function EditMovieForm({movie, setMovie, mode}){
  return(
    <div className="EditMovieForm">
      <h1>{mode?"Создание":"Редактирование"}</h1>
      <h2>Название фильма</h2>
      <textarea className="MovieNameInput" type="text" placeholder="Введите название фильма"></textarea>
      <h2>Год выпуска</h2>
      <textarea className="YearInput" type="text" placeholder="Введите год выпуска"></textarea>
      <h2>Описание</h2>
      <textarea className="DescriptionInput" type="text" placeholder="Введите ..."></textarea>
      <h2>Укажите ссылку на обложку</h2>
      <textarea className="ImageInput" type="text" placeholder="Введите ..."></textarea>
      <h2>Укажите список актёров</h2>
      <textarea className="ActorsInput" type="text" placeholder="Введите актёров (через ,)"></textarea>
      <h2>Продолжительность</h2>
      <textarea className="RuntimeInput" type="text" placeholder="Введите ..."></textarea>
      <h2>Жанры</h2>
      <textarea className="GenresInput" type="text" placeholder="Введите жанры (через ,)"></textarea>
      <h2>Режиссёр</h2>
      <textarea id="DeveloperInput" type="text" placeholder="Введите ..."></textarea>
      <hr className="Palka"></hr>
      <div className="EditButtons">
        <button onClick={()=>{
          let editMovieForm = document.querySelector(".EditMovieForm")
          editMovieForm.style.display = 'none';
          if(!mode){
            let infoWrapper = document.querySelector(".InfoWrapper");
            infoWrapper.style.display = 'flex';
          }
        }} className="Decline">Отменить</button>
        <button onClick={()=>{
          if(mode){
            fetch('http://localhost:3000/movies', {
              method: 'POST',
              body: JSON.stringify({
                  title: document.querySelector(".MovieNameInput").value,
                  year: document.querySelector(".YearInput").value,
                  runtime: document.querySelector(".RuntimeInput").value,
                  genres: document.querySelector(".GenresInput").value.split(',').map((el)=>el.trim()),
                  director: document.getElementById("DeveloperInput").value,
                  actors: document.querySelector(".ActorsInput").value,
                  plot: document.querySelector(".DescriptionInput").value,
                  posterUrl: document.querySelector(".ImageInput").value,
              }),
              headers: {'Content-type': 'application/json; charset=UTF-8'},
            }).then((response) => response.json()).then(result=>setMovie(result));
          }
          else{
            fetch(`http://localhost:3000/movies/${movie.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                  title: document.querySelector(".MovieNameInput").value,
                  year: document.querySelector(".YearInput").value,
                  director: document.getElementById("DeveloperInput").value,
                  actors: document.querySelector(".ActorsInput").value,
                  plot: document.querySelector(".DescriptionInput").value,
                  posterUrl: document.querySelector(".ImageInput").value,
                  runtime: document.querySelector(".RuntimeInput").value,
                  genres: document.querySelector(".GenresInput").value.split(',').map((el)=>el.trim()),
              }),
              headers: {'Content-type': 'application/json; charset=UTF-8'},
            }).then((response) => response.json()).then(result=>setMovie(result));
          }
          let editMovieForm = document.querySelector(".EditMovieForm")
          let infoWrapper = document.querySelector(".InfoWrapper");
          editMovieForm.style.display = 'none';
          infoWrapper.style.display = 'flex';
        }} className="Accept">Сохранить</button>
      </div>
    </div>
  );
}

function MovieSearchMenu({movieList,setMovies,setTargetMovie,setMode}){
  let movieButtons = []
  for(let i in movieList){
    movieButtons.push(<MovieButton movie={movieList[i]} setTargetMovie={setTargetMovie}/>);
  }
  return(
    <div className="Wrapper">
      <div className='MovieButtonList'>
        <div className="SearchContainer">
          <input className="InputField" type="text" placeholder="Введите название фильма"></input>
          <button onClick={()=>{
            fetch('http://localhost:3000/movies').then((response) =>response.json()).then(movies=>{
              let inputField = document.querySelector(".InputField");
              let newMovieList = [];
              for(let movie of movies){
                if(movie.title.includes(inputField.value)){
                  newMovieList.push(movie);
                }
              }
              setMovies(newMovieList);
              let messageEl = document.querySelector(".BottomHorLine h2");
              messageEl.innerHTML = `Найдено ${newMovieList.length} элементов`;
              messageEl.style.display = 'block';
            });
          }}>Искать</button>
        </div>
        {movieButtons}
      </div>  
      <div className="BottomMenu">
        <hr></hr>
        <div className="BottomHorLine">
          <h2></h2>
          <button onClick={()=>{
            let editMovieForm = document.querySelector(".EditMovieForm")
            let infoWrapper = document.querySelector(".InfoWrapper");
            editMovieForm.style.display = 'block';
            infoWrapper.style.display = 'none';
            document.querySelector(".MovieNameInput").value = "";
            document.querySelector(".YearInput").value = "";
            document.querySelector(".DescriptionInput").value = "";
            document.querySelector(".ImageInput").value = "";
            document.querySelector(".ActorsInput").value = "";
            document.querySelector(".RuntimeInput").value = "";
            document.querySelector(".GenresInput").value = "";
            document.getElementById("DeveloperInput").value = "";
            setMode(true);
          }
          }>Добавить</button>
        </div>
      </div>
    </div>
  );
}

function MovieButton({movie,setTargetMovie}){
  return(
    <button onClick={()=>{
        setTargetMovie(movie);
        let editMovieForm = document.querySelector(".EditMovieForm")
        let infoWrapper = document.querySelector(".InfoWrapper");
        editMovieForm.style.display = 'none';
        infoWrapper.style.display = 'flex';
      }} className="MovieButton">
      <div className='MBContainer'>
        <p className='MovieName'>{movie.title}</p>
        <div className='OtherMovieTextContainer'>
          <p className='OtherMovieText'>{movie.year}</p>
          <p className='OtherMovieTextSeparator'>|</p>
          <p className='OtherMovieText'>{movie.genres.join(", ")}</p>
        </div>
      </div>
    </button>
  );
}

export default App;
