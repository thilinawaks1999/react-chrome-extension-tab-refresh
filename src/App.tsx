import React from "react";
import "./App.css";

function App() {
  const [isOn, setIsOn] = React.useState(false);
  const [time, setTime] = React.useState(10000);

  // Declare the global chrome object
  const chrome = window.chrome;

  //create function that trigger in every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Get the current tab
      if (isOn) {
        refreshTab();
      }
    }, time);
    return () => clearInterval(interval);
  }, [isOn, refreshTab, time]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function refreshTab() {
    // Get the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Reload the current tab
      if (tabs.length > 0 && tabs[0].id) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }

  function handleClick() {
    setIsOn(!isOn);
  }

  return (
    <div
      className="App"
      style={{
        width: 200,
      }}
    >
      <h3
        className="topic"
        style={{
          paddingBottom: 10,
        }}
      >
        Auto Refresh Tab
      </h3>
      <input
        type="number"
        placeholder="Enter time in seconds"
        value={time / 1000}
        onChange={(e) => {
          setTime(Number(e.target.value) * 1000);
        }}
        className="input-box"
      />
      <button className="button" onClick={handleClick}>
        {!isOn ? "Turn ON" : "Turn OFF"}
      </button>
    </div>
  );
}

export default App;
