import './App.css';
import { useState } from 'react';

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
function Create(props){
  return(
    <article>
      <h2>Create</h2>
      <form onSubmit={(e)=>{
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onCreate(title,body);
      }}>
        <p><input type='text' name='title' placeholder='title'/></p>
        <p><textarea name='body' placeholder='body'/></p>
        <p><input type='submit' value="Create"></input></p>
      </form>
    </article>
    
  );
}

function App() {
  // const _mode = useState("Welcome");
  // const mode = _mode[0];
  // const setMode = _mode; 를 아래에 표현 ↓
  const [mode, setMode] = useState('Welcome');
  //배열안에 있는 mode와 setMode는 보이는 형식 상관없이 마음대로 지어도 되지만 통일성이 어느정돈
  //있어야지 헷깔리지 않고 계속 쓸 수 있음
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'},
  ]);
 
  let content = null;
  if(mode === 'Welcome'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'Read'){
    let title, body = null;
    for(let i =0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === 'Create'){
    content = <Create onCreate={(_title,_body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('Read');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('Welcome');
      }}></Header>
      {/* ↑ 사용자 정의 태그 = Component */}
      <Nav topics={topics} onChangeMode={(_id)=>{
        // ()=>안에 id가 들어가는 이유는 주제를 클릭할 때마다 그 주제의 id를
        // App Component에 알려주기 위해서
        setMode('Read');
        setId(_id);
      }}></Nav>
      {content}
      <a href='/create' onClick={(e)=>{
        e.preventDefault();
        setMode('Create');
      }}>create</a>
    </div>
  );
}
// Prop = Component를 사용하는 외부자를 위한 데이터
// State = Component를 만드는 내부자를 위한 데이터
export default App;
