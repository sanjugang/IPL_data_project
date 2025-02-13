//Find the number of times each team won the toss and also won the match
const fs=require('fs');

let data_in_matches=require("../data/matches.json");

function won_toss_and_match(data_in_matches){
    const result=data_in_matches
    .filter(match=>match.toss_winner===match.winner)
    .reduce((teams,match)=>{
        if(!teams[match.winner]){
            teams[match.winner]=0;
        }
        teams[match.winner]+=1;
        return teams;
    },{});

    return result;
}
const result=JSON.stringify(won_toss_and_match(data_in_matches),null,2);
let outputFile="/home/sanju/Downloads/IPL-project-js/src/public/output/5_match_won_with_toss.json";
fs.writeFileSync(outputFile,result);