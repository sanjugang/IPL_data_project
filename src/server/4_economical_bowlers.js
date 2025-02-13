//Top 10 economical bowlers in the year 2015
const fs=require('fs');

let data_in_deliveries=require("../data/deliver.json");
let data_in_matches=require("../data/matches.json");

function economical_bowlers(data_in_deliveries,data_in_matches){    
    const match_id=new Set();
    data_in_matches
    .filter(match=>match.season==="2015")
    .forEach(match => match_id.add(match.id));

    const top_bowlers=data_in_deliveries
    .filter(delivery=>match_id.has(delivery.match_id))
    .reduce((bowlers,delivery)=>{
        const bowler=delivery.bowler;
        const runs=parseInt(delivery.total_runs)
         - parseInt(delivery.bye_runs) 
         - parseInt(delivery.legbye_runs) 
         - parseInt(delivery.penalty_runs);
         const isBall=delivery.wide_runs ==="0" && delivery.noball_runs==="0";
         if(!bowlers[bowler]){
            bowlers[bowler]={runs:0,balls:0};
         }
         bowlers[bowler].runs+=runs;
         if(isBall){
            bowlers[bowler].balls+=1;
         }
         return bowlers;
    },{});
    const top_economy = Object.entries(top_bowlers)
    .map(([bowler, stats]) => {
        const overs = stats.balls / 6;
        const economy = overs > 0 ? stats.runs / overs : 0;
        return { bowler, economy };
    })
    .sort((a, b) => a.economy - b.economy);
    return top_economy.slice(0, 10);

}
const result=JSON.stringify(economical_bowlers(data_in_deliveries,data_in_matches),null,2);
let outputFile="/home/sanju/Downloads/IPL-project-js/src/public/output/4_economical_bowlers.json";
fs.writeFileSync(outputFile,result,'utf8');