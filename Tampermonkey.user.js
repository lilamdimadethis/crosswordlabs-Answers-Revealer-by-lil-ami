// ==UserScript==
// @name         Crossword Answers Revealer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Reveals the answers for a crossword puzzle
// @author       Lil Ami
// @match        www.crosswordlabs.com/embed/*
// @match        *://crosswordlabs.com/embed/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var menuHTML = `
        <div id="crosswordMenu" style="position: fixed; top: 50px; left: 50px; background-color: #4a69bb; border: 1px solid #6b7abb; border-radius: 10px; padding: 15px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); z-index: 9999;">
            <h3 style="margin-top: 0; margin-bottom: 15px; color: #fff;">Crossword Answers</h3>
            <h3 style="margin-top: 0; margin-bottom: 10px; color: #fff;">By Lil Ami</h3>
            <button id="showAnswersButton" style="padding: 10px 20px; background-color: #805ad5; color: white; border: none; border-radius: 5px; cursor: pointer;">Show Answers (|)</button>
            <div id="answersDisplay" style="margin-top: 15px; font-family: Arial, sans-serif; font-size: 14px; color: #000;"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);

    var style = document.createElement('style');
    style.innerHTML = `
        #crosswordMenu {
            cursor: move;
        }
        #answersDisplay {
            padding: 10px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
            color: #000;
        }
    `;
    document.head.appendChild(style);

    var crosswordMenu = document.getElementById('crosswordMenu');
    var isDragging = false;
    var offsetX, offsetY;

    crosswordMenu.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - crosswordMenu.getBoundingClientRect().left;
        offsetY = e.clientY - crosswordMenu.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            var x = e.clientX - offsetX;
            var y = e.clientY - offsetY;
            crosswordMenu.style.left = x + 'px';
            crosswordMenu.style.top = y + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    function toggleMenu() {
        var crosswordMenu = document.getElementById('crosswordMenu');
        if (crosswordMenu.style.display === 'none') {
            crosswordMenu.style.display = 'block';
        } else {
            crosswordMenu.style.display = 'none';
        }
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === '|') {
            toggleMenu();
        }
    });

    function showAnswers() {
        var answersDisplay = document.getElementById('answersDisplay');
        answersDisplay.innerHTML = '';

        var answersFound = false;

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
                        answersDisplay.innerHTML += '<div style="margin-bottom: 5px;">Across at (' + row + ', ' + col + '): <strong>' + answer + '</strong></div>';
                        answersFound = true;
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
                        answersDisplay.innerHTML += '<div style="margin-bottom: 5px;">Down at (' + row + ', ' + col + '): <strong>' + answer + '</strong></div>';
                        answersFound = true;
                    }
                }
            }
        }

        if (!answersFound) {
            answersDisplay.textContent = 'Answers not found';
        }
    }

    var showAnswersButton = document.getElementById('showAnswersButton');
    showAnswersButton.addEventListener('click', showAnswers);
})();
