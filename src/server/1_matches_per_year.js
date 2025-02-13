//Number of matches played per year for all the years in IPL.
const fs=require('fs');
let data=require("../data/matches.json");
const { match } = require('micromatch');

function matches_in_year(data){
    return data.reduce((matches,match)=>{
        matches[match.season]=(matches[match.season] || 0) +1;
        return matches;
    },{});
}

let result=matches_in_year(data);
let jsonResult=JSON.stringify(result,null,2);
let outputFile="./src/public/output/1_matchesPerYear.json";
fs.writeFileSync(outputFile,jsonResult);
