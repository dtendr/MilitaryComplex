var playerData = {
	troops: { initQuantity: 1000, amountLostPerTurn: 5, x: 50, y: 50 },
	medicine: { initQuantity: 1000, amountLostPerTurn: 5, x: 60, y: 60 },
	money: { initQuantity: 1000, amountLostPerTurn: 5, x: 70, y: 70	},
	food: { initQuantity: 1000, amountLostPerTurn: 5, x: 80, y: 80 }
};

var enemyData = {
	troops: { initQuantity: 1000, amountLostPerTurn: 5, x: 100, y: 100 },
	medicine: { initQuantity: 1000, amountLostPerTurn: 5, x: 120, y: 120 },	
	money: { initQuantity: 1000, amountLostPerTurn: 5, x: 140, y: 140 },
	food: { initQuantity: 1000, amountLostPerTurn: 5, x: 160, y: 160}
};

var enemyData2 = {
	troops: { initQuantity: 2000, amountLostPerTurn: 5, x: 200, y: 200 },
	medicine: { initQuantity: 2000, amountLostPerTurn: 5, x: 220, y: 220 },	
	money: { initQuantity: 2000, amountLostPerTurn: 5, x: 240, y: 240 },
	food: { initQuantity: 2000, amountLostPerTurn: 5, x: 260, y: 260}
};

var enemyObjectsArray = [enemyData];

var mapData = {
	x: 87,
	y: 7,
	tileSize: 25,
	width: function(){ return this.rows[0].col.length * this.tileSize; },
	height: function(){ return this.rows.length * this.tileSize; },
	rows: [
		{col: [3, 3, 3, 3, 3,  2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 2, 1, 0, 0] },
		{col: [3, 3, 3, 3, 2,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 2, 1, 0, 0] },
		{col: [3, 3, 3, 2, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2, 3, 1, 2, 0] },
		{col: [3, 3, 2, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  2, 3, 1, 0, 0] },
		{col: [3, 2, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 2, 1, 2, 0] },
		
		{col: [2, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 1,  1, 0, 0, 0, 0,  0, 2, 1, 0, 0] },
		{col: [1, 1, 1, 1, 1,  1, 1, 1, 1, 0,  0, 0, 0, 1, 1,  1, 1, 0, 0, 0,  0, 0, 1, 0, 0] },
		{col: [0, 0, 0, 0, 0,  0, 0, 0, 1, 0,  0, 0, 1, 1, 2,  2, 1, 1, 0, 0,  0, 2, 1, 3, 3] },
		{col: [0, 0, 0, 0, 0,  0, 0, 0, 1, 0,  0, 1, 1, 2, 2,  2, 2, 1, 1, 0,  0, 0, 1, 2, 3] },
		{col: [0, 0, 0, 0, 0,  0, 0, 0, 1, 1,  1, 1, 2, 2, 3,  3, 2, 2, 1, 0,  0, 2, 1, 3, 3] },
		
		{col: [0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 1, 2, 2, 3,  3, 2, 2, 1, 1,  1, 1, 1, 0, 0] },
		{col: [0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 1, 1, 2, 2,  2, 2, 1, 1, 2,  0, 2, 0, 0, 0] },
		{col: [2, 2, 0, 1, 1,  1, 0, 0, 0, 1,  1, 1, 1, 1, 2,  2, 1, 1, 0, 0,  0, 0, 0, 0, 0] },
		{col: [3, 2, 2, 1, 0,  1, 0, 0, 0, 1,  0, 0, 0, 1, 1,  1, 1, 0, 0, 0,  0, 0, 0, 0, 0] },
		{col: [3, 3, 2, 1, 0,  1, 0, 1, 1, 1,  0, 0, 0, 0, 1,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0] },

		{col: [3, 3, 2, 1, 0,  1, 1, 1, 0, 0,  0, 0, 0, 0, 1,  0, 0, 1, 1, 1,  1, 1, 1, 1, 0] },
		{col: [2, 2, 2, 1, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 1,  0, 0, 1, 2, 2,  2, 2, 2, 1, 1] },
		{col: [1, 1, 1, 1, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 1,  1, 1, 1, 2, 3,  3, 3, 3, 2, 2] },
		{col: [2, 2, 2, 2, 2,  2, 2, 2, 2, 2,  2, 2, 2, 2, 1,  2, 2, 2, 3, 3,  3, 3, 3, 3, 2] },
		{col: [3, 3, 3, 3, 3,  3, 3, 3, 3, 3,  3, 3, 3, 2, 1,  2, 3, 3, 3, 3,  3, 3, 3, 3, 3] }		
	]
};

var levelIntro = [
	"It is September 1942, the winter is cold and harsh and German troops are in Russian territory.",
	"The goal of the Germans was to take the city of Stalingrad on their way to controlling the oil fields in the",
	"Caucausas. The Russians had weakened forces due to previous battles but still had to keep the city.",
	"German troops advanced but could not take the entire city. Russian troops surrounded the city and trapped",
	"Germany inside. German armies could not last the winter and they had less supplies than Russia.",
	"1943, Germany had to surrender.\n\n You are in command of the resources of the German army as they try to",
	"take the city of Stalingrad. In order to be victorious, you must eliminate all the Russian troops. ",
	"Can you change the outcome of this historic battle or will you too fall to the same fate?"
];
