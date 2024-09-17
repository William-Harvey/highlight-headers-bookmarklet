javascript:(function(){
    let h1Found = false, lastHeadingLevel = 0, h1Count = 0;

    // Iterate through all headers (h1 to h6)
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
        const tagName = h.tagName.toLowerCase();
        const currentLevel = parseInt(tagName.slice(1));
        const label = document.createElement('span');
        const suggestion = document.createElement('span');
        const headerText = h.textContent.trim();

        // Label styling
        Object.assign(label.style, {
            position: 'relative', background: 'yellow', color: 'black', '-webkit-text-fill-color': 'black',
            fontSize: '20px', lineHeight: '22px', fontWeight: 'bold', padding: '2px', border: '1px solid black',
            top: '0px', left: '0px', zIndex: '1000'
        });

        // Suggestion styling
        Object.assign(suggestion.style, {
            position: 'static', background: 'lightblue', color: 'black', '-webkit-text-fill-color': 'black',
            fontSize: '16px', lineHeight: '18px', fontWeight: 'normal', padding: '2px', border: '1px solid blue',
            top: '-20px', left: '10px', zIndex: '1000'
        });

        // Add the label showing the header type (h1, h2, etc.)
        label.textContent = tagName;
        h.appendChild(label);

        // Handle missing text warning
        if (!headerText && !h.querySelector('img')) {
            suggestion.textContent = `Warning: This <${tagName}> is missing text!`;
            h.style.outline = '2px solid purple';
            h.appendChild(suggestion);
        }

        // Handle <h1> specific rules, including HTML5 sectioning elements (section, article)
        if (tagName === 'h1') {
            h1Count++;
            if (h1Count > 1 && !h.closest('section, article')) {
                suggestion.textContent = `Warning: Multiple <h1> tags found. Only one is allowed outside sections.`;
                h.style.outline = '2px solid red';
                h.appendChild(suggestion);
            } else {
                h.style.outline = '2px solid red';
            }
            h1Found = true;
            lastHeadingLevel = 1;
            return;
        }

        // Handle skipping forward (disallowed) and skipping backward (allowed)
        if (h1Found) {
            if (currentLevel > lastHeadingLevel + 1) {
                // Skipping forward is disallowed (e.g., h2 to h4 without an h3)
                const suggestedHeading = `h${lastHeadingLevel + 1}`;
                suggestion.textContent = `Suggestion: Should be <${suggestedHeading}> to avoid skipping levels.`;
                h.style.outline = '2px solid orange';
                h.appendChild(suggestion);
            } else {
                h.style.outline = '2px solid red'; // Valid header with no skipping
            }
            lastHeadingLevel = currentLevel;
        }
    });

    // Create 'View Header Formation' button
    const viewHeadersButton = document.createElement('button');
    viewHeadersButton.textContent = 'View Header Formation';
    Object.assign(viewHeadersButton.style, {
        position: 'fixed', bottom: '50px', left: '10px', padding: '10px', backgroundColor: 'lightgreen',
        color: 'black', zIndex: '9999', fontSize: '14px', border: '1px solid black', cursor: 'pointer'
    });

    // On click, show the header formation
    viewHeadersButton.onclick = function() {
        const headerReport = document.createElement('div');
        headerReport.style.padding = '20px';
        headerReport.style.backgroundColor = 'white';
        headerReport.style.border = '1px solid black';
        headerReport.style.marginTop = '10px';
        headerReport.style.position = 'fixed';
        headerReport.style.top = '100px';
        headerReport.style.left = '10px';
        headerReport.style.zIndex = '9998';
        headerReport.style.overflow = 'auto'; // Add scrolling
        headerReport.style.maxHeight = '70vh'; // Set max height to enable scrolling
        headerReport.innerHTML = '<h3>Header Structure:</h3>';

        // Close button to remove the report
        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '10px';
        closeButton.style.backgroundColor = 'red';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = function() {
            headerReport.remove();
        };
        headerReport.appendChild(closeButton);

        // List all headers (h1 to h6)
        document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
            const tagName = h.tagName.toUpperCase();

            // Temporarily remove suggestion spans to get clean text
            const spans = h.querySelectorAll('span');
            spans.forEach(span => span.style.display = 'none');

            let headerText = h.textContent.trim();

            // If header contains an image, show the image filename
            const img = h.querySelector('img');
            if (img) {
                const imgSrc = img.getAttribute('src');
                headerText = imgSrc ? imgSrc.split('/').pop() : 'image';
            }

            const reportLine = document.createElement('div');
            reportLine.style.marginBottom = '5px';
            reportLine.innerHTML = `<strong>${tagName}</strong>: ${headerText}`;
            headerReport.appendChild(reportLine);

            // Re-display the hidden spans after getting clean text
            spans.forEach(span => span.style.display = 'inline');
        });

        document.body.appendChild(headerReport);

        // Make the report draggable
        headerReport.onmousedown = function(event) {
            dragElement(headerReport, event);
        };
    };

    document.body.appendChild(viewHeadersButton);

    // Create 'Cleanup Diagnostic Labels' button
    const cleanupButton = document.createElement('button');
    cleanupButton.textContent = 'Cleanup Diagnostic Labels';
    Object.assign(cleanupButton.style, {
        position: 'fixed', bottom: '10px', left: '10px', padding: '10px', backgroundColor: 'lightcoral',
        color: 'white', zIndex: '9999', fontSize: '14px', border: '1px solid black', cursor: 'pointer'
    });

    // On click, remove all labels and suggestions
    cleanupButton.onclick = function() {
        document.querySelectorAll('span,button').forEach(el => {
            if (el.textContent.includes('h1') || el.textContent.includes('Suggestion') || el.textContent.includes('Warning') || el.tagName === 'BUTTON') {
                el.remove();
            }
        });
        document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => h.style.outline = '');
    };

    document.body.appendChild(cleanupButton);

    // Function to make the report draggable
    function dragElement(el, event) {
        let shiftX = event.clientX - el.getBoundingClientRect().left;
        let shiftY = event.clientY - el.getBoundingClientRect().top;

        el.style.position = 'absolute';
        el.style.zIndex = 1000;

        function moveAt(pageX, pageY) {
            el.style.left = pageX - shiftX + 'px';
            el.style.top = pageY - shiftY + 'px';
        }

        moveAt(event.pageX, event.pageY);

        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        el.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            el.onmouseup = null;
        };
    }

})();
