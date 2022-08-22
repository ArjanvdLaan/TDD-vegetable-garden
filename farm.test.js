const {getCostsForCrop, getRevenueForCrop, getProfitForCrop, 
    getTotalProfit, getYieldForPlant, getYieldForCrop, getTotalYield} = require("./farm.js")

// 1. get the costs for a crop
describe("getCostsForCrop",() => {
    const corn = {
        name: 'corn',
        numCrops: 10, 
        sowingCosts: 1,
    };

    test("get costs for crop of maize", () => {
        expect(getCostsForCrop(corn)).toBe(10);
    });
});

// 2a. get the revenue for a crop, with no environmental factors
describe("getRevenueForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
    };
    const input = {
        crop: corn,
        salePrice: 2,
        numCrops: 10,
    };

    test("get revenue for crop of maize, with no environmental factors", () => {
        expect(getRevenueForCrop(input)).toBe(60);
    });
});

// 2b. get the revenue for a crop, with environmental factors
describe("getRevenueForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 0,
                medium: -20,
                high: -40,
            },
        },
    };
    const input = {
        crop: corn,
        salePrice: 2,
        numCrops: 10,
    };
    const environmentFactors = {
        sun: "low",
        wind: "low",
        };
    test("get revenue for crop of maize, with environmental factors", () => {
        expect(getRevenueForCrop(input, environmentFactors)).toBe(30);
    });
});

// 3a. get the profit for a crop, with no environmental factors
describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
    };
    const input = {
        crop: corn,
        salePrice: 2,
        numCrops: 10, 
        sowingCosts: 1,
    };

    test("get profit for crop of maize, with no environmental factors", () => {
        expect(getProfitForCrop(input)).toBe(50);
    });
});

// 3b. get the profit for a crop, with environmental factors
describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 0,
                medium: -20,
                high: -40,
            },
        },
    };
    const input = {
        crop: corn,
        salePrice: 2,
        numCrops: 10, 
        sowingCosts: 1,
    };
    const environmentFactors = {
        sun: "low",
        wind: "low",
        };

    test("get profit for crop of maize, with environmental factors", () => {
        expect(getProfitForCrop(input, environmentFactors)).toBe(20);
    });
});

// 4a. get the profit for all crops, with no environment factors
describe("getTotalProfit", () => {
    const corn = {
        name: "corn",
        yield: 3,
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };
    const crops = [
        {   crop: corn,         
            salePrice: 2,
            numCrops: 10, 
            sowingCosts: 1 },
        {   crop: pumpkin,         
            salePrice: 2,
            numCrops: 10, 
            sowingCosts: 1 },
    ];
    test("get profit for all crops of maize, with no environmental factors", () => {
        expect(getTotalProfit(crops)).toBe(120);
    });
});

// 4b. get the profit for all crops, with environment factors
describe("getTotalProfit", () => {
    const corn = {
        name: "corn",
        yield: 3,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 0,
                medium: -20,
                high: -40,
            },
        },
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        factor: {
            sun: {
                low: -60,
                medium: 0,
                high: 60,
            },
            wind: {
                low: 0,
                medium: -10,
                high: -25,
            },
        },
    };
    const crops = [
        {   crop: corn,         
            salePrice: 2,
            numCrops: 10, 
            sowingCosts: 1 },
        {   crop: pumpkin,         
            salePrice: 3,
            numCrops: 2, 
            sowingCosts: 1 },
    ];

    const environmentFactors = {
        sun: "high",
        wind: "medium",
        };
    test("get profit for all crops, with environmental factors", () => {
        expect(getTotalProfit(crops, environmentFactors)).toBe(94.56);
    });
});

// 5a. get the yield for one plant with no environment factors
describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

// 5b. get the yield for one plant with environment factors
describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 0,
                medium: -20,
                high: -40,
            },
        },
    };
    const environmentFactors = {
        sun: "high",
        wind: "low",
        };

    test("Get yield for plant with environment factors", () => {
        expect(getYieldForPlant(corn, environmentFactors)).toBe(45);
    });
});

// 6a. get the yield for a crop with no environment factors
describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

// 6b. get the yield for a crop with environment factors
describe("getYieldForCrop", () => {
    test("Get yield for crop, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -40,
                },
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "low",
            wind: "low",
            };
        expect(getYieldForCrop(input, environmentFactors)).toBe(15);
    });
});

// 7a. get the yield of all crops with no environment factors
describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops",  () => {
        const corn = {
            name: "corn",
            yield: 3,
            
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield( crops )).toBe(23);
    });
});
// get yield for all crops with 0 amount
    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ 
            crop: corn, 
            numCrops: 0 
        }];
        expect(getTotalYield(crops )).toBe(0);
    });

// 7b. get the yield of all crops with environment factors
describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops, with environment factors",  () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -40,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                    low: -60,
                    medium: 0,
                    high: 60,
                },
                wind: {
                    low: 0,
                    medium: -10,
                    high: -25,
                },
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            };
        expect(getTotalYield( crops, environmentFactors )).toBe(8.88);
    });
});




