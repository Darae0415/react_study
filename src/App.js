import logo from './logo.svg';
import './App.css';
function Header(props){
  //props는 component(컴포넌트)의 속성이라고 지칭
  //props에는 객체(Object)가 들어있음.(title=React)
  return(
  <header>
    <h1><a href='/'>{props.title}</a></h1>
  </header>
  );
}
function Nav(props){
  const lis=[
  ]
  for(let i = 0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}><a href={'/read'+t.id}>{t.title}</a></li>);
  }
  return(
    <nav>
        <ol>
          {lis}
        </ol>
      </nav>
  );
}
function Article(props){
  return(
  <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
  );
}

function App() {
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'},
  ]
  return (
    <div>
      <Header title="WEB"></Header>
      {/* ↑ 사용자 정의 태그 = Component */}
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
