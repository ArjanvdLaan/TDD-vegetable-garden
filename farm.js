// 1. get the costs for a crop
const getCostsForCrop = plant => plant.numCrops * plant.sowingCosts;

// 2. get the revenue for a crop
const getRevenueForCrop = (element, factors) => {
    if (factors == null) {
        return element.salePrice  * element.crop.yield * element.numCrops;
    } else {
        return element.salePrice * getYieldForCrop(element, factors) * element.numCrops;
    };
};

// 3. get profit for a crop
const getProfitForCrop = (element, factors) => {
    if (factors == null) {
        return getRevenueForCrop(element) - getCostsForCrop(element);
    } else {
        return getRevenueForCrop(element, factors) - getCostsForCrop(element);
    }
};

// 4. get profit for all crops
const getTotalProfit = (elements, factors) => {
    if (factors == null) {
        let totalProfit = 0;
        elements.forEach(element => {
            totalProfit += getProfitForCrop(element);
        })
        return totalProfit;
    } else {
        let totalProfit = 0;
        elements.forEach(element => {
            totalProfit += getProfitForCrop(element, factors);
        })
        return totalProfit;
    }
};
 
// 5. get yield for one plant
const getYieldForPlant = (plant, factors) => {
    if (factors == null) {
        return plant.yield;
    } else {
    let factorSun = 0;
    let factorWind = 0;
    switch (factors.sun ) {
        case "low":
            factorSun += (100 + plant.factor.sun.low)/ 100;
            break;
        case "medium":
            factorSun += (100 + plant.factor.sun.medium)/ 100;
            break;
        case "high":
            factorSun += (100 + plant.factor.sun.high)/ 100;
            break;
        default: 
            factorSun = 0;
    }
    switch (factors.wind) {
        case "low":
            factorWind += (100 + plant.factor.wind.low)/100;
            break;
        case "medium":
            factorWind += (100 + plant.factor.wind.medium)/100;
            break;
        case "high":
            factorWind += (100 + plant.factor.wind.high)/100;
            break;
        default: 
            factorWind = 0;
    }
    return plant.yield * factorSun * factorWind;
    }
};

// 6. get yield for a crop
const getYieldForCrop = (element, factors) => {
    if (factors == null) {
        return element.crop.yield * element.numCrops;
    } else {
        return getYieldForPlant(element.crop, factors) * element.numCrops;
    };
};

// 7. get yield for all crops
const getTotalYield = function (plants, factors) {
    if (factors == null) {
        let totalY = 0;
        plants.forEach(plant => {
         totalY += plant.crop.yield * plant.numCrops;
        });
        return totalY;
    } else {
        let totalY = 0;
        plants.forEach(plant => {
        totalY += (getYieldForCrop(plant, factors) * plant.numCrops);
        });
        return totalY;
    }
}

module.exports = {getRevenueForCrop, getCostsForCrop, getProfitForCrop, 
    getTotalProfit, getYieldForPlant, getYieldForCrop, getTotalYield};
