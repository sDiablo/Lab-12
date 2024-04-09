const fs = require('fs');

// Функція для читання графа з файлу та визначення найкоротших відстаней між усіма парами вершин
function floydWarshall(inputFilePath) {
    // Реалізація Флойда-Уоршелла
    const graph = [];

    const data = fs.readFileSync(inputFilePath, 'utf8');
    const lines = data.trim().split('\n');
    const n = parseInt(lines[0]);

    for (let i = 0; i < n; i++) {
        graph[i] = lines[i + 1].split(' ').map(Number);
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (graph[i][k] + graph[k][j] < graph[i][j]) {
                    graph[i][j] = graph[i][k] + graph[k][j];
                }
            }
        }
    }

    // Повертаємо граф
    return graph;
}

// Функція для виведення матриці на екран або у файл
function printMatrix(matrix) {
    matrix.forEach(row => console.log(row.join(' ')));
}

// Приклад використання першого завдання
const inputFilePath = './input.txt';
const outputMatrix = floydWarshall(inputFilePath);
printMatrix(outputMatrix);


// Далі, можна додати функції для виконання другого завдання

// Алгоритм Дейкстри для знаходження найкоротшого шляху між двома вершинами
function dijkstra(graph, source, destination) {
    const n = graph.length;
    const INF = Number.MAX_SAFE_INTEGER;

    const dist = new Array(n).fill(INF);
    dist[source] = 0;

    const visited = new Array(n).fill(false);

    for (let count = 0; count < n - 1; count++) {
        const u = minDistance(dist, visited);
        visited[u] = true;

        for (let v = 0; v < n; v++) {
            if (!visited[v] && graph[u][v] && dist[u] !== INF && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    return dist[destination];
}

// Функція для знаходження найменшої відстані
function minDistance(dist, visited) {
    let min = Number.MAX_SAFE_INTEGER;
    let minIndex = -1;

    for (let v = 0; v < dist.length; v++) {
        if (visited[v] === false && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }

    return minIndex;
}

// Функція для визначення найкоротших відстаней від заданої вершини до всіх інших
function shortestDistancesFromVertex(graph, source) {
    const n = graph.length;
    const INF = Number.MAX_SAFE_INTEGER;

    const dist = new Array(n).fill(INF);
    dist[source] = 0;

    const visited = new Array(n).fill(false);

    for (let count = 0; count < n - 1; count++) {
        const u = minDistance(dist, visited);
        visited[u] = true;

        for (let v = 0; v < n; v++) {
            if (!visited[v] && graph[u][v] && dist[u] !== INF && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    return dist;
}

// Приклад використання другого завдання
const source = 0;
const destination = 3;
const shortestDistance = dijkstra(outputMatrix, source, destination);
console.log(`Найкоротший шлях між вершинами ${source} та ${destination}: ${shortestDistance}`);

const sourceVertex = 1;
const distancesFromSource = shortestDistancesFromVertex(outputMatrix, sourceVertex);
console.log(`Найкоротші відстані від вершини ${sourceVertex}:`);
distancesFromSource.forEach((distance, index) => console.log(`Вершина ${index}: ${distance}`));
І