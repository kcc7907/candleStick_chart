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
        console.log('open...');
      }
      ws.onmessage = (res) => {
        console.log("data：", JSON.parse(res.data));
      };
      ws.onclose = () => {
        console.log('close...');
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