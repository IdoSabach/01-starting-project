import { useState , useEffect} from "react";
import { CORE_CONCEPTS, EXAMPLES } from "./data";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept/CoreConcept.jsx";
import TabButton from "./components/TabButton/TabButton.jsx";




function Clock() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const key = setInterval(() => {
      if(seconds===59){
        setSeconds(0)
        setMinutes(minutes + 1)
        if(minutes===59){
          setHours(hours + 1)
          setMinutes(0)
          setSeconds(0)
        }
      }else{
        setSeconds((seconds) => seconds + 1)
      }
      
    }, 1000);
    console.log(seconds)

    return () => {
      clearInterval(key)
    }
  },[seconds , minutes , hours])

  return (
    <p>{hours}:{minutes}:{seconds} seconds have passed.</p>
  );
}

function App() {
  const [curr, setCurr] = useState();

  function handleClick(name) {
    setCurr(name);
    console.log(name);
  }

  let text = <p>please select a topic.</p>;
  if (curr) {
    text = (
      <div id="tab-content">
        <h3>{EXAMPLES[curr].title}</h3>
        <p>{EXAMPLES[curr].description}</p>
        <pre>
          <code>{EXAMPLES[curr].code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div>
      <Clock />
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concept</h2>
          <ul>
            {CORE_CONCEPTS.map((item) => (
              <CoreConcept key={item.title} {...item} />
            ))}
          </ul>
        </section>

        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              isSelect={curr === "components"}
              onSelect={() => handleClick("components")}
            >
              Components
            </TabButton>
            <TabButton
              isSelect={curr === "jsx"}
              onSelect={() => handleClick("jsx")}
            >
              JSX
            </TabButton>
            <TabButton
              isSelect={curr === "props"}
              onSelect={() => handleClick("props")}
            >
              Props
            </TabButton>
            <TabButton
              isSelect={curr === "state"}
              onSelect={() => handleClick("state")}
            >
              State
            </TabButton>
          </menu>
          {text}
        </section>
      </main>
    </div>
  );
}

export default App;
