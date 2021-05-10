import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import style from './App.module.css';

function App() {
  return (
    <div className={style.App}>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
