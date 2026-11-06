var generate =
function(numRows) {
    let result = [];

    for (let i = 0; i < numRows; i++) {
        let row = [];

        for (let j = 0; j <= i; j++) {

            if (j === 0 || j === i) {
                row.push(1);
            } else {
                let sum = result[i - 1][j - 1] + result[i - 1][j];
                row.push(sum);
            }
        }

        result.push(row);
    }

    return result;
};