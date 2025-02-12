//Find the number of times each team won the toss and also won the match
const fs=require('fs');

let data_in_deliveries=require("../data/deliver.json");
let data_in_matches=require("../data/matches.json");

function won_toss_and_match(data_in_matches){
    const result={};
    for(let match of data_in_matches){
        if(match.toss_winner===match.winner){
            if(!result[match.winner]){
                result[match.winner]=1;
            }
            else{
                result[match.winner]+=1;
            }
        }
    }
    return result;
}
const result=JSON.stringify(won_toss_and_match(data_in_matches),null,2);
let outputFile="/home/sanju/Downloads/IPL-project-js/src/public/output/5-match_won_with_toss.json";
fs.writeFileSync(outputFile,result);