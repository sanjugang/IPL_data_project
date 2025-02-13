//Number of matches won per team per year in IPL.
const fs=require('fs');

let data=require("../data/matches.json");

function matches_own_per_team(data){
    let matches_won={};
    data.forEach(match=> {
        let winner=match.winner;
        if(winner){
            if(!matches_won[match.season]){
                matches_won[match.season]={};
            }
            if(!matches_won[match.season][winner]){
                matches_won[match.season][winner]=0;
            }
        }
        matches_won[match.season][winner]+=1; 
    });
    return matches_won;
}
const result=JSON.stringify(matches_own_per_team(data),null,2);
let outputFile="/home/sanju/Downloads/IPL-project-js/src/public/output/2_matches_won_per_team_year.json";
fs.writeFileSync(outputFile,result,'utf8');
