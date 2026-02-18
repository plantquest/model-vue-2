<template>
  <div v-if="routeMassages.length > 1" class="basic-nav-stages"   style="position: absolute;z-index:99; height:300px;left:7px;top: 250px;max-width: calc(100% - 11px);">
      <v-expansion-panels class="mb-12" v-model="isExpanded" >
    <v-expansion-panel v-model="isExpanded" style="background-color:#DCEEEF" >
      <v-expansion-panel-header 
        style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;" 
        @click="toggleIcon" 
      >
        <template v-slot:actions @click="toggleIcon" >
          <img v-if="isExpanded" :src="`${publicPath}${iconSrc}`" alt="Collapse Icon" style="margin-left: 45px;" />
          <img v-else :src="`${publicPath}${iconSrc}`" alt="Expand Icon" style="margin-left: 45px;" />
        </template>
        <img 
          :src="`${publicPath}Layers.svg`" 
          alt="Layers" 
          class="Layers" 
          style="margin-left: -16px; width: 30px;" 
        />
        <h4 style="width: 300px;font-size: 14px;padding-left: 2px;">THIS ROUTE CONTAINS MULTIPLE LEVELS</h4>
      </v-expansion-panel-header>
      
      <v-expansion-panel-content style="padding-bottom: 10px;"  >
          <div v-for="(message, index) in routeMsg" :key="index" class="stage" style="background-color:white;"
          @click="selectStage(message.map); activeStage = index; $store.commit('setCurrentStage', index + 1)"
            v-bind:class="{ 'activated': activeStage == index }">
            <h3 style="font-size: 13px;">STAGE {{ index+1 }}</h3>
            <p>{{ message.msg }}</p>
      
          </div>
      </v-expansion-panel-content>
     
    </v-expansion-panel>
  </v-expansion-panels>
  
  </div>
  
  
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'BasicNavStages',
  data() {
      return {
          stages : [],
          showNav: true,
          isExpanded: 0,
          iconSrc: 'nav_in.svg', // Initial icon
          publicPath: process.env.BASE_URL || '/',
          pathData: null ,// Add a data property to store the pathData
          parsedPathData: null,
          pathArray: null,
          mapValues: [],
          routeMassages: [],
          routeMsg: [],
          selectedStage : 0,
          activeStage: this.$store.state.activeStage,
          levelNames : [
                      'Ground Floor',
                      'Level 2',
                      'Level 3',
                      'Level 4',
                      'Level 5',
                      'Basement',
                  ],
      };
  },
  computed: {
  ...mapState({
    pathData: state => state.pathData,
    activeStage: state => state.activeStage, 
  }),
},
  watch: {
    '$store.state.currentStage'(newVal) {
        console.log('Current Stage:', newVal);
        this.activeStage = newVal - 1; 
        this.$store.dispatch('setCurrentStage', newVal);
        //this.$store.commit('trigger_select');
       // console.log('___Updated trigger.select:', this.$store.state.trigger.select.value);
      },
    '$store.state.trigger.select.value': function (value) {
  console.log('__value', value);

  // if (this.$store.state.reverseTriggered) {
  //   this.activeStage = 0;
  //   this.$store.commit('clearReverseTrigger');
  // } else {
  //   const stageIndex = this.routeMassages.findIndex(stage => stage.map == value);
  //   if (stageIndex !== -1) {
  //     this.activeStage = stageIndex;
  //     console.log('__activeStage', this.activeStage, stageIndex);
  //   } else {
  //     this.activeStage = 0;
  //   }
  // }
  
},
  
  isExpanded() {
    this.toggleIcon();
  },
  // create a watcher for changes in pathData
  '$store.state.pathData': {
  async handler(data) {
    if (!data || !data.asset123) {
      console.warn("PathData is undefined or missing asset123");
      this.routeMassages = []; // Clear stages if data is invalid
      return;
    }
    this.pathData = data.asset123; 
    console.log('basic_nav_this.pathData', this.pathDetails);

    try {
      const parsedData = this.pathData;
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        console.warn("Invalid or empty pathData");
        this.routeMassages = []; // Clear stages if data is invalid
        return;
      }
      this.pathArray = parsedData[0]; 
      let parsedLines = this.parseLines(this.pathArray); 
      // Map the parsedLines array to get map values
      this.mapValues = parsedLines.map(line => line.map);

       this.routeMsg= await this.getRouteSteps(parsedLines); 
      this.routeMassages = this.routeMsg; 

      
      // console.log('stages', stages); 
      // let stages = await this.processStages(stages);
      // console.log('__msgfloor', this.routeMsg);

    } catch (error) {
      console.error("Error parsing pathData:", error);
      this.routeMassages = []; // Clear stages on error
    }
    // Dispatch the action (optional)
    console.log('data.asset123!!', data.asset123)
    this.$store.dispatch('set_path_data', { pathDetails: data.asset123 })
      .then(result => {
        console.log('Dispatch result:', result);
      })
      .catch(error => {
        console.error('Dispatch error:', error);
      });
  },
  deep: true // Watch for changes within nested objects 
}
},
  
methods: {
  getselectedStage() {
   console.log('selectedStage', this.selectedStage);
    return this.selectedStage;
   
  },
  async selectStage(index) {
      console.log('indexx', index);
    this.selectedStage = index;
      console.log('selectedStage', this.selectedStage);
        // Commit the mutation to update the map index in the store and log the result
    //this.$store.commit('setMapIndex',index);
    console.log('Committed map index:', index);
    this.$emit('stageSelected', index); 
    this.$store.commit('setCurrentStage', index + 1); // Update the current stage in the store
    this.$store.dispatch('setCurrentStage', index); // Update the current stage in the store
    //this.$store.dispatch('trigger_select', {value: index})
    
   // this.$store.dispatch('trigger_select', {value: message.map})
    
  },
   parseLine(line){
          // line exmple : [47be48,Standard,,8832,4720]
         
          
           let lineData = line.split(',');
          let id = lineData[0];
          let type = lineData[1];
          let result = {
      id,
      type
    };
          console.log('Parsed Line:', result);
          return result;
      },
      parseLines(data){
        if (data)
          return data.map(lineData => {
            // console.log('lineData', lineData);
             // console.log(lineData.detail)
              let data = lineData.detail.split(',')
              return {
                  id : data[0],
                  type : data[1],
                  map : lineData.index,
                  x : parseFloat(data[3]),
                  y : parseFloat(data[4]),
              }
          })
        else return [];
         
      },
        filterConnectors(steps) {
    return steps.filter((step, i, arr) => {
      if (step.type !== 'Connector') return true;
      const prev = arr[i - 1];
      const next = arr[i + 1];
      // Keep if previous or next is also a Connector
      if ((prev && prev.type === 'Connector') || (next && next.type === 'Connector')) {
        return true;
      }
      // Remove if unique Connector
      return false;
    });
  },
      async getRouteSteps(routeData){
          let steps = routeData;
          
        //  steps = this.filterConnectors(steps);
          let messages = [];
          // Add initial stage for starting point
          // change made here - offset set to zero instead of -3
          console.log('!!routeData', steps);
          let offset = 0;
          for(var i=0; i<steps.length-offset; i++){
              if(steps[i].type == "Connector"){
                  // first node type connector (i)
                  let msg = `Follow route to stairs and proceed to `;
                  var j = i;
                  while(j < steps.length-1 && steps[j+1].type == "Connector"){
                      j++;
                  }
                  // first node type Standar (j)
                  let offset = 0;
                  // change made here - offset set to zero instead of -2
                  if(j < steps.length-offset){
                      msg += this.getMapName(steps[j])
                      messages.push({msg, map: steps[i].map-1});
                  }
                  i=j;
              }
          }
          if(messages.length > 0){
            messages.push({
               msg : `Proceed to your destination.`,
                map : steps[steps.length-1].map-1,
              
              })
            }
            
            
          console.log('Steps:', steps);
          let map = steps[0].map == 1 ? 1 : steps[0].map-1
          
          //await this.selectStage(map)
          

           
          console.log('________Messages:', messages);
          return messages;
      },

  getMapName(node){ //: { type : string, x:number, y: number, map : number, polygon_id: string }) : string {
    // find the nearest assetObject to the node
    console.log('___list_main_asset:', this.$store.state.main_asset);
    let assets = this.$store.state.main_asset.filter((asset)=> !isNaN(parseInt( asset.map)) && parseInt( asset.map) == node.map - 1 );
    let closest = assets[0];
    let mindist = Infinity;
    for (let a of assets){

      let dist = Math.sqrt(Math.pow(a.xco - node.x, 2) + Math.pow(a.yco - node.y, 2));
      if (dist < mindist){
        closest = a;
        mindist = dist;
      }
    }
    console.log('closest', node.map, closest.map);
    console.log('closest', closest);
    return closest ? closest.level : '@';
  },

      async  processStages(){
    console.log('____stages', this.routeMassages);
    let stages = this.routeMassages;
    let stagesMsg = [];
    for (var i = 0; i < stages.length; i++) {
      if (i < stages.length - 1) {
          let nextStage = stages[i + 1].map;
          let nextStageMsg = 0;
          nextStageMsg = `Map ${nextStage}`;
          stagesMsg.push({
            map: stages[i].map,
            msg: `Follow route to stairs and proceed to ${nextStageMsg}`
          });
        } else {
          stagesMsg.push({
            map: stages[i].map,
            msg: "Proceed to your destination"
          });
        }
          }
     console.log('__stagesMsg',stagesMsg);
     return stagesMsg;
  },
  
  
 
  
  toggleIcon() {
    
    this.iconSrc = this.isExpanded ? 'nav_in.svg' : 'nav_out.svg';
    
  },
  clearState() {
    this.isExpanded = false;
    this.iconSrc = 'nav_in.svg';
  },
  toggleshowNav() {
        this.showNav = !this.showNav;
      },
},
mounted() {
  console.log('Current Stage on mount:', this.$store.state.currentStage);
 // this.parseLines(this.test); // Call parseLines with the test data
  this.$root.$on('clear-nav-stages', this.toggleshowNav);
  
  // Automatically select Stage 1 after the stages are rendered
  // this.$nextTick(() => {
  //   if (this.routeMassages.length > 0) {
  //     this.selectStage(0); // Select Stage 1 (index 0)
  //     this.$store.dispatch('trigger_select', { value: 0 }); // Ensure the map updates
  //   }
  // });
},
beforeDestroy() {
  this.$root.$off('clear-nav-stages', this.toggleshowNav);
},
  computed: {
      // Your computed properties go here
  }
};
</script>
<style lang="scss">
.basic-nav-stages {
  .v-expansion-panel-content__wrap {
      
     // border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;
     // border-top-left-radius: 10px !important;border-top-right-radius: 10px !important;
  }

  .v-expansion-panel.v-expansion-panel--active.v-item--active {
    border-top-left-radius: 10px !important;border-top-right-radius: 10px !important;
    border-top-left-radius: 0px !important;border-top-right-radius: 0px !important;
   // border-radius: 0 !important;
  }

  .stage {
      width: 95%;
      height: 85px;
      margin: 0px 4px 0px 7px;
  }
  .stage h3 {
      position: relative;
      //font-family: "Gill Sans", sans-serif;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
      font-synthesis: none; // Prevents browser from faking bold/italic if font style is missing
      font-weight: 700;
      top: 4px;
      left: 13px;
  }
  .stage p {
      position: relative;
      //font-family: "Gill Sans", sans-serif;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
      font-synthesis: none;
      font-weight: 400;
      font-size: 15px;
      width: 94%;
      top: 3px;
      left: 13px;
  }
  .stage.activated {
      background-color:#C0E28B !important;
  }
  .v-divider {
      border-color: rgb(var(--vxg-ct2)) !important;
      margin: 16px 8px;
      height: 22px;
  }
}
</style>