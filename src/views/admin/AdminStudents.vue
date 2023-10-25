<template>
    <div>
        <v-row>
            <v-col cols="12" lg="5">
                <pie
                :labels="['Verification Left', 'Verification Done']"
                :data="[pendingStudents.length, verifiedStudents.length]"
              ></pie>
            </v-col>
      <v-col cols="12" lg="5">
        <line-graph
          title="Students"
          :yearData="monthlyStudentSignups"
        ></line-graph>
      </v-col>
        </v-row>
    </div>
</template>
<script>
import Pie from '@/components/Graphs/Pie.vue';
import LineGraph from '@/components/Graphs/LineGraph.vue';
export default {
  components: { Pie, LineGraph },
    data(){
        return{
            students:[]
        }
    },
    computed:{
        pendingStudents(){
            return this.students.filter((student)=>student.status==='pending')
        },
        verifiedStudents(){
            return this.students.filter((student)=>student.status==='verified')
        },
        monthlyStudentSignups() {
      const yearData = new Array(12).fill(0);
      for (var i = 0; i < this.students.length; i++) {
        if (
          new Date(this.students[i].createdAt).getFullYear() ===
          new Date().getFullYear()
        ) {
          yearData[new Date(this.students[i].createdAt).getMonth()]++;
        }
      }
      console.log(yearData);
      return yearData;
    },
    },
    async created(){
        this.students = await this.$store.dispatch("getAllStudents");
        console.log(this.students)
    }
}
</script>
<style>
    
</style>