import './App.css';
function Header(props){
  //props는 component(컴포넌트)의 속성이라고 지칭
  //props에는 객체(Object)가 들어있음.(title=React)
  return(
  <header>
    <h1><a href='/' onClick={(e)=>{
      e.preventDefault(); {/*a태그 클릭했을때 event(기본동작)를 Reroad를 방지한다*/}
      props.onChangeMode();
    }}>{props.title}</a></h1>
    {/* header component에 event를 적용해줌 */}
  </header>
  );
}
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
        <a id={t.id} href={'/read' + t.id} onClick={(e) => {
            e.preventDefault();
            props.onChangeMode(Number(e.target.id));  // id를 Number로 변환하여 전달
          }}>{t.title}</a>
      </li>)
  }
  return(<nav>
      <ol>
        {lis}
      </ol>
    </nav>);
    
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
      <Header title="WEB" onChangeMode={()=>{
        alert('Header');
      }}></Header>
      {/* ↑ 사용자 정의 태그 = Component */}
      <Nav topics={topics} onChangeMode={(id)=>{
        // ()=>안에 id가 들어가는 이유는 주제를 클릭할 때마다 그 주제의 id를
        // App Component에 알려주기 위해서
        alert(id);
      }}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
