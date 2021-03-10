<template>
  <div id="app"></div>
</template>

<script>
  var upColor = "#ec0000";
  var upBorderColor = "#8A0000";
  var downColor = "#00da3c";
  var downBorderColor = "#008F28";
  let ws;
  let myChart;

  export default {
    name: "App",
    components: {},
    data() {
      return {
        option: {
          legend: {
            data: ["日K"],
          },
          xAxis: {
            type: "category",
            data: [],
            scale: true,
          },
          yAxis: {
            scale: true,
          },
          dataZoom: [
            {
              type: "inside",
              start: 0,
              end: 100,
            },
            {
              show: true,
              type: "slider",
              top: "90%",
              start: 50,
              end: 100,
            },
          ],
          series: [
            {
              name: "日K",
              type: "candlestick",
              data: [],
              itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor,
              },
            },
          ],
        },
      };
    },
    methods: {
      wsStart() {
        ws = new WebSocket("ws://107.152.42.244:9502");
        ws.onopen = () => {
          console.log("WebSocket 開啟連線...");
        };
        ws.onmessage = (res) => {
          let arr = [
            JSON.parse(res.data).open,
            JSON.parse(res.data).close,
            JSON.parse(res.data).low,
            JSON.parse(res.data).high,
          ];
          this.option.series[0].data.push(arr);
          this.option.xAxis.data.push(JSON.parse(res.data).date);
          myChart.setOption(this.option);
        };
        ws.onclose = () => {
          console.log("WebSocket 關閉連線...");
        };
      },
      wsClose() {
        ws.close();
      },
    },
    mounted() {
      myChart = echarts.init(this.$el);
      this.wsStart();
    },
  };
</script>

<style lang="scss">
  #app {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 800px;
    height: 500px;
  }
</style>
