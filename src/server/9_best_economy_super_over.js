const fs = require('fs');

let data_in_deliveries = require("../data/deliver.json");

function best_economy_in_super_over(data_in_deliveries) {
    const bowlers = data_in_deliveries
        .filter(delivery => delivery.is_super_over === "1") 
        .reduce((acc, delivery) => {
            const bowler = delivery.bowler;
            const runs_conceded = parseInt(delivery.total_runs) 
                - parseInt(delivery.bye_runs) 
                - parseInt(delivery.legbye_runs) 
                - parseInt(delivery.penalty_runs);
            const legal_delivery = delivery.wide_runs === "0" && delivery.noball_runs === "0";
            
            if (!acc[bowler]) {
                acc[bowler] = { runs: 0, deliveries: 0 };
            }
            acc[bowler].runs += runs_conceded;
            if (legal_delivery) {
                acc[bowler].deliveries += 1;
            }
            return acc;
        }, {});

    const best_bowler = Object.keys(bowlers)
        .reduce((best, bowler) => {
            const { runs, deliveries } = bowlers[bowler];
            const economy = deliveries > 0 ? (runs / deliveries) * 6 : Infinity;
            if (economy < best.economy) {
                best = { bowler, economy };
            }
            return best;
        }, { economy: Infinity });

    return {
        bowler: best_bowler.bowler,
        economy: best_bowler.economy.toFixed(2)
    };
}

const result = JSON.stringify(best_economy_in_super_over(data_in_deliveries), null, 2);
let outputFile = "./src/public/output/9_best_econoy_in_super_over.json";
fs.writeFileSync(outputFile, result);
