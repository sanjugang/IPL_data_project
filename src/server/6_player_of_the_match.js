//Find a player who has won the highest number of Player of the Match awards for each season
const fs=require('fs');

let data_in_deliveries=require("../data/deliver.json");
let data_in_matches=require("../data/matches.json");

function player_of_the_match(data_in_matches){
    const awards={};
    for(let match of data_in_matches){
        let year=match.season;
        let player=match.player_of_match;
        if(!awards[year]){
            awards[year]={};
        }
        if(!awards[year][player]){
            awards[year][player]=0;
        }
        awards[year][player]+=1;
    }
    const result=[];
    for(let year in awards){
        let maxawards=0;
        let bestplayer="";
        for(let player in awards[year]){
            if(awards[year][player]>maxawards){
                maxawards=awards[year][player];
                bestplayer=player;
            }
        }
        result.push({year,player:bestplayer,awards:maxawards});
    }
    return result;

}
const result=JSON.stringify(player_of_the_match(data_in_matches),null,2);
let outputFile="./src/public/output/6_player_of_the_match.json";
fs.writeFileSync(outputFile,result);