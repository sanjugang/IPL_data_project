//Find the bowler with the best economy in super overs
const fs=require('fs');

let data_in_deliveries = require("../data/deliver.json");
let data_in_matches = require("../data/matches.json");

function best_economy_in_super_over(data_in_deliveries) {
    const bowlers = {};
    for (let delivery of data_in_deliveries) {
        if (delivery.is_super_over === "1") {
            const bowler = delivery.bowler;
            let runs_conceded = parseInt(delivery.total_runs) 
            - parseInt(delivery.bye_runs) 
            - parseInt(delivery.legbye_runs) 
            - parseInt(delivery.penalty_runs);
            const legal_delivery = delivery.wide_runs === "0" && delivery.noball_runs === "0";
            if (!bowlers[bowler]) {
                bowlers[bowler] = { runs: 0, deliveries: 0 };
            }
            bowlers[bowler].runs += runs_conceded;
            if (legal_delivery) {
                bowlers[bowler].deliveries += 1;
            }
        }
    }
    let best_bowler = null;
    let best_economy = Infinity;
    for (let bowler in bowlers) {
        const { runs, deliveries } = bowlers[bowler];
        if (deliveries > 0) { 
            const economy = (runs / deliveries) * 6;
            if (economy < best_economy) {
                best_economy = economy;
                best_bowler = bowler;
            }
        }
    }
    return {
        bowler: best_bowler,
        economy: best_economy.toFixed(2)
    };
        
}
const result=JSON.stringify(best_economy_in_super_over(data_in_deliveries),null,2);
let outputFile="./src/public/output/9_best_econoy_in_super_over.json";
fs.writeFileSync(outputFile,result);
