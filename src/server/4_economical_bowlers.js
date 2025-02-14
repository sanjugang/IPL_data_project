//Top 10 economical bowlers in the year 2015
const fs=require('fs');

let data_in_deliveries=require("../data/deliver.json");
let data_in_matches=require("../data/matches.json");

function economical_bowlers(data_in_deliveries,data_in_matches){
    const top_bowlers=[];
    for (let i = 0; i < data_in_matches.length; i++) {
        if (data_in_matches[i].season === "2015") {
            match_id.add(data_in_matches[i].id);
        }
    }
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
let outputFile="./src/public/output/4_economical_bowlers.json";
fs.writeFileSync(outputFile,result,'utf8');