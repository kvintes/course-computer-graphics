const secondHand = document.querySelector('.second-hand');
const clockContainer = document.querySelector('.clock');

function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondRotation = seconds * 6 * Math.PI / 180; // Перевод в радианы

    const cosValue = Math.cos(secondRotation);
    const sinValue = Math.sin(secondRotation);
    const rotationMatrix = [
        cosValue, sinValue, 0,
        -sinValue, cosValue, 0,
        0, 0, 1
    ];

    // Получение текущих координат стрелки
    const rect = secondHand.getBoundingClientRect();
    const containerRect = clockContainer.getBoundingClientRect();
    const currentX = rect.left - containerRect.left + containerRect.width / 2;
    const currentY = rect.top - containerRect.top + containerRect.height / 2;

    const coordinateVector = [currentX, currentY, 1];

    // Перемножение вектора координат на матрицу поворота
    const transformedCoordinates = multiplyMatrixVector(rotationMatrix, coordinateVector);

    // Матрица перемещения
    const translationMatrix = [
        1, 0, 100, // Сдвиг на 10 пикселей по оси X
        0, 1, 100, // Сдвиг на 10 пикселей по оси Y
        0, 0, 1
    ];

    // Перемножение результата вращения на матрицу перемещения
    const finalTransform = multiplyMatrices(transformedCoordinates, translationMatrix);

    // Применение преобразования к элементу
    secondHand.style.transform = `matrix(${finalTransform.join(', ')})`;

    requestAnimationFrame(updateClock);
}

// Функция для перемножения матрицы на вектор
function multiplyMatrixVector(matrix, vector) {
    const result = [];
    for (let i = 0; i < 3; i++) {
        let sum = 0;
        for (let j = 0; j < 3; j++) {
            sum += matrix[i * 3 + j] * vector[j];
        }
        result.push(sum);
    }
    return result;
}

// Функция для перемножения двух матриц
function multiplyMatrices(matrix1, matrix2) {
    const result = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let sum = 0;
            for (let k = 0; k < 3; k++) {
                sum += matrix1[i * 3 + k] * matrix2[k * 3 + j];
            }
            result.push(sum);
        }
    }
    return result;
}

updateClock();
