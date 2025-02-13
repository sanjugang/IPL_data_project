//Number of matches played per year for all the years in IPL.
const fs=require('fs');
let data=require("../data/matches.json");
const { match } = require('micromatch');

function matches_in_year(data){
    let matches={};
    data.forEach(match => {
        if(matches[match.season])
            matches[match.season]+=1;
    
        else {
            matches[match.season]=1;
        }
    });
        
    
    return matches;
}

let result=matches_in_year(data);
let jsonResult=JSON.stringify(result,null,2);
let outputFile="/home/sanju/Downloads/IPL-project-js/src/public/output/1_matchesPerYear.json";
fs.writeFileSync(outputFile,jsonResult,'utf8');
