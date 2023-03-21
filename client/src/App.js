import './App.css';
import Editor from '@monaco-editor/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Copy from './icons/Copy';
import Delete from './icons/Delete';
import Loading from './components/Loading';
import { useState } from 'react';
function App() {
  const [value, setValue] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const copyToClipboard = ()=> alert(`Copied✅`)
  const handleRun =()=>{
    setLoading(true);
    fetch("http://localhost:5000/convert",{
      method: "POST",
      body: JSON.stringify({
        value
      }),
      headers: {
        "Content-Type": "application/json"
      },
    }).then((res)=> res.json()).then((data)=>{
      setLoading(false);
      console.log(`data.response`, data.response)
      setOutput(data.response);
    }).catch((err)=> console.error(err));
  }
  return (
      <main className='app'>
        <header className='header__container'>
          <div className='header'>
            <h3>JSON</h3>
            <div className='header__right'>
            <button className='runBtn' onClick={() => { handleRun() }}>
                RUN
              </button>
            <Delete setValue={setValue}/>
            </div>
          </div>

          <div className='header'>
            <h3>Typescript</h3>
          <CopyToClipboard text={output} onCopy={copyToClipboard}>
            <span>
              <Copy />
            </span>
          </CopyToClipboard>
            
          </div>
        </header>
      <div className='code__container'>
        <div className='code'>
          <Editor
            height='90vh'
            className='editor'
            defaultLanguage='json'
            defaultValue='{}'
            value={value}
            onChange={(value)=>{setValue(value)}}
          />
        </div>
        <div className='output'>
          {loading ? (
            <Loading />
          ) : (
            <Editor
              height='90vh'
              className='editor'
              defaultLanguage='typescript'
              options={{
                domReadOnly: true,
                readOnly: true,
              }}
              defaultValue=''
              value={output}
              onChange={(value) => setOutput(value)}
            />
          )}
        </div>
      </div>
      </main>
  );
}

export default App;
