let ws;

let wsStart = (function () {
  // ws.onopen = () => {
  //   console.log('ws openning');
  // }
  // ws.onmessage = res => {
  //   console.log(res);
  // }
  return {
    onmessage() {
      // ws.onopen = () => {
      //   console.log('ws openning');
      // }
      // ws.onmessage = res => {
      //   console.log(res);
      // }
      ws = new WebSocket('ws://107.152.42.244:9502');
      ws.onopen = () => {
        console.log('状态打开...');
      }
      ws.onmessage = (res) => {
        console.log("数据：", JSON.parse(res.data));
      };
      ws.onclose = () => {
        console.log('状态关闭...');
      }
    },
    wsClose() {
      ws.close();
    },
    print(){
      console.log(ws);
    }
  }
})()



// wsStart.
// wsStart.onmessage()