<template>
  <div class="el-progress">
    <div class="el-progress-circle" :style="{height: width + 'px', width: width + 'px'}">
      <svg viewBox="0 0 32 32" style="transform:rotate(-90deg);">
        <circle cx="16" cy="16" r="16" fill="#fff" stroke="#e5e5e5" stroke-width='1' style="transition: all 5s"></circle>
        <path class="el-progress-circle__path" :d="trackPath" fill="#efefef" v-if="percentage < 360"></path>
        <circle v-if="percentage === 360" cx="50" cy="50" r="50" fill="#efefef"></circle>
        
      </svg>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MProgress',
    props: {
      type: {
        type: String,
        default: 'line',
        validator: val => ['line', 'circle'].indexOf(val) > -1
      },
      percentage: {
        type: Number,
        default: 0,
        required: true,
        validator: val => val >= 0 && val <= 360
      },
      width: {
        type: Number,
        default: 36
      }
    },
    computed: {
      trackPath() {
        var clockwise = 1;
        var startX = 28, startY = 16, r = 12, add = 0===this.percentage ? true : false;
        var cw = typeof startY !== 'undefined' ? clockwise : 1;
        var x = startX - r + r*Math.cos(this.percentage*Math.PI/180);
        var y = startY + (1===cw ? 1 : -1)*r*Math.sin(this.percentage*Math.PI/180);
        var bigOrSmall = this.percentage > 180 ? 1 : 0;
        var line = " L" + (startX - r) + " " + startY + " L"+startX + " " + startY + "Z";
        return "M " + startX +" "+ startY + " A "+ r +" " + r + " 0 " + bigOrSmall + " " + "1"+ " " + x + " " + y + line;
      }
    }
  };
</script>
