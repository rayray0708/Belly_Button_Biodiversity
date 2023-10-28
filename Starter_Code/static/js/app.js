//Use the D3 library to read in samples.json from the 
//URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
// d3.json(url).then(function(data) {
//     // d3.json(url) - returns a Promise, if the Promise is successful then the response gets evaluated
//     console.log(data); //outputting the data if request has been successful

// Initial setup
function init() {
d3.json(url).then(function(data) {
    populatingDropdownMenu(data) ;
    console.log(data);
    plotBarChart(data.samples[0]);
    plotBubbleChart(data.samples[0]);
    displayMetadata(data.metadata[0]);
        });
    };

// Populate dropdown menu with country names
function populatingDropdownMenu(data) {
    const dropdown = d3.select('#selDataset');
    for (let i = 0; i < data.names.length; i++) {
        let option = dropdown.append('option');
        option.attr('value',data.metadata[i].id).text(data.metadata[i].id);
    }
};
    
//plot the bar chart
function plotBarChart(person) {
    console.log(person)
    // Extract the data for the selected person
    let otu_ids = person.otu_ids;
    let otu_labels = person.otu_labels;
    let sample_values = person.sample_values;

    // Create the yticks for the bar chart
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    const plotData = [{
        x: sample_values.slice(0, 10).reverse(),
        y: yticks,
        text: otu_labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: 'h'
    }];

    // Update the bar chart
    Plotly.newPlot('bar', plotData);
};

// Plot the bubble chart
function plotBubbleChart (person) {
    console.log(person)
    let otu_ids = person.otu_ids;
    let otu_labels = person.otu_labels;
    let sample_values = person.sample_values;

    const plotData = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            size: sample_values,  
            color: otu_ids,       
        }
    }];

    // Update the bubble chart
    Plotly.newPlot('bubble', plotData);
};

// Display metadata
function displayMetadata (metadata) {
    console.log(metadata)
    const panel = d3.select('#sample-metadata');
    panel.html(''); //clear existing metadata
    panel.append('p').text(`id: ${metadata.id}`);
    panel.append('p').text(`ethinicity: ${metadata.ethinicity}`);
    panel.append('p').text(`gender: ${metadata.gender}`);
    panel.append('p').text(`age: ${metadata.age}`);
    panel.append('p').text(`location: ${metadata.location}`);
    panel.append('p').text(`bbtype: ${metadata.bbtype}`);
    panel.append('p').text(`wfreq: ${metadata.wfreq}`);
};


// Handle Dropdown Changes
function optionChanged(value) {
    d3.json(url).then(function(data) {
        // console.log(data.metadata[0].id)
        // console.log(parseInt(value))
        // // Find the data for the selected person based on their ID
        let selectedPerson = data.samples.find(person => person.id === value);
        let selectedMetadata = data.metadata.find(person_metadata => person_metadata.id === parseInt(value));
        // console.log(selectedPerson)
        plotBarChart(selectedPerson);
        displayMetadata(selectedMetadata);
        plotBubbleChart(selectedPerson)
    });
};


init();