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
        // text name(title)에 저장된 데이터(value)를 title에 저장
        const body = e.target.body.value;
        // textarea name(body)에 저장된 데이터(value)를 title에 저장
        props.onCreate(title,body);
        // 1번째 파라미터는title, 2번째 파라미터는 body
      }}>
        <p><input type='text' name='title' placeholder='title'/></p>
        {/* name(title)에 데이터를 저장해주고 placeholder는
        이text 창에 어떤걸 입력하면 되는지 입력전에 알려주는 글
        p태그는 각각 다른 문단처럼 보이게 하려고 감싸줌*/}
        <p><textarea name='body' placeholder='body'/></p>
        {/* textarea 여러글을(장문) 저장받을때 쓰기 좋음 */}
        <p><input type='submit' value="Create"></input></p>
        {/* submit 버튼생성 */}
      </form>
    </article>
    
  );
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return(
    <article>
      <h2>Update</h2>
      <form onSubmit={(e)=>{
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onUpdate(title,body);
      }}>
        <p><input type='text' name='title' placeholder='title' value={title} onChange={(e)=>{
          setTitle(e.target.value);
        }}/></p>
        {/* react에서는 onChange가 값이 바뀔때마다 Change가 됨 */}
        <p><textarea name='body' placeholder='body' value={body} onChange={(e)=>{
          setBody(e.target.value);
        }}/></p>
        <p><input type='submit' value="Update"></input></p>
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
  // topics의 마지막 id가 3이라서 그다음으로 관리해주고 싶어서
  // next(다음)Id(id)값을 4(topics.id=3;)로 지정
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'},
  ]);
 
  let content = null;
  let contextControl = null;
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
    contextControl = <li><a href={'/update/'+id} onClick={(e)=>{
      e.preventDefault();
      setMode('Update')
    }}>Update</a></li>
    // contextControl을 mode가 Read 일때만 보이게 함
  } else if(mode === 'Create'){
    content = <Create onCreate={(_title,_body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      // title:_title => title이라는 배열변수안에 onCreate에 있는 
      // 1번째 파라미터(title)을 가져오는 셈(body도 똑같음)
      // id:nextId는 topics의 id가 3까지 있어서 4부터 지정해주려고 useState설정함
      const newTopics = [...topics]
      // newTopics에 배열[...topics]문맥을 그대로 복사
      // const [value, setValue] = useState(Primitive); <원시데이터>
      // → String, Number, boolean,(앞 3개는 자주씀) null, bigint, undefined, symbol
      // const [value, setValue] = useState(Object); <범객체>
      // → object, array  ※ 얘네들은 추가하려면 꼭 복제를 해야됨
      // object는 const newValue = {...value}로 복제 const newTopics = {...topics}
      // array는  const newValue = [...value]로 복제 const newTopics = [...topics]
      newTopics.push(newTopic);
      // 한 뒤 newValue를 변경(push) = newTopics.push(newTopic);
      setTopics(newTopics);
      // setValue에newValue 데이터를 대입 = setTopics(newTopics);
      setMode('Read');
      // setTopics를 보기위해 for문으로 만든 read로 돌아가라 그러고
      // 추가한 title과 body가 출력되게 해라를 랜더링시키려고 setMode를 'Read'로 바꿈
      setId(nextId);
      //setId는 nextId에 저장된 데이터로 바꿔줌
      setNextId(nextId+1);
      //다음에 또 배열안에 추가할 것을 대비해 +1를 미리 해둔다.
    }}></Create>
  } else if(mode === 'Update'){
    let title, body = null;
    for(let i =0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const updatedTopic = {id:id, title:title, body:body}
      const newTopics = [...topics]
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('Read');
    }}></Update>
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
      <ul>
        <li><a href='/create' onClick={(e)=>{
          e.preventDefault();
          setMode('Create'); //클릭하면 mode를(setMode) Create로 바꿈
        }}>create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}
// Prop = Component를 사용하는 외부자를 위한 데이터
// State = Component를 만드는 내부자를 위한 데이터
export default App;
