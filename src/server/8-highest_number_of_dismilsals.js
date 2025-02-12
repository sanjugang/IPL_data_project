//Find the highest number of times one player has been dismissed by another player
const fs=require('fs');

let data_in_deliveries = require("../data/deliver.json");
let data_in_matches = require("../data/matches.json");

function most_dismisalls_by_a_player(data_in_deliveries) {
    const players = {}; 
    for (let delivery of data_in_deliveries) {
        if (delivery.player_dismissed && delivery.dismissal_kind !== "run out") {
            const dismissed_batsman = delivery.player_dismissed;
            const bowler = delivery.bowler;
            if (!players[dismissed_batsman]) {
                players[dismissed_batsman] = {};
            }
            if (!players[dismissed_batsman][bowler]) {
                players[dismissed_batsman][bowler] = 0;
            }
            players[dismissed_batsman][bowler] += 1;
        }
    }
    const result = {};
    let maxDismissals = { batsman: null, bowler: null, dismissalCount: 0 };
    for (let player in players) {
        let max_dismissal = { bowler: null, dismissalCount: 0 };
        for (let bowler in players[player]) {
            const count = players[player][bowler];
            if (count > max_dismissal.dismissalCount) {
                max_dismissal = { bowler, dismissalCount: count };
            }
        }
        if (max_dismissal.dismissalCount > maxDismissals.dismissalCount) {
            maxDismissals = { batsman: player, ...max_dismissal };
        }
    }

    result[maxDismissals.batsman] = {
        bowler: maxDismissals.bowler,
        dismissalCount: maxDismissals.dismissalCount
    };

    return result;
}

const result=JSON.stringify(most_dismisalls_by_a_player(data_in_deliveries),null,2);
let outputFile="/home/sanju/Downloads/IPL-project-js/src/public/output/8-highest_number_of_dismisals.json";
fs.writeFileSync(outputFile,result);