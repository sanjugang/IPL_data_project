//Extra runs conceded per team in the year 2016
const fs=require('fs');

let data_in_deliveries=require("../data/deliver.json");
let data_in_matches=require("../data/matches.json");
const { match } = require('micromatch');



function extra_runs_per_team(data_in_deliveries,data_in_matches){
    const match_id = new Set();
    data_in_matches.filter(match => match.season === "2016")
            .forEach(match=>match_id.add(match.id));


    const extra_runs=data_in_deliveries
    .filter(match=>match_id.has(match.match_id))
    .reduce((acc,delivery)=>{
        if(!acc[delivery.bowling_team]){
            acc[delivery.bowling_team]=0;
        }
        acc[delivery.bowling_team]+=parseInt(delivery.extra_runs);
        return acc;
    },{});
    return extra_runs;
}
const result=JSON.stringify(extra_runs_per_team(data_in_deliveries,data_in_matches),null,2);
let outputFile="/home/sanju/Downloads/IPL-project-js/src/public/output/3_extra_runs_per_team.json";
fs.writeFileSync(outputFile,result);