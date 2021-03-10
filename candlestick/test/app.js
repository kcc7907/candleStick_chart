var upColor = '#ec0000';
var upBorderColor = '#8A0000';
var downColor = '#00da3c';
var downBorderColor = '#008F28';

let app = new Vue({
  el: '#main',
  data() {
    return {
      option: {
        legend: {
          data: ['日K']
        },
        xAxis: {
          type: 'category',
          data: [],
          scale: true,
        },
        yAxis: {
          scale: true,
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            show: true,
            type: 'slider',
            top: '90%',
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: '日K',
            type: 'candlestick',
            data: [],
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor
            },
          }
        ]
      },
      // data:[],
      // date:[]
    }
  },
  methods: {
    wsStart() {
      ws = new WebSocket('ws://107.152.42.244:9502');
      ws.onopen = () => {
        console.log('open...');
      }
      ws.onmessage = (res) => {
        // console.log("data：", JSON.parse(res.data));
        let arr = [
          JSON.parse(res.data).open,
          JSON.parse(res.data).close,
          JSON.parse(res.data).low,
          JSON.parse(res.data).high,
        ]
        this.option.series[0].data.push(arr);
        this.option.xAxis.data.push(JSON.parse(res.data).date);
        // console.log(this.option.series[0].data);
        // console.log(this.option.xAxis.data);
        // setTimeout(() => {
        let myChart = echarts.init(this.$el);
        myChart.setOption(this.option);
        // }, 0);

      };
      ws.onclose = () => {
        console.log('close...');
      }
    },
    wsClose() {
      ws.close();
    }
  },
  mounted() {

    this.wsStart();
    // this.wsClose();
  },
  watch: {
    option() {
      // console.log('option change');
    }
  }
})