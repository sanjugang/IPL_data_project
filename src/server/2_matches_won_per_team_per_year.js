//Number of matches won per team per year in IPL.
const fs=require('fs');

let data=require("../data/matches.json");

function matches_own_per_team(data){
   return data.reduce((matchesWon,match)=>{
      let winner=match.winner;
      if(winner){
         if(!matchesWon[match.season]){
            matchesWon[match.season]={};
         }
         if(!matchesWon[match.season][winner]){
            matchesWon[match.season][winner]=0;
         }
         matchesWon[match.season][winner]+=1;
      }
      return matchesWon;
   },{});
}
const result=JSON.stringify(matches_own_per_team(data),null,2);
let outputFile="/home/sanju/Downloads/IPL-project-js/src/public/output/2_matches_won_per_team_year.json";
fs.writeFileSync(outputFile,result,'utf8');
