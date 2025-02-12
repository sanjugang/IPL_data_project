//Top 10 economical bowlers in the year 2015
const fs=require('fs');

let data_in_deliveries=require("../data/deliver.json");
let data_in_matches=require("../data/matches.json");

function economical_bowlers(data_in_deliveries,data_in_matches){
    const top_bowlers=[];
    const match_id = new Set(
        data_in_matches
            .filter(match => match.season === "2015")
            .map(match => match.id) );
    const bowlers={};
    for(let delivery of data_in_deliveries){
        
        if(match_id.has(delivery.match_id)){
            let bowler=delivery.bowler;
            let runs = parseInt(delivery.total_runs) 
            - parseInt(delivery.bye_runs) 
            - parseInt(delivery.legbye_runs) 
            - parseInt(delivery.penalty_runs);
            let ball = delivery.wide_runs == 0 && delivery.noball_runs == 0;
            if(!bowlers[bowler]){
                bowlers[bowler]={runs:0,balls:0};
            }
            bowlers[bowler].runs+=runs;
            if(ball){
                bowlers[bowler].balls+=1;
            }
        }
    }
    for(let bowler in bowlers){
        let overs=bowlers[bowler].balls/6;
        if(overs>0){
            let economy=bowlers[bowler].runs/overs;
            top_bowlers.push({bowler,economy});
        }
    }
    top_bowlers.sort((a,b)=>a.economy-b.economy);
    return top_bowlers.slice(0,10);
}
const result=JSON.stringify(economical_bowlers(data_in_deliveries,data_in_matches),null,2);
let outputFile="/home/sanju/Downloads/IPL-project-js/src/public/output/4-economical_bowlers.json";
fs.writeFileSync(outputFile,result,'utf8');