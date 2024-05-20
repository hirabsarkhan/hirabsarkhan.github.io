// JSON string
const jsonString = `{
    "id": "0001",
    "type": "donut",
    "name": "Cake",
    "ppu": 0.55,
    "batters": {
        "batter": [
            { "id": "1001", "type": "Regular" },
            { "id": "1002", "type": "Chocolate" },
            { "id": "1003", "type": "Blueberry" },
            { "id": "1004", "type": "Devil's Food" }
        ]
    },
    "topping": [
        { "id": "5001", "type": "None" },
        { "id": "5002", "type": "Glazed" },
        { "id": "5005", "type": "Sugar" },
        { "id": "5007", "type": "Powdered Sugar" },
        { "id": "5006", "type": "Chocolate with Sprinkles" },
        { "id": "5003", "type": "Chocolate" },
        { "id": "5004", "type": "Maple" }
    ]
}`;

// Parse JSON string into JavaScript object
const jsonObject = JSON.parse(jsonString);

// Extract the necessary information
const output1 = `${jsonObject.id}, ${jsonObject.type}, ${jsonObject.name}`;
const output2 = `${jsonObject.batters.batter[0].id}, ${jsonObject.batters.batter[0].type}`;
const output3 = `${jsonObject.batters.batter[3].id}, ${jsonObject.batters.batter[3].type}`;
const output4 = `${jsonObject.topping[4].id}, ${jsonObject.topping[4].type}`;

// Display the extracted information in the <p> tags
document.getElementById('demo').innerText = output1;
document.getElementById('demo1').innerText = output2;
document.getElementById('demo2').innerText = output3;
document.getElementById('demo3').innerText = output4;
