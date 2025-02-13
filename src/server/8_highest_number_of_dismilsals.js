//Find the highest number of times one player has been dismissed by another player
const fs=require('fs');

let data_in_deliveries = require("../data/deliver.json");
let data_in_matches = require("../data/matches.json");

function most_dismisalls_by_a_player(data_in_deliveries) {
    const players = data_in_deliveries
        .filter(delivery => delivery.player_dismissed && delivery.dismissal_kind !== "run out") 
        .reduce((acc, delivery) => {
            const dismissed_batsman = delivery.player_dismissed;
            const bowler = delivery.bowler;
            if (!acc[dismissed_batsman]) {
                acc[dismissed_batsman] = {};
            }
            if (!acc[dismissed_batsman][bowler]) {
                acc[dismissed_batsman][bowler] = 0;
            }
            acc[dismissed_batsman][bowler] += 1;
            return acc;
        }, {});
        let maxDismissals = { batsman: null, bowler: null, dismissalCount: 0 };

        Object.keys(players).forEach(player => {
            let max_dismissal = { bowler: null, dismissalCount: 0 };
        
            Object.keys(players[player]).forEach(bowler => {
                const count = players[player][bowler];
                if (count > max_dismissal.dismissalCount) {
                    max_dismissal = { bowler, dismissalCount: count };
                }
            });
        
            if (max_dismissal.dismissalCount > maxDismissals.dismissalCount) {
                maxDismissals = { batsman: player, ...max_dismissal };
            }
        });
        
        const result = {
            [maxDismissals.batsman]: {
                bowler: maxDismissals.bowler,
                dismissalCount: maxDismissals.dismissalCount
            }
        };
    return result;
}

const result=JSON.stringify(most_dismisalls_by_a_player(data_in_deliveries),null,2);
let outputFile="./src/public/output/8_highest_number_of_dismisals.json";
fs.writeFileSync(outputFile,result);