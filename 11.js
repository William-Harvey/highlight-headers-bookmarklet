javascript:(function(){
    let h1Found = false, lastHeadingLevel = 0, h1Count = 0;
    let headersBeforeH1 = false;

    // Iterate through all headers (h1 to h6)
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
        const tagName = h.tagName.toLowerCase();
        const currentLevel = parseInt(tagName.slice(1));
        const label = document.createElement('span');
        const suggestion = document.createElement('span');
        const headerText = h.textContent.trim();

        // Label styling for the header label (e.g., "h1", "h2")
        Object.assign(label.style, {
            position: 'relative', background: 'yellow', color: 'black', '-webkit-text-fill-color': 'black',
            fontSize: '20px', lineHeight: '22px', fontWeight: 'bold', padding: '2px', border: '1px solid black',
            top: '0px', left: '0px', zIndex: '1000'
        });

        // Suggestion styling for warnings and suggestions
        Object.assign(suggestion.style, {
            position: 'relative', background: 'lightblue', color: 'black', '-webkit-text-fill-color': 'black',
            fontSize: '16px', lineHeight: '18px', fontWeight: 'normal', padding: '2px', border: '1px solid blue',
            display: 'block', marginTop: '10px', zIndex: '1000'
        });

        // Add the header type label (e.g., "h1", "h2")
        label.textContent = tagName;
        h.appendChild(label);

        // Check if any header is found before <h1>
        if (!h1Found && tagName !== 'h1') {
            headersBeforeH1 = true;
            suggestion.textContent = `Warning: This <${tagName}> appears before <h1>. <h1> should be the first header element.`;
            h.style.outline = '2px solid blue';
            h.appendChild(suggestion);  // Append suggestion
            console.log(`Appended "before <h1>" warning to ${tagName}`);
        }

        // Handle missing text warning
        if (!headerText && !h.querySelector('img')) {
            suggestion.textContent = `Warning: This <${tagName}> is missing text!`;
            h.style.outline = '2px solid purple';
            h.appendChild(suggestion);  // Append suggestion
            console.log(`Appended missing text warning to ${tagName}`);
        }

        // Handle <h1> specific rules
        if (tagName === 'h1') {
            h1Count++;
            if (h1Count > 1 && !h.closest('section, article')) {
                suggestion.textContent = `Warning: Multiple <h1> tags found. Only one is allowed outside sections.`;
                h.style.outline = '2px solid red';
                h.appendChild(suggestion);  // Append suggestion
                console.log(`Appended multiple <h1> warning to ${tagName}`);
            } else {
                h.style.outline = '2px solid red'; // Valid <h1>
            }
            h1Found = true;
            lastHeadingLevel = 1;
            return;
        }

        // Handle skipping forward (disallowed) and skipping backward (allowed)
        if (h1Found) {
            if (currentLevel > lastHeadingLevel + 1) {
                // Skipping forward (e.g., h2 to h4 without an h3) is disallowed
                const suggestedHeading = `h${lastHeadingLevel + 1}`;
                suggestion.textContent = `Suggestion: Should be <${suggestedHeading}> to avoid skipping levels.`;
                h.style.outline = '2px solid orange';
                h.appendChild(suggestion);  // Append suggestion
                console.log(`Appended skip warning to ${tagName}`);
            } else if (currentLevel < lastHeadingLevel - 1) {
                // Backward skips by more than one level are disallowed
                suggestion.textContent = `Warning: Cannot skip back more than one level!`;
                h.style.outline = '2px solid red';
                h.appendChild(suggestion);  // Append suggestion
                console.log(`Appended backward skip warning to ${tagName}`);
            } else {
                h.style.outline = '2px solid red'; // Valid header
                console.log(`${tagName} is valid`);
            }
            lastHeadingLevel = currentLevel;
        }
    });

    // Notify if headers appear before <h1>
    if (headersBeforeH1) {
        alert("Warning: Some headers appear before the first <h1> element. <h1> should be the first header.");
    }

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
        closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="red" d="M18.3 5.71a1 1 0 0 0-1.42-1.42L12 9.59 7.12 4.7a1 1 0 1 0-1.42 1.42l4.88 4.88-4.88 4.88a1 1 0 1 0 1.42 1.42L12 12.41l4.88 4.88a1 1 0 0 0 1.42-1.42l-4.88-4.88z"/></svg>`;
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '10px';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.cursor = 'pointer';
        headerReport.appendChild(closeButton);

        // Add drag handle using SVG (Back of hand fist)
        const dragHandle = document.createElement('div');
        dragHandle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="black" d="M9 3a3 3 0 0 1 3 3v3h2v-2.667A2.333 2.333 0 0 1 16.333 4h.334A2.333 2.333 0 0 1 19 6.333V11h1.333A2.667 2.667 0 0 1 23 13.667v1.666A2.667 2.667 0 0 1 20.333 18H8.667a4.667 4.667 0 0 1-4.645-4.304L4 13.667v-6A2.667 2.667 0 0 1 6.667 5H9Zm3-1a4 4 0 0 0-4 4H6.667a3.667 3.667 0 0 0-3.665 3.439L3 7.667a3.667 3.667 0 0 0 3.667 3.667h9.666a4 4 0 0 0 4-4V6.333A3.333 3.333 0 0 0 16.667 3H16a4 4 0 0 0-4-1Z"/></svg>`;
        dragHandle.style.cursor = 'move';
        dragHandle.style.position = 'absolute';
        dragHandle.style.right = '40px';  // Padding of 30px between close and drag handle
        dragHandle.style.top = '5px';
        headerReport.appendChild(dragHandle);

        // Drag functionality on the drag handle
        dragHandle.onmousedown = function(event) {
            dragElement(headerReport, event);
        };

        // On close button click, remove the report
        closeButton.onclick = function() {
            headerReport.remove();
        };

        // List all headers (h1 to h6) excluding suggestion spans
        document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
            const tagName = h.tagName.toUpperCase();

            // Clone the header without the suggestion span elements
            const cloneHeader = h.cloneNode(true);
            cloneHeader.querySelectorAll('span').forEach(span => span.remove());

            let headerText = cloneHeader.textContent.trim();

            // If header contains an image, show the image filename
            const img = cloneHeader.querySelector('img');
            if (img) {
                const imgSrc = img.getAttribute('src');
                headerText = imgSrc ? imgSrc.split('/').pop() : 'image';
            }

            const reportLine = document.createElement('div');
            reportLine.style.marginBottom = '5px';
            reportLine.innerHTML = `<strong>${tagName}</strong>: ${headerText}`;
            headerReport.appendChild(reportLine);
        });

        document.body.appendChild(headerReport);
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

        function moveAt(pageX, pageY) {
            el.style.left = pageX - shiftX + 'px';
            el.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;  // Stop dragging when mouse is released
        };
    }

})();
