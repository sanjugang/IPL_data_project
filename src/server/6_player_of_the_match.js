//Find a player who has won the highest number of Player of the Match awards for each season
const fs=require('fs');

let data_in_matches=require("../data/matches.json");

function player_of_the_match(data_in_matches){
    const awards=data_in_matches.reduce((acc,match)=>{
        if(!acc[match.season]){
            acc[match.season]={};
        }
        acc[match.season][match.player_of_match]=(acc[match.season][match.player_of_match] || 0) +1 ;
        return acc;
    },{});
    const result = Object.keys(awards).map(year => {
        const players = awards[year];
    
        const sortedPlayers = Object.entries(players)
            .sort((a, b) => b[1] - a[1]);
    
        const [bestplayer, maxawards] = sortedPlayers[0];
    
        return { year, player: bestplayer, awards: maxawards };
    });
    
    return result;

}
const result=JSON.stringify(player_of_the_match(data_in_matches),null,2);
let outputFile="/home/sanju/Downloads/IPL-project-js/src/public/output/6_player_of_the_match.json";
fs.writeFileSync(outputFile,result);