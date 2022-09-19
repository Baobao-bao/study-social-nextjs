import { useState, useCallback, useEffect } from 'react';
import '/styles/Home.module.css';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

function App() {
  const [count, setCount] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');
  // let videoId = extractVideoId(videoUrl)
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [input, setInput] = useState('');

  const extractVideoId = useCallback((videoUrl) => {
    let tempUrl = videoUrl.split('/');
    return tempUrl[tempUrl.length - 1].split('?')[0];
  });

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch('/api/socket');

    socket.on('newIncomingMessage', (msg) => {
      // setMessages((currentMsg) => [
      //   ...currentMsg,
      //   { author: msg.author, message: msg.message },
      // ]);
      console.log(msg);
    });
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server!');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('disconnected!');
      setIsConnected(false);
    });

    socket.on('message', (msg) => {
      console.log('msg', msg);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  // https://github.com/injahow/bilibili-parse

  const sendMsg = (e) => {
    e.preventDefault();
    console.log('sendMsg');
    socket.emit('message', input);
    setInput('');
  };

  const getUrl = () => {};

  return (
    <div className="App flex justify-center">
      <button onClick={getUrl}>click it </button>
      <iframe
        src="//player.bilibili.com/player.html?aid=669398027&bvid=BV1Fa4y1E7C1&cid=232513630&page=1"
        scrolling="no"
        border="0"
        frameBorder="no"
        frameSpacing="0"
        allowFullScreen="true"
      >
        {' '}
      </iframe>

      <div className="main flex w-[95vw] max-w-[1500px]">
        <div className="body flex-[4] mr-[24px]">
          <div className="input-bar w-full bg-gray-300 h-[30px]"></div>
          <div className="video-section w-full bg-gray-300 aspect-video mt-[20px]"></div>
        </div>
        <div className="chat-section flex flex-col flex-1 bg-gray-300">
          <div className="users w-full flex justify-around">
            <div className="user w-1/5">
              <div className="avatar bg-gray-500 rounded-full w-full aspect-square "></div>
              <div className="username w-full text-[12px]">user 1</div>
            </div>
            <div className="user w-1/5">
              <div className="avatar bg-gray-500 rounded-full w-full aspect-square"></div>
              <div className="username w-full text-[12px]">user 1</div>
            </div>
            <div className="user w-1/5">
              <div className="avatar bg-gray-500 rounded-full w-full aspect-square"></div>
              <div className="username w-full text-[12px]">user 1</div>
            </div>
          </div>
          <div className="chat w-full flex flex-col flex-grow bg-red-200 ">
            <div className="messagea flex flex-col  flex-grow">
              <div className="msg-box flex flex-col items-start">
                <div className="name text-[12px]">user 1</div>
                <div className="content">how are you?</div>
              </div>
              <div className="msg-box flex flex-col items-end">
                <div className="name text-[12px]">user 1</div>
                <div className="content">how are you?</div>
              </div>
            </div>
            <form
              onSubmit={(e) => sendMsg(e)}
              className=" bg-pink-100 w-full h-[20px]"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>

      {/* <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(extractVideoId(e.target.value))}
      />
      <iframe
        src={`https://player.bilibili.com/player.html?bvid=${videoUrl}&as_wide=1&high_quality=1&danmaku=0`}
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        width="640"
        height="360"
      ></iframe> */}
    </div>
  );
}

export default App;
