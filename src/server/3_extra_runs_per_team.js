//Extra runs conceded per team in the year 2016
const fs=require('fs');

let data_in_deliveries=require("../data/deliver.json");
let data_in_matches=require("../data/matches.json");



function extra_runs_per_team(data_in_deliveries,data_in_matches){
    const extra_runs={};
    
    const match_id = new Set();

    for (let i = 0; i < data_in_matches.length; i++) {
        if (data_in_matches[i].season === "2016") {
            match_id.add(data_in_matches[i].id);
        }
    }
    data_in_deliveries.forEach(match=>{
        if(match_id.has(match.match_id)){
            if(!extra_runs[match.bowling_team]){
                extra_runs[match.bowling_team]=0;
            }
            
            extra_runs[match.bowling_team]+=parseInt(match.extra_runs);
            
        }
    });
    return extra_runs;
}
const result=JSON.stringify(extra_runs_per_team(data_in_deliveries,data_in_matches),null,2);
let outputFile="./src/public/output/3_extra_runs_per_team.json";
fs.writeFileSync(outputFile,result,'utf8');