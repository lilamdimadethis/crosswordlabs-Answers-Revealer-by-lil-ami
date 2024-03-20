function showAnswers() {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var cell = grid[i][j];
            if (cell && cell['across'] && cell['across']['is_start_of_word']) {
                var acrossIndex = cell['across']['index'];
                var direction = index_to_direction[acrossIndex];
                var position = index_to_row_column[acrossIndex];
                if (position) {
                    var row = position.row;
                    var col = position.col;
                    var answer = '';
                    while (grid[row] && grid[row][col] && grid[row][col][direction]) {
                        answer += grid[row][col].char;
                        if (direction === 'across') col++;
                        else row++;
                    }
                    console.log('Across at (' + row + ', ' + col + '): ' + answer);
                }
            }
            if (cell && cell['down'] && cell['down']['is_start_of_word']) {
                var downIndex = cell['down']['index'];
                var direction = index_to_direction[downIndex];
                var position = index_to_row_column[downIndex];
                if (position) {
                    var row = position.row;
                    var col = position.col;
                    var answer = '';
                    while (grid[row] && grid[row][col] && grid[row][col][direction]) {
                        answer += grid[row][col].char;
                        if (direction === 'across') col++;
                        else row++;
                    }
                    console.log('Down at (' + row + ', ' + col + '): ' + answer);
                }
            }
        }
    }
}

showAnswers();
