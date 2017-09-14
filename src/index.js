function multiply(a, b) {
    let aLen = a.length;
    let bLen = b.length;
    let maxLen = aLen + bLen + 1;
    a = new Array(maxLen - aLen).fill(0).concat(a.split("").map(Number));
    b = new Array(maxLen - bLen).fill(0).concat(b.split("").map(Number));
    let mult = [];
    if (b[0] === 0) {
        mult.push(a);
        mult.push(b);
    } else {
        mult.push(b);
        mult.push(a);
    }
    for(let i = maxLen - 1; i >= maxLen - bLen; i--) {
        mult.push(new Array(a.length).fill(0));
        let l = mult.length - 1;
        for(let j = maxLen - 1, k = i; j >= maxLen - aLen; j--, k--) {
            if (mult[1][i] * mult[0][j] > 9) {
                mult[l][k] += mult[1][i] * mult[0][j] % 10;
                mult[l][k - 1] += Math.floor(mult[1][i] * mult[0][j] / 10);
            } else {
                mult[l][k] += mult[1][i] * mult[0][j];
            }
            if (mult[l][k] > 9) {
                mult[l][k - 1] += Math.floor(mult[l][k] / 10);
                mult[l][k] = mult[l][k] % 10;
            }
        }
    }
    mult.push(new Array(a.length).fill(0));
    for(let i = maxLen - 1; i >= 0; i--) {
        for(let j = 2; j < mult.length - 1; j++) {
            mult[mult.length - 1][i] += mult[j][i];
        }
    }
    let res = mult[mult.length - 1];
    for(let i = maxLen - 1; i >= 0; i--) {
        if (res[i] > 9) {
            res[i - 1] += Math.floor(res[i] / 10);
            res[i] = res[i] % 10;
        }
    }
    return res.join("").replace(/0*(.*)/, "$1");
}

module.exports = multiply;