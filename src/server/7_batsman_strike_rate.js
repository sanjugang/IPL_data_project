//Find the strike rate of a batsman for each season
const fs=require('fs');

let data_in_deliveries = require("../data/deliver.json");
let data_in_matches = require("../data/matches.json");

function batsman_strikerate(batsman) {
    const strike_rates = {};
    const match_season = {};
    for (let match of data_in_matches) {
        match_season[match.id] = match.season;
    }
    for (let delivery of data_in_deliveries) {
        if (delivery.batsman.toLowerCase() === batsman.toLowerCase()) { 
            let season = match_season[delivery.match_id];

            if (!strike_rates[season]) {
                strike_rates[season] = { runs: 0, balls: 0 };
            }
            strike_rates[season].runs += parseInt(delivery.batsman_runs, 10);
            if (delivery.wide_runs === "0") {
                strike_rates[season].balls += 1;
            }
        }
    }
    const result = {};
    for (let i in strike_rates) {
        let year_stats = strike_rates[i];
        result[i] = {
            playerName: batsman,
            strikeRate: parseFloat(((year_stats.runs / year_stats.balls) * 100).toFixed(3))
        };
    }

    return result;
}


const result=JSON.stringify(batsman_strikerate("v kohli"),null,2);
let outputFile="/home/sanju/Downloads/IPL-project-js/src/public/output/7_batsman_strike_rate.json";
fs.writeFileSync(outputFile,result);
