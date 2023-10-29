document.getElementById('submitReadings').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const gasRows = document.querySelectorAll('#gasConcentrationForm table tr');
    const resultContainer = document.getElementById('result');

    resultContainer.innerHTML = ''; // Clear previous results

    let anyGasExceeded = false;

    gasRows.forEach(function (row, index) {
        if (index > 0) {
            const gasName = row.querySelector('input[id^="gasName"]').placeholder;
            const concentration = parseFloat(row.querySelector('input[id^="concentration"]').value);

            let safeLimit;
            if (gasName === 'Hydrogen Sulphide') safeLimit = 9;
            else if (gasName === 'Carbon Dioxide') safeLimit = 10000;
            else if (gasName === 'Carbon Monoxide') safeLimit = 35;
            else if (gasName === 'Sulphur Dioxide') safeLimit = 5;
            else if (gasName === 'Ammonia') safeLimit = 35;
            else if (gasName === 'Benzene') safeLimit = 1;
            else if (gasName === 'Methane') safeLimit = 1000;
            else if (gasName === 'Ethane') safeLimit = 1000;
            else if (gasName === 'Butane') safeLimit = 1000;
            else if (gasName === 'LPG') safeLimit = 1000;

            if (!isNaN(concentration) && concentration > safeLimit) {
                resultContainer.innerHTML += `${gasName} has exceeded its safe limit.<br>`;
                anyGasExceeded = true;
            }
        }
    });

    const oxygenReadings = document.querySelectorAll('#oxygenReadingsForm input[type="number"]');
    let oxygenMessage = 'The following oxygen readings are within an acceptable range:<br>';

    oxygenReadings.forEach(function (input, index) {
        const oxygenReading = parseFloat(input.value);

        if (!isNaN(oxygenReading) && oxygenReading < 19.5) {
            oxygenMessage += `Oxygen Reading ${index + 1} is below the safe limit.<br>`;
        }
    });

    if (!anyGasExceeded) {
        resultContainer.innerHTML = 'All gas concentrations are within safe limits.<br>';
    }

    // Clear the previous results if any
    resultContainer.innerHTML += '<br>' + oxygenMessage;
});
