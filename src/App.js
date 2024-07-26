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
        // 링크를 클릭하면 '/read'와 id가 합쳐진 주소로 이동
            e.preventDefault();
            props.onChangeMode(Number(e.target.id));  
            // 클릭한 항목의 id를 숫자로 변환하여 onChangeMode 함수에 전달해요.
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
  // Update = Create + Read
  // props는 사용자가 component로 전달한 명령어(조선시대 말로 component에게 어명)
  const [title, setTitle] = useState(props.title);
  //props.title을 useState로 환승해서 setTitle로 움겨서 title에 저장
  const [body, setBody] = useState(props.body);
  return(
    <article>
      <h2>Update</h2>
      <form onSubmit={(e)=>{
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onUpdate(title,body);
        //on Update가 다른곳에도 설정되어야 됨
      }}>
        <p><input type='text' name='title' placeholder='title' value={title} onChange={(e)=>{
          setTitle(e.target.value);
          // e(이벤트된).target(대상의).value(값);
        }}/></p>
        {/* react에서는 onChange가 값이 바뀔때마다(입력할때마다) Change가 됨 */}
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
    contextControl = <>
    <li><a href={'/update/'+id} onClick={(e)=>{
      // a링크를 클릭했을때 /update/라는 곳에 이동하고 +id는 변수인데,
      // '/update/' + id(5로 설정 되있다는 가정하에) 라 했을때 => 
      //update의 id 5번 웹으로 이동하게 하는 것. 
      e.preventDefault();
      setMode('Update')
    }}>Update</a></li>
      <li><input type='button' value={"Delect"} onClick={()=>{
        const newTopics = []
        for(let i=0; i<topics.length; i++){
          if(topics[i].id !== id){   
          // !==는 같은거의 부정이므로 같지 않을때
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('Welcome');
      }}>
      </input></li>
    </>
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
        // mode가 Update다 변수title,body를 null(빈통)로 만들어주고
        // for문으로 i는0이고 i가 topics의 length보다 작을때 i++증감연산 해줌
        // 만약(if) topics[i]번 id가 설정한 id값이랑 같다면
        // title에 = topics[i]의 타이틀 값, body= topics[i]의 바디값을 넣어줌
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      //title,body가 변경된 값을 topics에 저장하기 위한 식
      const updatedTopic = {id:id, title:title, body:body}
      const newTopics = [...topics]
      // 기존의 주제들(topics)을 새로운 배열(newTopics)로 복사
      for(let i=0; i<newTopics.length; i++){
      // 모든 주제를 확인하기 위해 반복문을 사용
        if(newTopics[i].id === id){
        // 현재 주제의 id가 변경된 주제의 id와 같으면
          newTopics[i] = updatedTopic;
          // 그 주제를 변경된 내용으로 바꿔줌
          break; //그리고 반복문 멈춤
        }
      }
      setTopics(newTopics);
      // 새로운 주제 목록(newTopics)을 setTopics에 저장
      setMode('Read');
      // 화면 모드를 'Read'(읽기) 모드로 바꿈
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
        {/*
        contextControl => <>
        <li><a href={'/update/'+id} onClick={(e)=>{ 
          e.preventDefault();
          setMode('Update')}}>Update</a></li>
          <li><input type='button' value={"Delect"} onClick={()=>{
            const newTopics = []
            for(let i=0; i<topics.length; i++){
              if(topics[i].id !== id){newTopics.push(topics[i]);}}
            setTopics(newTopics);
            setMode('Welcome');}}>
          </input></li> 
              */}
      </ul>
    </div>
  );
}
// Prop = Component를 사용하는 외부자를 위한 데이터
// State = Component를 만드는 내부자를 위한 데이터
export default App;