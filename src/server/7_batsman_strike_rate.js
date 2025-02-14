//Find the strike rate of a batsman for each season
const fs=require('fs');

let data_in_deliveries = require("../data/deliver.json");
let data_in_matches = require("../data/matches.json");

function batsman_strikerate(batsman) {
    const match_season = data_in_matches.reduce((acc, match) => {
        acc[match.id] = match.season;
        return acc;
    }, {});
    const strike_rates = data_in_deliveries
        .filter(delivery => delivery.batsman.toLowerCase() === batsman.toLowerCase()) 
        .reduce((acc, delivery) => {
            let season = match_season[delivery.match_id];

            if (!acc[season]) {
                acc[season] = { runs: 0, balls: 0 };
            }
            acc[season].runs += parseInt(delivery.batsman_runs, 10);
            if (delivery.wide_runs === "0") {
                acc[season].balls += 1;
            }

            return acc;
        }, {});
        const result = Object.entries(strike_rates).reduce((acc, [i, year_stats]) => {
            acc[i] = {
                playerName: batsman,
                strikeRate: parseFloat(((year_stats.runs / year_stats.balls) * 100).toFixed(3))
            };
            return acc;
        }, {});
        
        return result;
        
}


const result=JSON.stringify(batsman_strikerate("v kohli"),null,2);
let outputFile="./src/public/output/7_batsman_strike_rate.json";
fs.writeFileSync(outputFile,result);
